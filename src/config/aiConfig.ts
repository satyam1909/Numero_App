// AI Configuration for External LLM Integration

export interface AIConfig {
  useExternalLLM: boolean;
  apiEndpoint?: string;
  apiKey?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

// Default configuration
export const defaultAIConfig: AIConfig = {
  useExternalLLM: false,
  apiEndpoint: '',
  apiKey: '',
  model: 'gpt-3.5-turbo',
  maxTokens: 500,
  temperature: 0.7
};

// OpenAI Configuration
export const openAIConfig: AIConfig = {
  useExternalLLM: true,
  apiEndpoint: 'https://api.openai.com/v1/chat/completions',
  model: 'gpt-3.5-turbo',
  maxTokens: 500,
  temperature: 0.7
};

// Anthropic Configuration
export const anthropicConfig: AIConfig = {
  useExternalLLM: true,
  apiEndpoint: 'https://api.anthropic.com/v1/messages',
  model: 'claude-3-sonnet-20240229',
  maxTokens: 500,
  temperature: 0.7
};

// Local AI Configuration (current implementation)
export const localAIConfig: AIConfig = {
  useExternalLLM: false,
  model: 'local-nlp',
  maxTokens: 300,
  temperature: 0.8
};

// Get current AI configuration
export const getCurrentAIConfig = (): AIConfig => {
  // For now, return local config
  // In production, this would check environment variables
  return localAIConfig;
};

// Numerology-specific prompt templates
export const numerologyPrompts = {
  personality: `Based on the numerology data provided, analyze the user's personality traits. Consider their life path number, personality number, and expression number. Provide insights about their character, communication style, and how they interact with others.`,
  
  career: `Using the numerology profile, suggest suitable career paths. Consider their destiny number, life path number, and soul urge number. Explain how their natural talents and motivations align with different professional fields.`,
  
  relationships: `Analyze the user's relationship patterns based on their numerology. Consider their personality number, soul urge number, and life path number. Provide insights about compatibility, communication in relationships, and what they seek in partnerships.`,
  
  lucky_elements: `Based on the user's life path number and numerology profile, identify their lucky elements including colors, numbers, days, and months. Explain how these elements enhance their natural energy and bring positive opportunities.`,
  
  life_path: `Explain the user's life path number and its significance. Describe their soul's journey, primary mission in this lifetime, and how this number influences major life decisions and directions.`,
  
  forecast: `Provide a yearly forecast based on the user's personal year number. Describe the themes, opportunities, challenges, and advice for the upcoming year based on numerological cycles.`,
  
  general: `Provide general insights about the user's numerology profile. Explain how their various numbers work together to create their unique energetic signature and spiritual blueprint.`
};

// Response formatting guidelines
export const responseGuidelines = {
  tone: 'Warm, insightful, and encouraging',
  length: '2-4 sentences for concise responses',
  structure: 'Start with insight, provide context, end with actionable advice',
  style: 'Conversational yet professional, with numerological accuracy'
};

export default {
  defaultAIConfig,
  openAIConfig,
  anthropicConfig,
  localAIConfig,
  getCurrentAIConfig,
  numerologyPrompts,
  responseGuidelines
}; 