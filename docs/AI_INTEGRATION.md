# ContAhorra AI Integration

This directory contains documentation for the AI, Skills, and MCPs integration with ContAhorra.

## Overview

The AI integration provides intelligent features for financial management:

- **Smart Transaction Categorization**: Automatically suggest categories based on description and amount
- **Spending Insights**: Generate actionable insights from transaction history
- **Budget Analysis**: Track spending against budgets with visual feedback
- **Anomaly Detection**: Identify unusual transactions or patterns
- **Natural Language Processing**: Parse transaction descriptions for better categorization

## Architecture

```
ContAhorra/
├── lib/ai/
│   ├── providers/        # AI provider implementations (OpenAI, Anthropic, Ollama)
│   ├── services/         # High-level AI services
│   └── types.ts          # TypeScript type definitions
├── lib/skills/
│   └── mcp-tools/        # MCP server tools for financial operations
└── scripts/
    └── .pi/extensions/   # Pi extension entry points
```

## Setup

### 1. Configure Environment Variables

Copy `.env.ai.example` to `.env.ai` and fill in your API keys:

```bash
cp .env.ai.example .env.ai
```

### 2. Choose AI Provider

**Option A: OpenAI (Recommended)**
```bash
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4o-mini
```

**Option B: Anthropic**
```bash
ANTHROPIC_API_KEY=sk-ant-your-key-here
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
```

**Option C: Local Ollama (Free, Offline)**
```bash
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

### 3. Run the Extension

```bash
# Using Pi CLI
pi -e scripts/.pi/extensions/contahorra-ai-extension.ts

# Or add to settings.json for persistent loading
```

## Available Commands

### Slash Commands
- `/analyze [limit]` - Analyze recent transactions (default: last 30)
- `/insights` - Generate spending insights

### MCP Tools
- `analyze_transaction` - Get AI category suggestions for a transaction
- `suggest_categories` - Get category recommendations
- `analyze_budget` - View budget performance by category

## Usage Examples

### In Pi Session
```
User: Analyze my last 30 transactions
Assistant: [Calls analyze_transaction tool]

User: What should I categorize "Walmart" as?
Assistant: [Calls suggest_categories tool]
```

### Programmatic Usage
```typescript
import { AIAnalysisService } from "@/lib/ai/services";

const aiService = new AIAnalysisService({
  model: process.env.OPENAI_MODEL || "gpt-4o-mini",
  apiKey: process.env.OPENAI_API_KEY,
});

// Categorize a transaction
const result = await aiService.categorizeTransaction(
  "Starbucks Coffee",
  4.50,
  ["Cafeterías", "Comida", "Bebidas"]
);

// Generate insights
const insights = await aiService.generateSpendingInsights(transactions);
```

## Integration Points

### Dashboard
- Real-time transaction analysis
- Spending trend visualization
- Anomaly alerts

### Add Transaction Form
- Auto-suggest category based on description
- Smart tags extraction
- Amount validation against historical patterns

### Reports
- Automated insight generation
- Predictive budget forecasting
- Saving opportunity identification

## Security Notes

- API keys are stored in environment variables only
- No transaction data is sent to external APIs beyond what's needed for analysis
- All analysis runs client-side when using local models

## Future Enhancements

- [ ] Multi-language support for transaction descriptions
- [ ] Voice input analysis
- [ ] Receipt image recognition via OCR
- [ ] Predictive cash flow modeling
- [ ] Tax season preparation insights