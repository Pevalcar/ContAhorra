/**
 * OpenAI Provider implementation for ContAhorra AI module
 * 
 * This provider handles interactions with OpenAI API for:
 * - Transaction categorization
 * - Financial insights generation
 * - Natural language processing
 */

import type { AIServiceConfig, AIResponse } from "@/lib/ai/types";

export class OpenAIProvider {
  private config: AIServiceConfig;
  private baseUrl: string;

  constructor(config: AIServiceConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || "https://api.openai.com/v1";
  }

  /**
   * Analyze a transaction and suggest category and tags
   */
  async analyzeTransaction(
    description: string,
    amount: number,
    existingCategories: string[],
  ): Promise<AIResponse<any>> {
    try {
      const prompt = `
You are a financial assistant analyzing a transaction. 

Description: ${description}
Amount: ${amount}

Available categories: ${existingCategories.join(", ")}

Please provide:
1. The most appropriate category
2. Confidence score (0-1)
3. Relevant tags (max 5)
4. Brief insight about this transaction

Return your response in JSON format with fields: category, confidence, tags, insight
`;

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [{ role: "user", content: prompt }],
          temperature: this.config.temperature ?? 0.3,
          max_tokens: this.config.maxTokens ?? 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const parsedResponse = JSON.parse(data.choices[0].message.content);

      return {
        success: true,
        data: parsedResponse,
        usage: {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
        },
      };
    } catch (error) {
      console.error("Error analyzing transaction:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Generate financial insights based on transaction history
   */
  async generateInsights(transactions: any[]): Promise<AIResponse<any[]>> {
    try {
      const recentTransactions = transactions.slice(0, 50);
      
      const prompt = `
Analyze these recent financial transactions and provide insights:
${JSON.stringify(recentTransactions, null, 2)}

Provide up to 3 actionable insights about spending patterns, budget trends, or saving opportunities.
For each insight, include:
- Type (spending_alert, saving_opportunity, budget_overview, pattern_recognition)
- Title
- Description
- Urgency level (low, medium, high)

Return as JSON array.
`;

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const insights = JSON.parse(data.choices[0].message.content);

      return {
        success: true,
        data: insights,
      };
    } catch (error) {
      console.error("Error generating insights:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export default OpenAIProvider;