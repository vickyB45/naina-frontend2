"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Upload, Copy, Download, RotateCcw, Save, Sparkles, Plus, Trash2, Play } from "lucide-react";

const ChatBubble = ({ message, isBot }) => (
  <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}>
    <div
      className={`max-w-[80%] rounded-lg px-4 py-2 ${
        isBot ? "bg-primary/10 text-foreground" : "bg-primary text-primary-foreground"
      }`}
    >
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

export default function PersonalitySetup() {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState({ open: false, index: null, type: "" });

  // Agent Identity State
  const [identity, setIdentity] = useState({
    name: "",
    role: "",
    description: "",
    language: "",
    domain: "",
    publicVisible: false,
    useBrandColors: true,
    avatar: null
  });

  // Communication Style State
  const [communication, setCommunication] = useState({
    tone: "",
    responseLength: "Medium",
    useEmojis: true,
    greeting: "",
    closing: "",
    useHumor: false
  });

  // Behavior Rules State
  const [behavior, setBehavior] = useState({
    corePrompt: "",
    keywords: "",
    dos: [],
    donts: []
  });

  // Chat Preview State
  const [chatMessages, setChatMessages] = useState([
    { text: "Hi KashiAI, tell me about Ganga Aarti.", isBot: false },
    { text: "🌊 The Ganga Aarti at Dashashwamedh Ghat is a divine experience! Every evening, as the sun sets, priests perform this beautiful ritual with oil lamps, creating a mesmerizing atmosphere.", isBot: true }
  ]);
  const [userInput, setUserInput] = useState("");
  const [newDo, setNewDo] = useState("");
  const [newDont, setNewDont] = useState("");

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    setChatMessages(prev => [...prev, { text: userInput, isBot: false }]);
    
    setTimeout(() => {
      const responses = [
        `${communication.useEmojis ? "✨ " : ""}That's a great question! Let me help you with that.`,
        `${communication.useEmojis ? "🙏 " : ""}I'd be happy to assist you with information about Varanasi!`,
        `${communication.useEmojis ? "🌟 " : ""}Absolutely! Varanasi has so much to offer. What specifically would you like to know?`
      ];
      setChatMessages(prev => [...prev, { 
        text: responses[Math.floor(Math.random() * responses.length)], 
        isBot: true 
      }]);
    }, 1000);
    
    setUserInput("");
  };

  const handleAddDo = () => {
    if (newDo.trim()) {
      setBehavior(prev => ({ ...prev, dos: [...prev.dos, newDo.trim()] }));
      setNewDo("");
    }
  };

  const handleAddDont = () => {
    if (newDont.trim()) {
      setBehavior(prev => ({ ...prev, donts: [...prev.donts, newDont.trim()] }));
      setNewDont("");
    }
  };

  const handleRemoveDo = (index) => {
    setShowDeleteDialog({ open: true, index, type: "do" });
  };

  const handleRemoveDont = (index) => {
    setShowDeleteDialog({ open: true, index, type: "dont" });
  };

  const confirmDelete = () => {
    if (showDeleteDialog.type === "do") {
      setBehavior(prev => ({ ...prev, dos: prev.dos.filter((_, i) => i !== showDeleteDialog.index) }));
    } else {
      setBehavior(prev => ({ ...prev, donts: prev.donts.filter((_, i) => i !== showDeleteDialog.index) }));
    }
    setShowDeleteDialog({ open: false, index: null, type: "" });
  };

  const handleSubmit = () => {
    console.log("Submit Data:", { identity, communication, behavior });
    setShowSaveDialog(true);
  };

  const handleExportPersonality = () => {
    const data = { identity, communication, behavior };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${identity.name || 'agent'}-personality.json`;
    a.click();
  };

  const handleRestoreDefaults = () => {
    setIdentity({
      name: "",
      role: "",
      description: "",
      language: "",
      domain: "",
      publicVisible: false,
      useBrandColors: true,
      avatar: null
    });
    setCommunication({
      tone: "",
      responseLength: "Medium",
      useEmojis: true,
      greeting: "",
      closing: "",
      useHumor: false
    });
    setBehavior({
      corePrompt: "",
      keywords: "",
      dos: [],
      donts: []
    });
  };

  const templates = [
    { name: "Sales Agent", tone: "Friendly", domain: "E-commerce" },
    { name: "Support Agent", tone: "Empathetic", domain: "Support" },
    { name: "Educator", tone: "Formal", domain: "Education" },
    { name: "Travel Guide", tone: "Witty", domain: "Travel" }
  ];

  const loadTemplate = (template) => {
    setIdentity({ ...identity, name: template.name, domain: template.domain });
    setCommunication({ ...communication, tone: template.tone });
    setShowTemplateDialog(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">🧠 Personality Setup</h2>
          <p className="text-sm text-muted-foreground mt-1">Create and customize your AI agent's unique personality</p>
        </div>
        <div className="flex gap-2 mt-3 sm:mt-0">
          <Button variant="outline" onClick={() => setShowTemplateDialog(true)}>
            <Copy className="w-4 h-4 mr-2" />
            Load Template
          </Button>
          <Button variant="outline" onClick={handleExportPersonality}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-7">
          <Card className="shadow-sm border">
            <CardContent className="p-0">
              <Tabs defaultValue="agent" className="w-full">
                <TabsList className="flex justify-start gap-3 border-b px-4 bg-muted/30 rounded-none w-full">
                  <TabsTrigger value="agent">🪪 Agent Info</TabsTrigger>
                  <TabsTrigger value="style">💬 Communication Style</TabsTrigger>
                  <TabsTrigger value="behavior">🧭 Behavior Rules</TabsTrigger>
                </TabsList>

                {/* Agent Info Tab */}
                <TabsContent value="agent" className="p-6 space-y-5">
                  <div>
                    <Label htmlFor="agent-name">Agent Name *</Label>
                    <Input
                      id="agent-name"
                      placeholder="e.g., KashiAI"
                      value={identity.name}
                      onChange={(e) => setIdentity({ ...identity, name: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="role">Role / Tagline *</Label>
                    <Input
                      id="role"
                      placeholder="e.g., Your Virtual Travel Partner"
                      value={identity.role}
                      onChange={(e) => setIdentity({ ...identity, role: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description / Bio</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell us about your agent..."
                      value={identity.description}
                      onChange={(e) => setIdentity({ ...identity, description: e.target.value })}
                      className="mt-2 min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="language">Default Language</Label>
                      <Select value={identity.language} onValueChange={(v) => setIdentity({ ...identity, language: v })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Hindi">Hindi</SelectItem>
                          <SelectItem value="Hinglish">Hinglish</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="domain">Domain / Industry</Label>
                      <Select value={identity.domain} onValueChange={(v) => setIdentity({ ...identity, domain: v })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select domain" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Travel">Travel</SelectItem>
                          <SelectItem value="E-commerce">E-commerce</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Support">Support</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Avatar / Icon</Label>
                    <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>🟢 Publicly visible personality</Label>
                        <p className="text-xs text-muted-foreground">Allow others to view this agent's personality</p>
                      </div>
                      <Switch
                        checked={identity.publicVisible}
                        onCheckedChange={(checked) => setIdentity({ ...identity, publicVisible: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>🔵 Use brand colors in UI</Label>
                        <p className="text-xs text-muted-foreground">Apply your brand colors to chat interface</p>
                      </div>
                      <Switch
                        checked={identity.useBrandColors}
                        onCheckedChange={(checked) => setIdentity({ ...identity, useBrandColors: checked })}
                      />
                    </div>
                  </div>

                  
                </TabsContent>

                {/* Communication Style Tab */}
                <TabsContent value="style" className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tone">Tone Type</Label>
                      <Select value={communication.tone} onValueChange={(v) => setCommunication({ ...communication, tone: v })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Friendly">😊 Friendly</SelectItem>
                          <SelectItem value="Formal">🧑‍💼 Formal</SelectItem>
                          <SelectItem value="Witty">😎 Witty</SelectItem>
                          <SelectItem value="Empathetic">🤗 Empathetic</SelectItem>
                          <SelectItem value="Neutral">⚪ Neutral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="response-length">Response Length</Label>
                      <Select value={communication.responseLength} onValueChange={(v) => setCommunication({ ...communication, responseLength: v })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Short">Short</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Detailed">Detailed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <Label>Emoji Usage</Label>
                      <Switch
                        checked={communication.useEmojis}
                        onCheckedChange={(checked) => setCommunication({ ...communication, useEmojis: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <Label>Use Humor</Label>
                      <Switch
                        checked={communication.useHumor}
                        onCheckedChange={(checked) => setCommunication({ ...communication, useHumor: checked })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="greeting">Greeting Style</Label>
                    <Input
                      id="greeting"
                      placeholder="e.g., Hi there! How can I help?"
                      value={communication.greeting}
                      onChange={(e) => setCommunication({ ...communication, greeting: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="closing">Closing Style</Label>
                    <Input
                      id="closing"
                      placeholder="e.g., Thanks for chatting with me!"
                      value={communication.closing}
                      onChange={(e) => setCommunication({ ...communication, closing: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div className="bg-muted/30 border rounded-lg p-4 mt-4">
                    <Label className="font-semibold">Preview</Label>
                    <p className="mt-3 text-sm">
                      {communication.useEmojis && "👋 "}
                      Hi! I'm {identity.name || "Your Agent"}, {identity.role || "here to help"}. Let's explore {identity.domain || "together"}!
                      {communication.useEmojis && " ✨"}
                    </p>
                  </div>

                  
                </TabsContent>

                {/* Behavior Rules Tab */}
                <TabsContent value="behavior" className="p-6 space-y-5">
                  <div>
                    <Label htmlFor="core-prompt">Core Personality Prompt</Label>
                    <Textarea
                      id="core-prompt"
                      placeholder="Define your agent's core personality..."
                      value={behavior.corePrompt}
                      onChange={(e) => setBehavior({ ...behavior, corePrompt: e.target.value })}
                      className="mt-2 min-h-[120px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="keywords">Keywords to Focus</Label>
                    <Input
                      id="keywords"
                      placeholder="travel, Varanasi, Ganga, culture"
                      value={behavior.keywords}
                      onChange={(e) => setBehavior({ ...behavior, keywords: e.target.value })}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Comma-separated keywords</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-green-700 font-semibold">✅ Do's</Label>
                        <span className="text-xs text-muted-foreground">{behavior.dos.length} rules</span>
                      </div>
                      <div className="space-y-2 mb-3 max-h-[200px] overflow-y-auto">
                        {behavior.dos.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                            <span className="text-sm flex-1">{item}</span>
                            <button
                              onClick={() => handleRemoveDo(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newDo}
                          onChange={(e) => setNewDo(e.target.value)}
                          placeholder="Add a new do..."
                          onKeyPress={(e) => e.key === 'Enter' && handleAddDo()}
                        />
                        <Button onClick={handleAddDo} size="sm" className="bg-green-600 hover:bg-green-700">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-red-700 font-semibold">❌ Don'ts</Label>
                        <span className="text-xs text-muted-foreground">{behavior.donts.length} rules</span>
                      </div>
                      <div className="space-y-2 mb-3 max-h-[200px] overflow-y-auto">
                        {behavior.donts.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                            <span className="text-sm flex-1">{item}</span>
                            <button
                              onClick={() => handleRemoveDont(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newDont}
                          onChange={(e) => setNewDont(e.target.value)}
                          placeholder="Add a new don't..."
                          onKeyPress={(e) => e.key === 'Enter' && handleAddDont()}
                        />
                        <Button onClick={handleAddDont} size="sm" className="bg-red-600 hover:bg-red-700">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-4" onClick={handleSubmit}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Behavior Rules
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Preview & Testing Sidebar */}
        <div className="col-span-12 lg:col-span-5">
          <Card className="shadow-sm border h-full">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="text-lg flex items-center gap-2">
                <Play className="w-5 h-5" />
                🧪 Preview & Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary text-primary-foreground p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      {identity.name?.charAt(0) || "A"}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{identity.name || "Agent"}</h4>
                      <p className="text-xs opacity-90">{identity.role || "AI Assistant"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 h-[350px] overflow-y-auto">
                  {chatMessages.map((msg, index) => (
                    <ChatBubble key={index} message={msg.text} isBot={msg.isBot} />
                  ))}
                </div>

                <div className="bg-background border-t p-3">
                  <div className="flex gap-2">
                    <Input
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message to test..."
                    />
                    <Button onClick={handleSendMessage} size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => setChatMessages([
                    { text: "Hi KashiAI, tell me about Ganga Aarti.", isBot: false },
                    { text: "🌊 The Ganga Aarti at Dashashwamedh Ghat is a divine experience! Every evening, as the sun sets, priests perform this beautiful ritual with oil lamps.", isBot: true }
                  ])}
                  variant="outline"
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Chat
                </Button>
               
               
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Confirmation Dialog */}
      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>✅ Personality Saved Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Your agent personality "{identity.name || 'Agent'}" has been saved and is ready to use.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Done</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Template Selection Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Choose a Template</DialogTitle>
            <DialogDescription>
              Start with a pre-made personality template and customize it
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            {templates.map((template, index) => (
              <button
                key={index}
                onClick={() => loadTemplate(template)}
                className="p-4 border rounded-lg hover:border-primary hover:bg-muted/50 transition-all text-left"
              >
                <h4 className="font-semibold">{template.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {template.tone} • {template.domain}
                </p>
              </button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog.open} onOpenChange={(open) => setShowDeleteDialog({ ...showDeleteDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this rule from your {showDeleteDialog.type === "do" ? "Do's" : "Don'ts"} list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}