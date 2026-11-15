/**
 * AI Analysis Service for ContAhorra
 * 
 * Provides high-level AI analysis capabilities by integrating with providers
 * and existing domain logic.
 */

import type { Transaccion } from "@/lib/domain/entities";
import OpenAIProvider from "@/lib/ai/providers/OpenAIProvider";
import type { AIServiceConfig, FinancialInsight } from "@/lib/ai/types";

export class AIAnalysisService {
  private openaiProvider: OpenAIProvider;
  private config: AIServiceConfig;

  constructor(config: AIServiceConfig) {
    this.config = config;
    this.openaiProvider = new OpenAIProvider(config);
  }

  /**
   * Categorize a transaction using AI
   */
  async categorizeTransaction(
    description: string,
    amount: number,
    existingCategories: string[],
  ): Promise<{ category: string; confidence: number; tags: string[] }> {
    const result = await this.openaiProvider.analyzeTransaction(
      description,
      amount,
      existingCategories,
    );

    if (!result.success || !result.data) {
      return {
        category: "Sin Categoría",
        confidence: 0,
        tags: [],
      };
    }

    return {
      category: result.data.category || "Sin Categoría",
      confidence: result.data.confidence || 0,
      tags: result.data.tags || [],
    };
  }

  /**
   * Generate financial insights from transactions
   */
  async generateSpendingInsights(transactions: Transaccion[]): Promise<FinancialInsight[]> {
    const result = await this.openaiProvider.generateInsights(transactions);

    if (!result.success || !result.data) {
      return [];
    }

    return result.data.map((insight: any) => ({
      type: insight.type,
      title: insight.title,
      description: insight.description,
      urgency: insight.urgency || "medium",
    }));
  }

  /**
   * Provide spending recommendations based on history
   */
  async getSpendingRecommendations(transactions: Transaccion[]): Promise<string[]> {
    try {
      // Group by category
      const byCategory: Record<string, number> = {};
      transactions.forEach((t) => {
        if (t.type === "Gasto") {
          byCategory[t.categoryID] = (byCategory[t.categoryID] || 0) + t.balance;
        }
      });

      const topCategories = Object.entries(byCategory)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

      // TODO: Use AI to generate personalized recommendations
      // For now, return simple tips
      return [
        `Review spending in your top ${topCategories.length} categories`,
        "Consider setting monthly budgets for each category",
        "Look for recurring expenses that can be optimized",
      ];
    } catch (error) {
      console.error("Error getting recommendations:", error);
      return ["No recommendations available at this time."];
    }
  }

  /**
   * Detect anomalies in spending patterns
   */
  async detectAnomalies(transactions: Transaccion[], threshold: number = 2): Promise<any[]> {
    try {
      // Simple anomaly detection: transactions above 2x average
      const expenses = transactions.filter((t) => t.type === "Gasto");
      if (expenses.length === 0) return [];

      const avgExpense =
        expenses.reduce((sum, t) => sum + t.balance, 0) / expenses.length;
      const anomalies = expenses.filter((t) => t.balance > avgExpense * threshold);

      return anomalies.map((t) => ({
        id: t.id,
        description: t.description,
        amount: t.balance,
        date: t.date,
        reason: `Amount ($${t.balance}) exceeds ${threshold}x average ($${avgExpense.toFixed(2)})`,
      }));
    } catch (error) {
      console.error("Error detecting anomalies:", error);
      return [];
    }
  }
}

export default AIAnalysisService;