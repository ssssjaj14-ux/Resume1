import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, FileText, Briefcase, TrendingUp } from 'lucide-react';
import { analyzeResumeWithGemini, getJobRecommendationsWithAI } from '../services/geminiService';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface AIAssistantProps {
  resumeData?: any;
  isLoggedIn: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ resumeData, isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm Panda AI 🐼, your intelligent career companion. I remember our conversations and can help you with resume analysis, job matching, career guidance, and much more. What would you like to explore today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load conversation history on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('aiChatHistory');
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory);
        setConversationHistory(history);
        if (history.length > 1) {
          setMessages([
            {
              id: '1',
              type: 'assistant',
              content: "Welcome back! I remember our previous conversations. How can I continue helping you with your career today?",
              timestamp: new Date()
            }
          ]);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }, []);

  // Save conversation history
  useEffect(() => {
    if (messages.length > 1) {
      const historyToSave = [...conversationHistory, ...messages.slice(1)];
      localStorage.setItem('aiChatHistory', JSON.stringify(historyToSave.slice(-50))); // Keep last 50 messages
      setConversationHistory(historyToSave.slice(-50));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    {
      icon: FileText,
      label: "Analyze Resume",
      action: () => handleQuickAction("analyze-resume")
    },
    {
      icon: Briefcase,
      label: "Find Jobs",
      action: () => handleQuickAction("find-jobs")
    },
    {
      icon: TrendingUp,
      label: "Career Tips",
      action: () => handleQuickAction("career-tips")
    }
  ];

  const handleQuickAction = async (action: string) => {
    let message = '';
    switch (action) {
      case 'analyze-resume':
        message = 'Please analyze my resume and provide feedback';
        break;
      case 'find-jobs':
        message = 'Help me find jobs that match my skills';
        break;
      case 'career-tips':
        message = 'Give me some career advancement tips';
        break;
    }
    
    if (message) {
      await handleSendMessage(message);
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      let response = '';
      const context = [...conversationHistory, ...messages, userMessage];

      // Handle different types of queries with context awareness
      if (text.toLowerCase().includes('analyze') || text.toLowerCase().includes('resume')) {
        if (resumeData) {
          const analysis = await analyzeResumeWithGemini(resumeData);
          response = `🎯 **Resume Analysis Complete!**\n\n**ATS Score:** ${analysis.atsScore}/100\n\n**Key Strengths:**\n${analysis.strengths.map(s => `✅ ${s}`).join('\n')}\n\n**Areas for Improvement:**\n${analysis.weaknesses.map(w => `⚠️ ${w}`).join('\n')}\n\n**Smart Recommendations:**\n${analysis.suggestions.map(s => `💡 ${s}`).join('\n')}\n\nWould you like me to help you implement any of these suggestions?`;
        } else {
          response = "I'd love to analyze your resume! Please create or upload a resume first using the Resume Builder section. Once you have your resume ready, I can provide detailed ATS scoring and improvement suggestions.";
        }
      } else if (text.toLowerCase().includes('job') || text.toLowerCase().includes('career')) {
        if (isLoggedIn && resumeData?.skills) {
          const jobs = await getJobRecommendationsWithAI(resumeData.skills);
          response = `💼 **Personalized Job Recommendations:**\n\n${jobs.slice(0, 5).map((job, i) => `${i + 1}. **${job.title}** at ${job.company}\n   📍 ${job.location} | 💰 ${job.salary}\n   🎯 Match: ${job.matchScore}%\n   📋 ${job.description.substring(0, 100)}...\n`).join('\n')}\n\nWould you like me to help you prepare for applications to any of these positions?`;
        } else if (!isLoggedIn) {
          response = "To get personalized job recommendations, please log in to access the Career Portal! I can provide much better suggestions when I know your background.";
        } else {
          response = "I need your resume data to provide targeted job recommendations. Please create a resume first, and I'll match you with perfect opportunities!";
        }
      } else if (text.toLowerCase().includes('remember') || text.toLowerCase().includes('previous')) {
        const recentContext = conversationHistory.slice(-10);
        if (recentContext.length > 0) {
          response = `🧠 **I remember our conversations!** Here's what we've discussed recently:\n\n${recentContext.slice(-3).map((msg, i) => `${i + 1}. ${msg.type === 'user' ? 'You asked' : 'I helped'}: ${msg.content.substring(0, 80)}...`).join('\n')}\n\nHow can I continue helping you based on our previous discussions?`;
        } else {
          response = "This is our first conversation! I'm excited to learn about your career goals and help you succeed. What would you like to work on?";
        }
      } else if (text.toLowerCase().includes('tip') || text.toLowerCase().includes('advice')) {
        const personalizedTips = getPersonalizedTips(resumeData, context);
        response = `💡 **Personalized Career Success Tips:**\n\n${personalizedTips.map(tip => `🎯 ${tip}`).join('\n')}\n\nWould you like me to elaborate on any of these strategies?`;
      } else {
        // General AI response with context
        response = await getAIResponse(text, context);
      }

      // More natural response timing
      const responseDelay = 800 + Math.random() * 400;
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, responseDelay);

    } catch (error) {
      console.error('AI Assistant error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm having trouble processing your request right now. Please try again or contact support if the issue persists.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const getPersonalizedTips = (resumeData: any, context: Message[]): string[] => {
    const tips = [];
    
    if (resumeData?.skills?.includes('JavaScript') || resumeData?.skills?.includes('React')) {
      tips.push('**Build a coding portfolio** - Showcase your React projects on GitHub Pages');
      tips.push('**Contribute to open source** - Find React/JavaScript projects to contribute to');
    }
    
    if (resumeData?.experience?.length === 0) {
      tips.push('**Start with internships** - Gain practical experience while building your network');
      tips.push('**Create personal projects** - Build applications that solve real problems');
    }
    
    if (!resumeData?.personalInfo?.linkedin) {
      tips.push('**Optimize your LinkedIn** - Complete profile with professional photo and summary');
    }
    
    // Add general tips
    tips.push('**Network strategically** - Connect with professionals in your target companies');
    tips.push('**Quantify achievements** - Use numbers to demonstrate your impact');
    tips.push('**Practice storytelling** - Prepare compelling stories for interviews');
    tips.push('**Stay updated** - Follow industry trends and emerging technologies');
    
    return tips.slice(0, 6);
  };

  const getAIResponse = async (query: string, context: Message[]): Promise<string> => {
    // Simple rule-based responses for common queries
    const lowerQuery = query.toLowerCase();
    
    // Check context for better responses
    const hasDiscussedResume = context.some(msg => 
      msg.content.toLowerCase().includes('resume') || 
      msg.content.toLowerCase().includes('analyze')
    );
    
    const hasDiscussedJobs = context.some(msg => 
      msg.content.toLowerCase().includes('job') || 
      msg.content.toLowerCase().includes('career')
    );
    
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
      if (hasDiscussedResume || hasDiscussedJobs) {
        return "Hello again! 👋 I remember we've been working on your career development. How can I continue helping you today?";
      }
      return "Hello! 👋 I'm Panda AI, your intelligent career companion. I can help you with resume analysis, job matching, career strategy, and much more. What's your biggest career goal right now?";
    }
    
    if (lowerQuery.includes('help')) {
      return "I'm here to accelerate your career success! Here's how I can help:\n\n🎯 **Smart Resume Analysis** - ATS scoring with actionable improvements\n💼 **Intelligent Job Matching** - AI-powered opportunities based on your profile\n📈 **Strategic Career Planning** - Personalized roadmaps for growth\n🧠 **Interview Mastery** - Practice sessions and expert tips\n🌟 **Skill Development** - Identify gaps and learning paths\n💰 **Salary Negotiation** - Market insights and strategies\n\nI remember our conversations, so I can provide increasingly personalized advice. What's your priority today?";
    }
    
    if (lowerQuery.includes('salary') || lowerQuery.includes('pay')) {
      const personalizedSalary = resumeData?.skills?.includes('JavaScript') ? 
        "Based on your JavaScript skills, here are realistic ranges:" :
        "Here are current market salary insights:";
      
      return `💰 **${personalizedSalary}**\n\n**India Market (2025):**\n• **Entry Level (0-2 years):** ₹4-10 LPA\n• **Mid Level (2-5 years):** ₹10-25 LPA\n• **Senior Level (5+ years):** ₹25-60 LPA\n• **Leadership Roles:** ₹60+ LPA\n\n**Key Factors:**\n• Technical expertise and certifications\n• Company tier (FAANG vs startup vs service)\n• Location (Bangalore/Mumbai premium)\n• Negotiation and market timing\n\nWant me to analyze your specific earning potential?`;
    }
    
    if (lowerQuery.includes('thank') || lowerQuery.includes('thanks')) {
      return "You're very welcome! 😊 I'm always here to help you succeed. Remember, career growth is a journey, and I'm excited to be part of yours. Feel free to ask me anything anytime!";
    }
    
    return "That's a great question! I specialize in career acceleration and professional development. Whether it's resume optimization, job strategy, skill development, or interview preparation - I'm here to help you succeed. What specific career challenge can I help you tackle?";
  };

  const formatMessage = (content: string) => {
    // Convert markdown-like formatting to JSX
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={index} className="font-bold text-blue-600 dark:text-blue-400 mb-2 text-base">{line.slice(2, -2)}</div>;
      }
      if (line.startsWith('• ')) {
        return <div key={index} className="ml-4 mb-1 flex items-start space-x-2">
          <span className="text-blue-500 mt-1">•</span>
          <span>{line.slice(2)}</span>
        </div>;
      }
      if (line.match(/^\d+\./)) {
        return <div key={index} className="mb-1 font-medium text-purple-600 dark:text-purple-400">{line}</div>;
      }
      return line ? <div key={index} className="mb-1 leading-relaxed">{line}</div> : <div key={index} className="mb-2"></div>;
    });
  };

  const toggleChat = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent event bubbling
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      // Focus input when opening chat
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const chatWindow = document.querySelector('.ai-chat-window');
      const chatButton = document.querySelector('.ai-chat-button');
      
      if (isOpen && chatWindow && !chatWindow.contains(target) && !chatButton?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={toggleChat}
        className="ai-chat-button fixed bottom-6 right-6 z-50 w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 group hover:shadow-3xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        transition={{ type: "spring" }}
        aria-label={isOpen ? 'Close chat' : 'Open chat with AI Assistant'}
        aria-expanded={isOpen}
      >
        <div className="relative flex flex-col items-center">
          <motion.div 
            className="text-2xl sm:text-3xl mb-1"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🐼
          </motion.div>
          <div className="text-xs font-bold opacity-90 group-hover:opacity-100 transition-opacity hidden sm:block">
            AI
          </div>
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"
            animate={{ 
              scale: [1, 1.3, 1],
              boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0.7)", "0 0 0 10px rgba(34, 197, 94, 0)", "0 0 0 0 rgba(34, 197, 94, 0)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
              role="presentation"
            />
            
            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="ai-chat-window fixed bottom-24 right-6 w-[calc(100%-3rem)] sm:w-full max-w-md h-[70vh] max-h-[800px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
              role="dialog"
              aria-labelledby="chat-title"
              aria-modal="true"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <motion.span 
                      className="text-xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      🐼
                    </motion.span>
                  </div>
                  <div>
                    <h3 id="chat-title" className="font-bold text-lg">Panda AI</h3>
                    <p className="text-xs opacity-90">Your Career Companion</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
                <div className="grid grid-cols-3 gap-2 min-w-max">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={action.action}
                      className="flex flex-col items-center space-y-1 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 px-2 py-3 rounded-xl text-xs hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all shadow-sm border border-blue-100 dark:border-blue-800"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={action.label}
                    >
                      <action.icon className="w-4 h-4" />
                      <span className="font-medium">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                          : 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white border-2 border-white/30 backdrop-blur-sm'
                      }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {message.type === 'user' ? (
                          <User className="w-5 h-5" />
                        ) : (
                          <motion.span 
                            className="text-lg"
                            animate={{ rotate: [0, 8, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            🐼
                          </motion.span>
                        )}
                      </motion.div>
                      <motion.div 
                        className={`p-4 rounded-2xl shadow-lg ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md border border-gray-200 dark:border-gray-700'
                      }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-sm whitespace-pre-line">
                          {typeof message.content === 'string' ? formatMessage(message.content) : message.content}
                        </div>
                        <div className="text-xs opacity-60 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg border-2 border-white/30 backdrop-blur-sm">
                        <motion.span 
                          className="text-lg"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          🐼
                        </motion.span>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-bl-md shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Panda AI is crafting a response...</span>
                        </div>
                        <div className="flex space-x-2">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.4, 1, 0.4]
                              }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything about your career..."
                    className="flex-1 px-4 py-2 sm:py-3 text-sm sm:text-base rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isTyping}
                    ref={inputRef}
                    aria-label="Type your message"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                
                {/* Context indicator */}
                {conversationHistory.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                    💭 I remember {conversationHistory.length} previous messages
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;