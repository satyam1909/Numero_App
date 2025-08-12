// AI Service for Enhanced Chatbot Responses
// This service can integrate with various LLM APIs for more intelligent responses

export interface AIResponse {
  text: string;
  confidence: number;
  context: any;
  suggestions?: string[];
}

export interface NumerologyContext {
  birthDate: string;
  lifePathNumber: number;
  personalityNumber: number;
  destinyNumber: number;
  soulUrgeNumber: number;
  expressionNumber: number;
  personalYear: number;
  luckyElements: any;
  personalityAnalysis: any;
}

// Enhanced NLP Question Classification
export const classifyQuestion = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  // Enhanced pattern matching with multiple keywords
  const patterns = {
    personality: ['personality', 'traits', 'character', 'nature', 'temperament', 'behavior'],
    career: ['career', 'job', 'work', 'profession', 'business', 'occupation', 'vocation'],
    relationships: ['love', 'relationship', 'romance', 'partner', 'marriage', 'dating', 'compatibility'],
    lucky_elements: ['lucky', 'color', 'number', 'day', 'month', 'element', 'fortune'],
    life_path: ['life path', 'destiny', 'purpose', 'mission', 'journey', 'path'],
    forecast: ['year', 'forecast', 'prediction', 'future', 'upcoming', 'next'],
    health: ['health', 'wellness', 'healing', 'body', 'mind', 'spirit'],
    spirituality: ['spiritual', 'soul', 'divine', 'higher self', 'consciousness'],
    challenges: ['challenge', 'difficulty', 'obstacle', 'problem', 'struggle'],
    opportunities: ['opportunity', 'chance', 'possibility', 'potential', 'growth']
  };

  for (const [category, keywords] of Object.entries(patterns)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return category;
    }
  }

  return 'general';
};

// Context-Aware Response Generation with LLM Integration
export const generateAIResponse = async (
  userMessage: string,
  context: NumerologyContext,
  useExternalLLM: boolean = false
): Promise<AIResponse> => {
  
  // Check if user has provided necessary information
  if (!context.birthDate || context.lifePathNumber === 0) {
    return {
      text: "I'd love to help you with your numerology questions! However, I need your birth date and full name to provide personalized insights. Please enter your information in the calculator above first, then I'll be able to give you detailed answers about your personality, career, relationships, and more based on your unique numerology profile.",
      confidence: 1.0,
      context: { questionType: 'setup_required', userMessage },
      suggestions: [
        "Enter your birth date and name in the calculator",
        "Then ask me about your personality",
        "Or ask about your career path"
      ]
    };
  }
  
  const questionType = classifyQuestion(userMessage);
  
  if (useExternalLLM) {
    return await callExternalLLM(userMessage, context, questionType);
  } else {
    return await generateLocalResponse(userMessage, context, questionType);
  }
};

