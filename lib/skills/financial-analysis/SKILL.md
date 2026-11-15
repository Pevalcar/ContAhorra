---
name: financial-analysis
description: "Analyze financial data, generate insights, categorize transactions, and provide spending recommendations. Use when working with ContAhorra financial records, transaction patterns, budgeting, or expense tracking."
---

# Financial Analysis Skill

This skill provides AI-powered financial analysis capabilities for ContAhorra.

## Capabilities

1. **Transaction Categorization** - Automatically suggest categories based on transaction description
2. **Spending Insights** - Generate actionable insights from spending patterns
3. **Budget Forecasting** - Predict future spending based on historical data
4. **Anomaly Detection** - Identify unusual transactions or patterns
5. **Saving Opportunities** - Find areas where costs can be reduced

## Usage

### Analyzing a Transaction

```typescript
import { OpenAIProvider } from "@/lib/ai/providers";

const provider = new OpenAIProvider({
  model: "gpt-4",
  apiKey: process.env.OPENAI_API_KEY,
});

const result = await provider.analyzeTransaction(
  "Walmart Supercenter",
  150.75,
  ["Comida", "Supermercado", "Transporte"]
);
```

### Generating Insights

```typescript
const insights = await provider.generateInsights(transactions);
```

## Integration Points

- Use in dashboard for real-time transaction analysis
- Integrate with AddTransaction form for smart categorization
- Use in reports for automated insight generation
- Hook into mobile push notifications for spending alerts

## Configuration

Set environment variables:
```bash
OPENAI_API_KEY=your_key_here
```

Or use local models via Ollama:
```bash
OLLAMA_BASE_URL=http://localhost:11434
```