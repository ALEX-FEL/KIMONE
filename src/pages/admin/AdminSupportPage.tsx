import React, { useState, useRef, useEffect } from 'react';
import { Headphones, Search, Send, User, CheckCheck, Check, Clock, Phone, Mail } from 'lucide-react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Avatar from '../../components/ui/Avatar';
import { formatDate, formatRelativeTime } from '../../i18n';
import { mockUsers } from '../../data/mockData';

interface Message { id: string; senderId: string; text: string; timestamp: string; read: boolean; }

interface Conversation {
  id: string;
  user: typeof mockUsers[0];
  messages: Message[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'open' | 'in_progress' | 'resolved';
}

const AdminSupportPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations: Conversation[] = [
    {
      id: 'c1', user: mockUsers[0], status: 'open', unreadCount: 2,
      lastMessage: 'Bonjour, j\'ai un probleme avec mon paiement', lastMessageTime: new Date().toISOString(),
      messages: [
        { id: 'm1', senderId: 'user-1', text: 'Bonjour, j\'ai un probleme avec mon paiement', timestamp: new Date(Date.now() - 3600000).toISOString(), read: true },
        { id: 'm2', senderId: 'admin', text: 'Bonjour! Pouvez-vous me donner plus de details?', timestamp: new Date(Date.now() - 3000000).toISOString(), read: true },
        { id: 'm3', senderId: 'user-1', text: 'J\'ai essaye de payer via Orange Money mais la transaction a echoue', timestamp: new Date(Date.now() - 1800000).toISOString(), read: false },
        { id: 'm4', senderId: 'user-1', text: 'Le montant a ete debite mais le projet n\'affiche pas ma donation', timestamp: new Date(Date.now() - 600000).toISOString(), read: false },
      ]
    },
    {
      id: 'c2', user: mockUsers[1] || mockUsers[0], status: 'in_progress', unreadCount: 0,
      lastMessage: 'Merci pour votre aide!', lastMessageTime: new Date(Date.now() - 86400000).toISOString(),
      messages: [
        { id: 'm5', senderId: 'user-2', text: 'Comment puis-je creer un projet?', timestamp: new Date(Date.now() - 90000000).toISOString(), read: true },
        { id: 'm6', senderId: 'admin', text: 'Rendez-vous sur la page "Creer un projet" et remplissez le formulaire', timestamp: new Date(Date.now() - 88000000).toISOString(), read: true },
        { id: 'm7', senderId: 'user-2', text: 'Merci pour votre aide!', timestamp: new Date(Date.now() - 86400000).toISOString(), read: true },
      ]
    },
    {
      id: 'c3', user: mockUsers[2] || mockUsers[0], status: 'resolved', unreadCount: 1,
      lastMessage: 'Quand vais-je recevoir mes fonds?', lastMessageTime: new Date(Date.now() - 7200000).toISOString(),
      messages: [
        { id: 'm8', senderId: 'user-3', text: 'Quand vais-je recevoir mes fonds?', timestamp: new Date(Date.now() - 7200000).toISOString(), read: false },
      ]
    }
  ];

  const filteredConversations = search
    ? conversations.filter(c => c.user.fullName.toLowerCase().includes(search.toLowerCase()))
    : conversations;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    const newMsg: Message = { id: Date.now().toString(), senderId: 'admin', text: newMessage, timestamp: new Date().toISOString(), read: true };
    selectedConversation.messages.push(newMsg);
    selectedConversation.lastMessage = newMessage;
    selectedConversation.lastMessageTime = new Date().toISOString();
    setNewMessage('');
  };

  const getStatusBadge = (status: Conversation['status']) => {
    switch (status) {
      case 'open': return <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">Ouvert</span>;
      case 'in_progress': return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">En cours</span>;
      case 'resolved': return <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">Resolu</span>;
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Headphones className="w-7 h-7 text-amber-500" />
            Assistance
          </h1>
          <p className="text-slate-500 mt-1">Gerez les conversations avec les utilisateurs</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <Card className={`w-80 flex-shrink-0 flex flex-col ${selectedConversation ? 'hidden lg:flex' : ''}`}>
          <div className="p-4 border-b">
            <Input icon={Search} placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-4 text-left hover:bg-slate-50 transition-colors border-b ${selectedConversation?.id === conv.id ? 'bg-amber-50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar src={conv.user.avatar} name={conv.user.fullName} size="md" />
                    {conv.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{conv.unreadCount}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-slate-800 truncate">{conv.user.fullName}</p>
                      {getStatusBadge(conv.status)}
                    </div>
                    <p className="text-sm text-slate-500 truncate">{conv.lastMessage}</p>
                    <p className="text-xs text-slate-400 mt-1">{formatRelativeTime(conv.lastMessageTime)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {selectedConversation ? (
          <Card className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedConversation(null)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
                  <User className="w-5 h-5" />
                </button>
                <Avatar src={selectedConversation.user.avatar} name={selectedConversation.user.fullName} size="md" />
                <div>
                  <p className="font-medium text-slate-800">{selectedConversation.user.fullName}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Mail className="w-3.5 h-3.5" />
                    {selectedConversation.user.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedConversation.status)}
                <select
                  value={selectedConversation.status}
                  onChange={e => setSelectedConversation({ ...selectedConversation, status: e.target.value as Conversation['status'] })}
                  className="px-3 py-1.5 border rounded-lg text-sm"
                >
                  <option value="open">Ouvert</option>
                  <option value="in_progress">En cours</option>
                  <option value="resolved">Resolu</option>
                </select>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.senderId === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${msg.senderId === 'admin' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-800'} rounded-2xl px-4 py-2.5`}>
                    <p className="text-sm">{msg.text}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 ${msg.senderId === 'admin' ? 'text-amber-100' : 'text-slate-400'}`}>
                      <span className="text-xs">{new Date(msg.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                      {msg.senderId === 'admin' && (
                        msg.read ? <CheckCheck className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-4 py-2.5 bg-amber-500 text-white rounded-xl hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Headphones className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Selectionnez une conversation</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminSupportPage;
