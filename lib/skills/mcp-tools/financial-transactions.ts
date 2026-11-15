/**
 * MCP Tool: Financial Transaction Analysis
 * 
 * This MCP tool provides AI-powered analysis of financial transactions.
 * It integrates with the ContAhorra database to analyze spending patterns,
 * categorize transactions, and provide insights.
 */

import { Type } from "@earendil-works/pi-coding-agent";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

// Define the schema for transaction analysis requests
const AnalyzeTransactionSchema = Type.Object({
  description: Type.String({
    description: "Description of the transaction to analyze",
  }),
  amount: Type.Number({
    description: "Amount of the transaction",
  }),
  existingCategories: Type.Optional(
    Type.Array(Type.String()),
    {
      description: "List of existing categories in the system",
    },
  ),
});

export function registerFinancialTransactionMCPTool(pi: ExtensionAPI) {
  pi.registerTool({
    name: "analyze_transaction",
    label: "Analyze Transaction",
    description:
      "Analyze a financial transaction using AI to suggest category, tags, and insights based on description and amount.",
    parameters: AnalyzeTransactionSchema,
    async execute(_toolCallId, params, _signal, _onUpdate, ctx) {
      try {
        // TODO: Integrate with actual ContAhorra services
        // For now, return a mock response
        
        const mockAnalysis = {
          success: true,
          suggestedCategory: params.existingCategories?.[0] || "Comida",
          confidence: 0.85,
          suggestions: {
            relatedCategories: ["Supermercado", "Restaurantes"],
            tags: ["food", "daily_expense", "regular"],
            insight: "Regular food expense, consistent with typical weekly shopping pattern.",
          },
        };

        return {
          content: [{ type: "text", text: JSON.stringify(mockAnalysis, null, 2) }],
          details: {},
        };
      } catch (error) {
        console.error("Error analyzing transaction:", error);
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
          details: {},
        };
      }
    },
  });
}

// Additional MCP tools can be registered here
export function registerAllFinancialMCPTemplates(pi: ExtensionAPI) {
  registerFinancialTransactionMCPTool(pi);
  
  // Register more tools...
}