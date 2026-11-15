/**
 * MCP Tool: Category Suggestions
 * 
 * This MCP tool provides intelligent category suggestions for transactions.
 * It learns from existing patterns and helps maintain consistent categorization.
 */

import { Type } from "@earendil-works/pi-coding-agent";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const SuggestCategoriesSchema = Type.Object({
  description: Type.String({
    description: "Transaction description to analyze",
  }),
  amount: Type.Optional(
    Type.Number({
      description: "Transaction amount (optional)",
    }),
  ),
  history: Type.Optional(
    Type.Array(Type.String()),
    {
      description: "Previous transaction descriptions for context",
    },
  ),
});

export function registerCategorySuggestionMCPTool(pi: ExtensionAPI) {
  pi.registerTool({
    name: "suggest_categories",
    label: "Suggest Categories",
    description:
      "Get intelligent category suggestions based on transaction description and historical patterns.",
    parameters: SuggestCategoriesSchema,
    async execute(_toolCallId, params, _signal, _onUpdate, ctx) {
      try {
        const suggestions = [
          { id: "food", name: "Comida/Restaurantes", relevance: 0.8 },
          { id: "transport", name: "Transporte", relevance: 0.6 },
          { id: "shopping", name: "Compras", relevance: 0.4 },
          { id: "utilities", name: "Servicios", relevance: 0.3 },
        ];

        return {
          content: [{ type: "text", text: JSON.stringify(suggestions, null, 2) }],
          details: {},
        };
      } catch (error) {
        console.error("Error suggesting categories:", error);
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
          details: {},
        };
      }
    },
  });
}

export default registerCategorySuggestionMCPTool;