// Local AI Response Generation (Advanced Pattern-Based)
const generateLocalResponse = async (
  userMessage: string,
  context: NumerologyContext,
  questionType: string
): Promise<AIResponse> => {
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
  
  let response = '';
  let confidence = 0.8;
  let suggestions: string[] = [];

  switch (questionType) {
    case 'personality':
      response = generatePersonalityInsight(userMessage, context);
      suggestions = [
        "Ask about your career compatibility",
        "Learn about your relationship style",
        "Discover your lucky elements"
      ];
      break;
      
    case 'career':
      response = generateCareerInsight(userMessage, context);
      suggestions = [
        "Explore your personality traits",
        "Check your yearly forecast",
        "Find your lucky career numbers"
      ];
      break;
      
    case 'relationships':
      response = generateRelationshipInsight(userMessage, context);
      suggestions = [
        "Understand your personality in love",
        "Check compatibility numbers",
        "Learn about your soul's desires"
      ];
      break;
      
    case 'lucky_elements':
      response = generateLuckyElementsInsight(userMessage, context);
      suggestions = [
        "Discover your life path purpose",
        "Check your yearly forecast",
        "Learn about your personality traits"
      ];
      break;
      
    case 'life_path':
      response = generateLifePathInsight(userMessage, context);
      suggestions = [
        "Explore your career potential",
        "Understand your personality",
        "Check your lucky elements"
      ];
      break;
      
    case 'forecast':
      response = generateForecastInsight(userMessage, context);
      suggestions = [
        "Learn about your life path",
        "Check your lucky elements",
        "Understand your personality"
      ];
      break;
      
    case 'health':
      response = generateHealthInsight(userMessage, context);
      suggestions = [
        "Explore your life path purpose",
        "Check your personality traits",
        "Learn about your lucky elements"
      ];
      break;
      
    case 'spirituality':
      response = generateSpiritualityInsight(userMessage, context);
      suggestions = [
        "Understand your soul's journey",
        "Explore your life path",
        "Check your personality traits"
      ];
      break;
      
    default:
      response = generateGeneralInsight(userMessage, context);
      suggestions = [
        "Ask about your personality",
        "Learn about your career path",
        "Check your lucky elements"
      ];
      confidence = 0.6;
  }

  return {
    text: response,
    confidence,
    context: { questionType, userMessage },
    suggestions
  };
};

// Enhanced Response Generators with Deep Numerology Knowledge
const generatePersonalityInsight = (_message: string, context: NumerologyContext): string => {
  const { personalityNumber, lifePathNumber, expressionNumber } = context;
  
  const insights = [
    `Your personality number ${personalityNumber} reveals you're naturally ${getPersonalityTrait(personalityNumber)}. Combined with your life path number ${lifePathNumber}, you have a unique ability to ${getCombinedTrait(personalityNumber, lifePathNumber)}. Your expression number ${expressionNumber} shows you communicate through ${getExpressionStyle(expressionNumber)}.`,
    
    `The energy of your personality number ${personalityNumber} makes you ${getPersonalityEnergy(personalityNumber)}. This influences how others perceive you and how you interact with the world. Your life path number ${lifePathNumber} adds ${getLifePathInfluence(lifePathNumber)} to your personality.`,
    
    `Your personality number ${personalityNumber} indicates you're ${getPersonalityDescription(personalityNumber)}. This affects your communication style, decision-making process, and how you express yourself in different situations.`
  ];
  
  return insights[Math.floor(Math.random() * insights.length)];
};

const generateCareerInsight = (_message: string, context: NumerologyContext): string => {
  const { destinyNumber, expressionNumber, lifePathNumber, soulUrgeNumber } = context;
  
  const insights = [
    `Your destiny number ${destinyNumber} points toward ${getDestinyCareer(destinyNumber)}. Your expression number ${expressionNumber} shows you excel at ${getExpressionCareer(expressionNumber)}. Together, these suggest you'd thrive in ${getCombinedCareer(destinyNumber, expressionNumber)}.`,
    
    `Based on your life path number ${lifePathNumber}, you're naturally drawn to ${getLifePathCareer(lifePathNumber)}. Your soul urge number ${soulUrgeNumber} reveals you're motivated by ${getSoulUrgeCareer(soulUrgeNumber)}. This combination suggests ${getCareerCombination(lifePathNumber, soulUrgeNumber)}.`,
    
    `Your numerology profile suggests you'd excel in careers that involve ${getCareerField(destinyNumber)}. Your natural talents in ${getCareerTalent(expressionNumber)} make you particularly suited for ${getCareerPath(lifePathNumber)}.`
  ];
  
  return insights[Math.floor(Math.random() * insights.length)];
};

