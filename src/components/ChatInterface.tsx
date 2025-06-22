
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User } from 'lucide-react';
import { useMessages } from '@/hooks/useMessages';
import { useAuth } from '@/contexts/AuthContext';

interface ChatInterfaceProps {
  appointmentId: string;
  receiverId: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ appointmentId, receiverId }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { messages, sendMessage, markAsRead } = useMessages(appointmentId);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    const result = await sendMessage(newMessage.trim(), receiverId);
    
    if (result.data) {
      setNewMessage('');
    }
    setIsSending(false);
  };

  const handleMarkAsRead = (messageId: string) => {
    markAsRead(messageId);
  };

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-3">
            {messages.map((message: any) => (
              <div
                key={message.id}
                className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                onClick={() => message.sender_id !== user?.id && !message.is_read && handleMarkAsRead(message.id)}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                    message.sender_id === user?.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-1 mb-1">
                    <User className="h-3 w-3" />
                    <span className="text-xs opacity-75">
                      {message.sender?.full_name || 'Unknown'}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {new Date(message.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <form onSubmit={handleSendMessage} className="flex space-x-2 mt-4">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isSending}
          />
          <Button type="submit" disabled={isSending || !newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
