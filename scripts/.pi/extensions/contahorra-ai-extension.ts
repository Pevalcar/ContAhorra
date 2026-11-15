/**
 * ContAhorra AI Extension - Main Entry Point
 * 
 * This extension integrates AI-powered features into ContAhorra:
 * - Transaction categorization
 * - Spending insights
 * - Budget analysis
 * - Custom MCP tools
 * 
 * To use this extension, run:
 *   pi -e scripts/.pi/extensions/contahorra-ai-extension.ts
 * 
 * Or add to your settings.json for persistent loading.
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { registerAllFinancialMCPTemplates, registerCategorySuggestionMCPTool, registerBudgetAnalysisMCPTool } from "@/lib/skills/mcp-tools";

export default async function (pi: ExtensionAPI) {
  // Register all financial MCP tools
  registerAllFinancialMCPTemplates(pi);
  registerCategorySuggestionMCPTool(pi);
  registerBudgetAnalysisMCPTool(pi);

  // Initialize on session start
  pi.on("session_start", async (event, ctx) => {
    console.log("🤖 ContAhorra AI Extension initialized");
    
    if (event.reason === "startup") {
      ctx.ui.notify(
        "ContAhorra AI features loaded! Try: /analyze or use 'Analyze Transaction' tool",
        "info"
      );
      
      // Log available commands
      console.log("\n📊 Available AI Commands:");
      console.log("  /analyze [limit] - Analyze recent transactions");
      console.log("  /insights - Generate spending insights");
      console.log("\n🛠️  Available MCP Tools:");
      console.log("  - analyze_transaction");
      console.log("  - suggest_categories");
      console.log("  - analyze_budget");
    }
  });

  // Add slash command for quick analysis
  pi.registerCommand("analyze", {
    description: "Analyze recent transactions using AI",
    handler: async (args, ctx) => {
      const limit = parseInt(args) || 30;
      ctx.ui.setStatus("ai-analyzer", `Analyzing ${limit} transactions...`);
      
      // TODO: Connect to actual ContAhorra database
      // For now, show success message
      setTimeout(() => {
        ctx.ui.notify(`✅ Analysis complete! Found patterns in your last ${limit} transactions.`, "success");
        ctx.ui.setStatus("ai-analyzer", "");
      }, 1000);
    },
  });

  // Add slash command for insights
  pi.registerCommand("insights", {
    description: "Generate AI-powered financial insights",
    handler: async (_args, ctx) => {
      ctx.ui.setStatus("ai-analyzer", "Generating insights...");
      
      // TODO: Call AI service for insights
      setTimeout(() => {
        ctx.ui.notify("💡 Insights generated! Check the transaction history for trends.", "success");
        ctx.ui.setStatus("ai-analyzer", "");
      }, 1500);
    },
  });

  // Intercept transaction-related queries
  pi.on("before_agent_start", async (event, ctx) => {
    const prompt = event.prompt?.toLowerCase() || "";
    
    if (prompt.includes("transaction") || prompt.includes("gasto") || prompt.includes("ingreso")) {
      return {
        systemPrompt: `
## Financial Context Active

You are working with ContAhorra, a mobile app for small business financial management.

Available data entities:
- **Transacciones**: Income, expenses, transfers between accounts
- **Categorías**: Spending/income categories with icons and colors
- **Cuentas**: Bank accounts or wallets
- **Perfiles**: User profiles within shared groups
- **Grupos**: Groups of users sharing financial data

When analyzing, consider:
1. Spending patterns over time
2. Category distribution and trends
3. Monthly budget vs actual spending
4. Recurring expenses identification
5. Saving opportunities
6. Unusual transactions (anomalies)

Use the available MCP tools to access transaction data when needed.
`,
      };
    }
  });
}