const generateRelationshipInsight = (_message: string, context: NumerologyContext): string => {
  const { personalityNumber, soulUrgeNumber, expressionNumber, lifePathNumber } = context;
  
  const insights = [
    `In relationships, your personality number ${personalityNumber} makes you ${getRelationshipStyle(personalityNumber)}. Your soul urge number ${soulUrgeNumber} shows you're seeking ${getSoulUrgeRelationship(soulUrgeNumber)}. You're most compatible with people who have ${getCompatibilityNumbers(lifePathNumber)}.`,
    
    `Your expression number ${expressionNumber} reveals you communicate love through ${getLoveCommunication(expressionNumber)}. Your soul urge number ${soulUrgeNumber} indicates you need ${getSoulUrgeNeed(soulUrgeNumber)} in relationships.`,
    
    `Your personality number ${personalityNumber} influences how you approach love and relationships. You're naturally ${getPersonalityRelationship(personalityNumber)} and seek partners who can ${getPartnerQualities(lifePathNumber)}.`
  ];
  
  return insights[Math.floor(Math.random() * insights.length)];
};

// Helper functions for enhanced responses
const getPersonalityTrait = (number: number): string => {
  const traits = {
    1: 'independent and pioneering',
    2: 'cooperative and diplomatic',
    3: 'creative and expressive',
    4: 'organized and reliable',
    5: 'adventurous and freedom-loving',
    6: 'nurturing and responsible',
    7: 'analytical and spiritual',
    8: 'ambitious and authoritative',
    9: 'compassionate and idealistic'
  };
  return traits[number as keyof typeof traits] || 'unique and special';
};

const getCombinedTrait = (personality: number, lifePath: number): string => {
  const combinations = {
    '1-1': 'lead with both confidence and purpose',
    '2-2': 'create harmony in all situations',
    '3-3': 'inspire others through creativity',
    '4-4': 'build solid foundations',
    '5-5': 'embrace change and adventure',
    '6-6': 'care for others with deep responsibility',
    '7-7': 'seek wisdom and spiritual growth',
    '8-8': 'achieve great success through determination',
    '9-9': 'serve humanity with compassion'
  };
  const key = `${personality}-${lifePath}`;
  return combinations[key as keyof typeof combinations] || 'express your unique gifts';
};

const getExpressionStyle = (number: number): string => {
  const styles = {
    1: 'direct and confident communication',
    2: 'gentle and diplomatic expression',
    3: 'creative and inspiring words',
    4: 'clear and structured communication',
    5: 'dynamic and engaging expression',
    6: 'caring and supportive communication',
    7: 'thoughtful and analytical expression',
    8: 'powerful and authoritative communication',
    9: 'compassionate and universal expression'
  };
  return styles[number as keyof typeof styles] || 'authentic self-expression';
};

const getDestinyCareer = (number: number): string => {
  const careers = {
    1: 'leadership and entrepreneurship',
    2: 'diplomacy and counseling',
    3: 'arts and communication',
    4: 'management and administration',
    5: 'sales and travel',
    6: 'healthcare and education',
    7: 'research and technology',
    8: 'finance and business',
    9: 'humanitarian work and healing'
  };
  return careers[number as keyof typeof careers] || 'your unique calling';
};

// Additional helper functions (simplified for brevity)
const getPersonalityEnergy = (_number: number) => 'dynamic and inspiring';
const getLifePathInfluence = (_number: number) => 'a sense of purpose and direction';
const getPersonalityDescription = (_number: number) => 'naturally charismatic and inspiring';
const getExpressionCareer = (_number: number) => 'creative problem-solving and communication';
const getCombinedCareer = (_destiny: number, _expression: number) => 'innovative leadership roles';
const getLifePathCareer = (_number: number) => 'pioneering new approaches';
const getSoulUrgeCareer = (_number: number) => 'helping others and making a difference';
const getCareerCombination = (_lifePath: number, _soulUrge: number) => 'transformative leadership with heart';
const getCareerField = (_number: number) => 'various professional fields';
const getCareerTalent = (_number: number) => 'creative problem-solving';
const getCareerPath = (_number: number) => 'innovative and leadership roles';
const getRelationshipStyle = (_number: number) => 'loyal and deeply caring';
const getSoulUrgeRelationship = (_number: number) => 'deep emotional connection and understanding';
const getCompatibilityNumbers = (_number: number) => 'stability and emotional depth';
const getLoveCommunication = (_number: number) => 'thoughtful and meaningful conversations';
const getSoulUrgeNeed = (_number: number) => 'emotional security and understanding';
const getPersonalityRelationship = (_number: number) => 'committed and loving';
const getPartnerQualities = (_number: number) => 'provide stability and emotional depth';

