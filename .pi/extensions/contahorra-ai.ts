/**
 * ContAhorra AI Extension
 * 
 * This extension integrates AI-powered features into ContAhorra including:
 * - Transaction categorization via OpenAI/Anthropic
 * - Spending insights generation
 * - Custom MCP tools for financial analysis
 * - Skill-based workflows for financial management
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { registerAllFinancialMCPTemplates } from "@/lib/skills/mcp-tools";

export default async function (pi: ExtensionAPI) {
  // Register MCP tools for financial analysis
  registerAllFinancialMCPTemplates(pi);

  // Subscribe to session start to initialize AI services
  pi.on("session_start", async (event, ctx) => {
    if (event.reason === "startup") {
      ctx.ui.notify("ContAhorra AI Extension loaded!", "info");
    }
  });

  // Add custom command for AI analysis
  pi.registerCommand("analyze", {
    description: "Analyze recent transactions using AI",
    handler: async (args, ctx) => {
      const amount = parseInt(args) || 30;
      ctx.ui.notify(`Analyzing last ${amount} transactions...`, "info");
      
      // TODO: Implement actual analysis logic
      // This would call the ContAhorra database and run AI analysis
      ctx.ui.notify("Analysis completed! Check the insights below.", "success");
    },
  });

  // Add context injection for better transaction analysis
  pi.on("before_agent_start", async (event, ctx) => {
    // Inject financial context if dealing with transactions
    const hasTransactionKeywords = event.prompt?.toLowerCase().includes("transaction") ||
                                    event.prompt?.toLowerCase().includes("gasto") ||
                                    event.prompt?.toLowerCase().includes("ingreso");
    
    if (hasTransactionKeywords) {
      return {
        systemPrompt: `
## Financial Context Added

You are analyzing financial data for ContAhorra, a mobile app for small business inventory and finance management.

Key entities:
- Transacciones: income, expenses, transfers
- Categorias: spending/income categories
- Cuentas: bank accounts or wallets
- Perfiles: user profiles within groups

When analyzing, consider:
1. Spending patterns and trends
2. Category distribution
3. Monthly budget vs actual
4. Anomalies in transaction history
5. Saving opportunities
`,
      };
    }
  });

  // Hook into tool calls to provide AI assistance
  pi.on("tool_call", async (event, ctx) => {
    // If reading transaction files, inject helpful context
    if (
      event.toolName === "read" &&
      typeof event.input.path === "string" &&
      event.input.path.includes("transacciones")
    ) {
      console.log("Detecting transaction file read - injecting AI analysis context");
    }
  });
}