import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateAIResponse, NumerologyContext, AIResponse } from '../utils/aiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  context?: {
    birthDate?: string;
    numerologyData?: any;
    questionType?: string;
    confidence?: number;
    suggestions?: string[];
  };
}

interface ChatbotProps {
  userBirthDate?: string;
  numerologyData?: any;
  isOpen: boolean;
  onToggle: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ userBirthDate, numerologyData, isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Numerology Assistant. To provide you with personalized numerology insights, I need your birth date and full name. Please enter your information in the calculator above, then I can help you understand your personality traits, career paths, relationships, and answer any questions about your numerology profile!",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useExternalLLM, setUseExternalLLM] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if user has provided necessary information
  const hasUserInfo = userBirthDate && numerologyData && Object.keys(numerologyData).length > 0;

  // Update welcome message when user info becomes available
  useEffect(() => {
    if (hasUserInfo && messages.length === 1) {
      const welcomeMessage: Message = {
        id: '2',
        text: `Perfect! I can see your numerology profile. Your life path number is ${numerologyData.lifePath}, personality number is ${numerologyData.personality}, and destiny number is ${numerologyData.destiny}. Now I can provide you with personalized insights! What would you like to know about your numerology?`,
        sender: 'bot',
        timestamp: new Date(),
        context: {
          birthDate: userBirthDate,
          numerologyData: numerologyData,
          suggestions: [
            "Tell me about my personality",
            "What career suits me?",
            "What are my lucky elements?",
            "What's my yearly forecast?"
          ]
        }
      };
      setMessages(prev => [...prev, welcomeMessage]);
    }
  }, [hasUserInfo, numerologyData, userBirthDate, messages.length]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Check if user has provided information
      if (!hasUserInfo) {
        const reminderMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'd love to help you with your numerology questions! However, I need your birth date and full name to provide personalized insights. Please enter your information in the calculator above first, then I'll be able to give you detailed answers about your personality, career, relationships, and more based on your unique numerology profile.",
          sender: 'bot',
          timestamp: new Date(),
          context: {
            suggestions: [
              "Enter your birth date and name in the calculator",
              "Then ask me about your personality",
              "Or ask about your career path"
            ]
          }
        };
        setMessages(prev => [...prev, reminderMessage]);
        return;
      }

      // Prepare context for AI service
      const context: NumerologyContext = {
        birthDate: userBirthDate || '',
        lifePathNumber: numerologyData?.lifePath || 0,
        personalityNumber: numerologyData?.personality || 0,
        destinyNumber: numerologyData?.destiny || 0,
        soulUrgeNumber: numerologyData?.soulUrge || 0,
        expressionNumber: numerologyData?.expression || 0,
        personalYear: numerologyData?.personalYear || 0,
        luckyElements: numerologyData?.luckyElements || {},
        personalityAnalysis: numerologyData?.personalityAnalysis || {}
      };

      // Generate AI response
      const aiResponse: AIResponse = await generateAIResponse(
        inputText,
        context,
        useExternalLLM
      );

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        context: {
          birthDate: userBirthDate,
          numerologyData: numerologyData,
          questionType: aiResponse.context.questionType,
          confidence: aiResponse.confidence,
          suggestions: aiResponse.suggestions
        }
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.button>

      {/* Chatbot Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Numerology Assistant</h3>
                    <p className="text-sm opacity-90">
                      {hasUserInfo ? 'Personalized Mode' : 'Setup Required'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {/* AI Mode Toggle - Only show when user has info */}
                  {hasUserInfo && (
                    <button
                      onClick={() => setUseExternalLLM(!useExternalLLM)}
                      className={`px-2 py-1 rounded text-xs transition-colors ${
                        useExternalLLM 
                          ? 'bg-white/20 text-white' 
                          : 'bg-white/10 text-white/70 hover:text-white'
                      }`}
                      title={useExternalLLM ? 'Switch to Local AI' : 'Switch to Enhanced AI'}
                    >
                      {useExternalLLM ? 'Enhanced' : 'Local'}
                    </button>
                  )}
                  <button
                    onClick={onToggle}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    
                    {/* Confidence indicator for bot messages */}
                    {message.sender === 'bot' && message.context?.confidence && (
                      <div className="flex items-center mt-2 space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-green-500 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${message.context.confidence * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {Math.round(message.context.confidence * 100)}% confidence
                        </span>
                      </div>
                    )}
                    
                    {/* Suggestions for bot messages */}
                    {message.sender === 'bot' && message.context?.suggestions && (
                      <div className="mt-3 space-y-1">
                        <p className="text-xs text-gray-500">Suggested actions:</p>
                        <div className="flex flex-wrap gap-1">
                          {message.context.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full hover:bg-purple-200 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {useExternalLLM ? 'Enhanced AI thinking...' : 'Analyzing...'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={hasUserInfo ? "Ask about your numerology..." : "Enter your birth date and name first..."}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2 rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              
              {/* Quick Actions - Only show when user has info */}
              {hasUserInfo && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSuggestionClick("Tell me about my personality")}
                    className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-full hover:bg-purple-100 transition-colors"
                  >
                    Personality
                  </button>
                  <button
                    onClick={() => handleSuggestionClick("What career suits me?")}
                    className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-full hover:bg-purple-100 transition-colors"
                  >
                    Career
                  </button>
                  <button
                    onClick={() => handleSuggestionClick("What are my lucky elements?")}
                    className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-full hover:bg-purple-100 transition-colors"
                  >
                    Lucky Elements
                  </button>
                  <button
                    onClick={() => handleSuggestionClick("What's my yearly forecast?")}
                    className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-full hover:bg-purple-100 transition-colors"
                  >
                    Forecast
                  </button>
                </div>
              )}
              
              {/* Setup reminder when user doesn't have info */}
              {!hasUserInfo && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-700">
                    💡 <strong>Setup Required:</strong> Enter your birth date and full name in the calculator above to get personalized numerology insights!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot; 