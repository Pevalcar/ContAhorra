/**
 * AI-related type definitions for ContAhorra
 */

export interface AIServiceConfig {
  apiKey?: string;
  baseUrl?: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}

export interface TransactionAnalysis {
  id: string;
  predictedCategory: string;
  confidence: number;
  suggestedTags: string[];
  insights: string[];
}

export interface FinancialInsight {
  type: "spending_alert" | "saving_opportunity" | "budget_overview" | "pattern_recognition";
  title: string;
  description: string;
  data?: Record<string, unknown>;
  urgency?: "low" | "medium" | "high";
}

export interface AISuggestions {
  transactionSuggestion?: string;
  categoryRecommendation?: string;
  savingTips?: string[];
  budgetForecast?: number;
}

export enum AIProvider {
  OPENAI = "openai",
  ANTHROPIC = "anthropic",
  LOCAL_OLLAMA = "ollama",
}

export interface AIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}