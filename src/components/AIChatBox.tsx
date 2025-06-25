
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Key, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  isAI: boolean;
  timestamp: Date;
}

const AIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: 'Xin chào! Tôi là AI trợ lý của Fstem.asia. Để bắt đầu trò chuyện, vui lòng nhập API key Gemini của bạn.', 
      isAI: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key is stored in localStorage
    const storedApiKey = localStorage.getItem('gemini_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setShowApiKeyInput(false);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleApiKeySubmit = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập API key Gemini",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('gemini_api_key', apiKey);
    setShowApiKeyInput(false);
    
    const welcomeMessage: Message = {
      id: messages.length + 1,
      text: 'Tuyệt vời! API key đã được cài đặt. Bây giờ bạn có thể trò chuyện với tôi. Tôi có thể giúp bạn về các chủ đề giáo dục STEM, tài liệu học tập và nhiều thứ khác!',
      isAI: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, welcomeMessage]);
  };

  const callGeminiAPI = async (message: string): Promise<string> => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Bạn là AI trợ lý của trang web Fstem.asia - một nền tảng giáo dục STEM tại Việt Nam. Hãy trả lời một cách thân thiện, hữu ích và chuyên nghiệp. Người dùng hỏi: ${message}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      if (error instanceof Error && error.message.includes('API Error: 400')) {
        throw new Error('API key không hợp lệ. Vui lòng kiểm tra lại API key Gemini của bạn.');
      }
      throw new Error('Có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại sau.');
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    if (showApiKeyInput) {
      toast({
        title: "Thông báo",
        description: "Vui lòng cài đặt API key Gemini trước khi trò chuyện",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isAI: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await callGeminiAPI(inputValue);
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        isAI: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: error instanceof Error ? error.message : 'Có lỗi xảy ra. Vui lòng thử lại.',
        isAI: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      if (error instanceof Error && error.message.includes('API key không hợp lệ')) {
        setShowApiKeyInput(true);
        localStorage.removeItem('gemini_api_key');
        setApiKey('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showApiKeyInput) {
        handleApiKeySubmit();
      } else {
        handleSendMessage();
      }
    }
  };

  const resetApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setShowApiKeyInput(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg animate-pulse"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">AI Trợ lý Fstem</span>
            </div>
            <div className="flex items-center space-x-2">
              {!showApiKeyInput && (
                <Button
                  onClick={resetApiKey}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  title="Thay đổi API key"
                >
                  <Key className="w-4 h-4" />
                </Button>
              )}
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* API Key Input */}
          {showApiKeyInput && (
            <div className="p-4 bg-yellow-50 border-b border-gray-200">
              <div className="text-sm text-gray-700 mb-2">
                Nhập API key Gemini để bắt đầu:
              </div>
              <div className="flex space-x-2">
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="API key Gemini..."
                  className="text-sm"
                />
                <Button
                  onClick={handleApiKeySubmit}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Key className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Lấy API key tại: <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.isAI
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AI đang suy nghĩ...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {!showApiKeyInput && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  className="text-sm"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIChatBox;
