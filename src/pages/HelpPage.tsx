import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Headphones, Send, ArrowLeft, CheckCheck, Check, MessageCircle, Plus, Phone, Mail, HelpCircle, CreditCard, FileText, Settings } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { useApp } from '../context/AppContext';
import { formatRelativeTime } from '../i18n';

interface Message { id: string; senderId: string; text: string; timestamp: string; read: boolean; }

interface Conversation {
  id: string;
  subject: string;
  messages: Message[];
  lastMessageTime: string;
  status: 'open' | 'in_progress' | 'resolved';
}

const HelpPage: React.FC = () => {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations: Conversation[] = [
    {
      id: 'c1', subject: 'Probleme de paiement', status: 'open',
      lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
      messages: [
        { id: 'm1', senderId: 'user', text: 'Bonjour, j\'ai un probleme avec mon paiement via Orange Money', timestamp: new Date(Date.now() - 7200000).toISOString(), read: true },
        { id: 'm2', senderId: 'admin', text: 'Bonjour! Pouvez-vous me donner plus de details sur le probleme rencontre?', timestamp: new Date(Date.now() - 7000000).toISOString(), read: true },
        { id: 'm3', senderId: 'user', text: 'Le montant a ete debite mais la transaction a echoue', timestamp: new Date(Date.now() - 3600000).toISOString(), read: true },
      ]
    },
    {
      id: 'c2', subject: 'Creation de projet', status: 'resolved',
      lastMessageTime: new Date(Date.now() - 86400000).toISOString(),
      messages: [
        { id: 'm4', senderId: 'user', text: 'Comment puis-je creer un projet?', timestamp: new Date(Date.now() - 90000000).toISOString(), read: true },
        { id: 'm5', senderId: 'admin', text: 'Rendez-vous sur la page "Creer un projet" accessible depuis le menu principal. Remplissez le formulaire avec les informations de votre projet.', timestamp: new Date(Date.now() - 88000000).toISOString(), read: true },
        { id: 'm6', senderId: 'user', text: 'Merci beaucoup!', timestamp: new Date(Date.now() - 86400000).toISOString(), read: true },
      ]
    }
  ];

  const quickLinks = [
    { icon: CreditCard, label: 'Paiements', topic: 'payment' },
    { icon: FileText, label: 'Projets', topic: 'project' },
    { icon: Settings, label: 'Compte', topic: 'account' },
    { icon: HelpCircle, label: 'FAQ', topic: 'faq' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages, selectedConversation?.messages.length]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    if (!selectedConversation) {
      if (!newSubject.trim()) return;
      const newConv: Conversation = {
        id: Date.now().toString(),
        subject: newSubject,
        messages: [{ id: 'm1', senderId: 'user', text: newMessage, timestamp: new Date().toISOString(), read: true }],
        lastMessageTime: new Date().toISOString(),
        status: 'open'
      };
      setSelectedConversation(newConv);
      setNewSubject('');
    } else {
      selectedConversation.messages.push({
        id: Date.now().toString(),
        senderId: 'user',
        text: newMessage,
        timestamp: new Date().toISOString(),
        read: true
      });
    }
    setNewMessage('');
  };

  const getStatusBadge = (status: Conversation['status']) => {
    switch (status) {
      case 'open': return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">En attente</span>;
      case 'in_progress': return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">En cours</span>;
      case 'resolved': return <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">Resolu</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4">
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Centre d'aide</h1>
              <p className="text-slate-500">Nous sommes la pour vous aider</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className={`w-80 flex-shrink-0 ${selectedConversation ? 'hidden lg:block' : ''}`}>
            <Card className="mb-6">
              <div className="p-4">
                <Button className="w-full" icon={Plus} onClick={() => setShowNewChat(true)}>
                  Nouvelle conversation
                </Button>
              </div>
            </Card>

            <Card className="mb-6">
              <div className="p-4">
                <h3 className="font-semibold text-slate-800 mb-3">Sujets rapides</h3>
                <div className="space-y-2">
                  {quickLinks.map(link => (
                    <button key={link.topic} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
                      <link.icon className="w-5 h-5 text-amber-500" />
                      <span className="text-slate-700">{link.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-4 border-b">
                <h3 className="font-semibold text-slate-800">Vos conversations</h3>
              </div>
              <div className="divide-y">
                {conversations.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => { setSelectedConversation(conv); setShowNewChat(false); }}
                    className={`w-full p-4 text-left hover:bg-slate-50 transition-colors ${selectedConversation?.id === conv.id ? 'bg-amber-50' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-slate-800 truncate">{conv.subject}</p>
                      {getStatusBadge(conv.status)}
                    </div>
                    <p className="text-sm text-slate-500 truncate">{conv.messages[conv.messages.length - 1]?.text}</p>
                    <p className="text-xs text-slate-400 mt-1">{formatRelativeTime(conv.lastMessageTime)}</p>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          <div className="flex-1">
            {showNewChat ? (
              <Card className="flex flex-col h-[600px]">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-slate-800">Nouvelle conversation</h3>
                </div>
                <div className="flex-1 p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Sujet</label>
                    <input
                      type="text"
                      value={newSubject}
                      onChange={e => setNewSubject(e.target.value)}
                      placeholder="Decrivez brievement votre probleme..."
                      className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                    <textarea
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      placeholder="Expliquez votre situation en detail..."
                      className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-amber-500 h-40 resize-none"
                    />
                  </div>
                </div>
                <div className="p-4 border-t">
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setShowNewChat(false)}>Annuler</Button>
                    <Button onClick={handleSendMessage} disabled={!newSubject.trim() || !newMessage.trim()}>Envoyer</Button>
                  </div>
                </div>
              </Card>
            ) : selectedConversation ? (
              <Card className="flex flex-col h-[600px]">
                <div className="p-4 border-b flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">{selectedConversation.subject}</h3>
                    {getStatusBadge(selectedConversation.status)}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] ${msg.senderId === 'user' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-800'} rounded-2xl px-4 py-2.5`}>
                        <p className="text-sm">{msg.text}</p>
                        <div className={`flex items-center justify-end gap-1 mt-1 ${msg.senderId === 'user' ? 'text-amber-100' : 'text-slate-400'}`}>
                          <span className="text-xs">{new Date(msg.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                          {msg.senderId === 'user' && (msg.read ? <CheckCheck className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />)}
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
                      className="flex-1 px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="px-4 py-2.5 bg-amber-500 text-white rounded-xl hover:bg-amber-600 disabled:opacity-50 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="flex items-center justify-center h-[600px]">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 mb-4">Selectionnez une conversation ou commencez-en une nouvelle</p>
                  <Button icon={Plus} onClick={() => setShowNewChat(true)}>Nouvelle conversation</Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