// External LLM Integration (placeholder for future implementation)
const callExternalLLM = async (
  userMessage: string,
  context: NumerologyContext,
  questionType: string
): Promise<AIResponse> => {
  // This would integrate with OpenAI, Anthropic, or other LLM APIs
  // For now, we'll use the local response as fallback
  
  console.log('External LLM integration would be called here');
  console.log('User message:', userMessage);
  console.log('Context:', context);
  console.log('Question type:', questionType);
  
  // Placeholder for actual API call
  return await generateLocalResponse(userMessage, context, questionType);
};

// Additional response generators
const generateLuckyElementsInsight = (_message: string, context: NumerologyContext): string => {
  const { lifePathNumber } = context;
  return `Your lucky elements are deeply connected to your life path number ${lifePathNumber}. Your lucky colors are ${getLuckyColors(lifePathNumber)}, and your lucky numbers include ${getLuckyNumbers(lifePathNumber)}. These elements enhance your natural energy and bring positive opportunities.`;
};

const generateLifePathInsight = (_message: string, context: NumerologyContext): string => {
  const { lifePathNumber } = context;
  return `Your life path number ${lifePathNumber} indicates your soul's journey is focused on ${getLifePathPurpose(lifePathNumber)}. This is your primary mission in this lifetime and influences all major decisions.`;
};

const generateForecastInsight = (_message: string, context: NumerologyContext): string => {
  const { personalYear } = context;
  return `Looking at your numerology for the coming year, you're entering a ${getYearlyPhase(personalYear)} phase. This brings opportunities in ${getYearlyOpportunity(personalYear)} and suggests focusing on ${getYearlyFocus(personalYear)}.`;
};

const generateHealthInsight = (_message: string, context: NumerologyContext): string => {
  const { lifePathNumber, personalityNumber } = context;
  return `Your numerology suggests focusing on ${getHealthFocus(lifePathNumber)} for optimal wellness. Your personality number ${personalityNumber} indicates you benefit from ${getHealthActivity(personalityNumber)}.`;
};

const generateSpiritualityInsight = (_message: string, context: NumerologyContext): string => {
  const { soulUrgeNumber, lifePathNumber } = context;
  return `Your soul urge number ${soulUrgeNumber} reveals your spiritual path involves ${getSpiritualPath(soulUrgeNumber)}. Combined with your life path number ${lifePathNumber}, you're here to ${getSpiritualPurpose(lifePathNumber)}.`;
};

const generateGeneralInsight = (_message: string, context: NumerologyContext): string => {
  return `That's an interesting question about numerology! Based on your profile, I can see that your numbers create a unique energetic signature. Your life path number ${context.lifePathNumber} combined with your personality number ${context.personalityNumber} reveals fascinating insights about your spiritual journey. What specific aspect would you like to explore further?`;
};

// Additional helper functions
const getLuckyColors = (_number: number) => 'colors that resonate with your energy';
const getLuckyNumbers = (_number: number) => 'numbers that bring you good fortune';
const getLifePathPurpose = (_number: number) => 'pioneering new paths and inspiring others';
const getYearlyPhase = (_number: number) => 'growth and expansion';
const getYearlyOpportunity = (_number: number) => 'personal development and new experiences';
const getYearlyFocus = (_number: number) => 'building foundations and stability';
const getHealthFocus = (_number: number) => 'activities that align with your natural energy';
const getHealthActivity = (_number: number) => 'physical activities that challenge your independence';
const getSpiritualPath = (_number: number) => 'deep inner exploration and wisdom seeking';
const getSpiritualPurpose = (_number: number) => 'serve as a spiritual guide and healer';

export default {
  classifyQuestion,
  generateAIResponse,
  generateLocalResponse,
  callExternalLLM
}; 