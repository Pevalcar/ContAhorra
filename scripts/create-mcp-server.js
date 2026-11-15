#!/usr/bin/env node
/**
 * Script to create a custom MCP server for ContAhorra
 * This server exposes financial data operations to AI assistants
 */

const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require("@modelcontextprotocol/sdk/types.js");

// In-memory transaction store (would connect to SQLite in production)
let transactions = [];
let categories = [];
let accounts = [];

const server = new Server(
  {
    name: "contahorra-financial",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "analyze_transactions",
        description: "Analyze recent transactions for spending patterns and insights",
        inputSchema: {
          type: "object",
          properties: {
            limit: {
              type: "number",
              description: "Number of recent transactions to analyze",
              default: 30,
            },
            type: {
              type: "string",
              enum: ["expense", "income", "transfer"],
              description: "Filter by transaction type",
            },
          },
        },
      },
      {
        name: "get_category_summary",
        description: "Get summary of spending by category",
        inputSchema: {
          type: "object",
          properties: {
            timeframe: {
              type: "string",
              enum: ["week", "month", "year"],
              description: "Timeframe for analysis",
              default: "month",
            },
          },
        },
      },
      {
        name: "search_transactions",
        description: "Search transactions by description or amount",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search term",
            },
            minAmount: {
              type: "number",
              description: "Minimum amount filter",
            },
            maxAmount: {
              type: "number",
              description: "Maximum amount filter",
            },
          },
        },
      },
      {
        name: "generate_insights",
        description: "Generate AI-powered insights from transaction data",
        inputSchema: {
          type: "object",
          properties: {
            months: {
              type: "number",
              description: "Number of months of history to analyze",
              default: 6,
            },
          },
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "analyze_transactions": {
      const limit = args?.limit || 30;
      const type = args?.type;
      
      let filtered = [...transactions];
      if (type === "expense") {
        filtered = filtered.filter((t) => t.type === "Gasto");
      } else if (type === "income") {
        filtered = filtered.filter((t) => t.type === "Ingreso");
      }
      
      const recent = filtered.sort((a, b) => b.date - a.date).slice(0, limit);
      
      const totalExpenses = recent
        .filter((t) => t.type === "Gasto")
        .reduce((sum, t) => sum + t.balance, 0);
      
      const totalIncome = recent
        .filter((t) => t.type === "Ingreso")
        .reduce((sum, t) => sum + t.balance, 0);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                transactions: recent,
                summary: {
                  count: recent.length,
                  totalExpenses,
                  totalIncome,
                  netBalance: totalIncome - totalExpenses,
                },
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "get_category_summary": {
      const timeframe = args?.timeframe || "month";
      // Aggregate by category
      const summary = {};
      transactions.forEach((t) => {
        if (!summary[t.categoryID]) {
          summary[t.categoryID] = { total: 0, count: 0, transactions: [] };
        }
        summary[t.categoryID].total += t.balance;
        summary[t.categoryID].count++;
        summary[t.categoryID].transactions.push(t.id);
      });
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(summary, null, 2),
          },
        ],
      };
    }

    case "search_transactions": {
      const query = args?.query?.toLowerCase() || "";
      const minAmount = args?.minAmount || 0;
      const maxAmount = args?.maxAmount || Infinity;
      
      const results = transactions.filter((t) => {
        const matchesQuery = !query || t.description.toLowerCase().includes(query);
        const matchesAmount = t.balance >= minAmount && t.balance <= maxAmount;
        return matchesQuery && matchesAmount;
      });
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }

    case "generate_insights": {
      const months = args?.months || 6;
      // TODO: Implement actual AI insight generation
      // For now, return basic statistics
      const totalSpent = transactions
        .filter((t) => t.type === "Gasto")
        .reduce((sum, t) => sum + t.balance, 0);
      
      const avgDailySpend = totalSpent / (months * 30);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                insights: [
                  `Total spent over ${months} months: $${totalSpent.toFixed(2)}`,
                  `Average daily spending: $${avgDailySpend.toFixed(2)}`,
                  `Top categories: ${Object.keys(transactions.reduce((acc, t) => { acc[t.categoryID] = (acc[t.categoryID] || 0) + t.balance; return acc; }, {}))
                    .sort((a, b) => transactions[Object.keys(transactions).findIndex(t => t.id === b)].balance)
                    .join(", ")}`,
                ],
              },
              null,
              2
            ),
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ContAhorra Financial MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});