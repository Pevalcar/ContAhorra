/**
 * MCP Tool: Budget Analysis
 * 
 * This MCP tool provides budget planning and monitoring capabilities.
 */

import { Type } from "@earendil-works/pi-coding-agent";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const AnalyzeBudgetSchema = Type.Object({
  month: Type.String({
    description: "Month to analyze (YYYY-MM format)",
  }),
  categories: Type.Optional(
    Type.Array(Type.String()),
    {
      description: "Specific categories to focus on",
    },
  ),
});

export function registerBudgetAnalysisMCPTool(pi: ExtensionAPI) {
  pi.registerTool({
    name: "analyze_budget",
    label: "Analyze Budget",
    description:
      "Analyze spending against budget for a specific month, showing over/under performance.",
    parameters: AnalyzeBudgetSchema,
    async execute(_toolCallId, params, _signal, _onUpdate, ctx) {
      try {
        const mockData = {
          month: params.month,
          categories: [
            {
              id: "food",
              name: "Comida",
              budgeted: 500,
              spent: 432.50,
              remaining: 67.50,
              percentage: 86.5,
            },
            {
              id: "transport",
              name: "Transporte",
              budgeted: 200,
              spent: 185.00,
              remaining: 15.00,
              percentage: 92.5,
            },
            {
              id: "utilities",
              name: "Servicios",
              budgeted: 300,
              spent: 280.00,
              remaining: 20.00,
              percentage: 93.3,
            },
          ],
          totalBudgeted: 1000,
          totalSpent: 897.50,
          totalRemaining: 102.50,
          overallPercentage: 89.75,
        };

        return {
          content: [{ type: "text", text: JSON.stringify(mockData, null, 2) }],
          details: {},
        };
      } catch (error) {
        console.error("Error analyzing budget:", error);
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
          details: {},
        };
      }
    },
  });
}

export default registerBudgetAnalysisMCPTool;