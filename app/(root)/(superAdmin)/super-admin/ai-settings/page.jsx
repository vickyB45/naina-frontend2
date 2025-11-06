'use client';
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bot, Edit, Send, Trash, User } from 'lucide-react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function ChatFlowRules() {
  const [triggerType, setTriggerType] = useState('Keyword');
  const [keyword, setKeyword] = useState('Keyword');
  const [triggerValue, setTriggerValue] = useState('Hi');
  const [responseType, setResponseType] = useState(true);
  const [responseTypeValue, setResponseTypeValue] = useState('Text');
  const [nextStep, setNextStep] = useState('Welcome Flow');
  const [priority, setPriority] = useState(true);

  // React Flow Setup
  const initialNodes = [
    { id: '1', position: { x: 50, y: 100 }, data: { label: 'Welcome' }, type: 'input' },
    { id: '2', position: { x: 250, y: 100 }, data: { label: 'Product Info' } },
    { id: '3', position: { x: 450, y: 100 }, data: { label: 'Add to Cart' } },
    { id: '4', position: { x: 650, y: 100 }, data: { label: 'Order Confirmation' }, type: 'output' },
  ];

  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );


  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  
  const handleSend = () => {
    if (!message.trim()) return;

    // ⚙️ Simulated AI response (you can replace with real API later)
    const simulatedResponses = [
      "Sure! Our pricing starts from $49/month depending on your plan.",
      "We offer a free trial for 7 days — would you like me to enable it?",
      "It depends on your usage. Can you tell me how many agents you need?",
      "Our standard plan covers everything for small businesses.",
    ];

    const randomResponse =
      simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];

    setResponse(randomResponse);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-medium mb-8">Chat Flow Rules</h1>

      {/* Grid Section: Flow + Editor/Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {/* Left Column - Flow Diagram */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Chat Flow: Welcome Sequence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full border rounded-xl overflow-hidden">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  fitView
                >
                  <MiniMap />
                  <Controls />
                  <Background variant="dots" gap={12} size={1} />
                </ReactFlow>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Rule Editor */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Rule Editor</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              {/* Trigger Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Trigger Type</Label>
                <Select value={triggerType} onValueChange={setTriggerType}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select Trigger Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Keyword">Keyword</SelectItem>
                    <SelectItem value="Intent">Intent</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Keyword */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Keyword</Label>
                <Input
                  placeholder="e.g. hi, hello"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="h-9"
                />
              </div>

              {/* Trigger Value */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Trigger Value</Label>
                <Input
                  placeholder="Enter trigger value"
                  value={triggerValue}
                  onChange={(e) => setTriggerValue(e.target.value)}
                  className="h-9"
                />
              </div>

              {/* Response Type */}
              <div className="flex items-center justify-between border rounded-md px-3 py-2">
                <Label className="text-sm font-medium">Response Type</Label>
                <Switch checked={responseType} onCheckedChange={setResponseType} />
              </div>

              {/* Response Type Dropdown */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Response Format</Label>
                <Select value={responseTypeValue} onValueChange={setResponseTypeValue}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select Response Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Text">Text</SelectItem>
                    <SelectItem value="Image">Image</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Next Step */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Next Step</Label>
                <Input
                  placeholder="Enter next step flow name"
                  value={nextStep}
                  onChange={(e) => setNextStep(e.target.value)}
                  className="h-9"
                />
              </div>

              {/* Priority */}
              <div className="flex items-center justify-between border rounded-md px-3 py-2">
                <Label className="text-sm font-medium">Priority</Label>
                <Switch checked={priority} onCheckedChange={setPriority} />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-3">
                <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">Save</Button>
                <Button variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ✅ Full-width Rules Table */}
      <div className="mt-8">
        <Card className="border border-border/40 shadow-sm">
          <CardHeader className="pb-1 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Existing Rules</CardTitle>
           
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full border-t border-border/40">
                <thead className="bg-muted/40 text-sm text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">Trigger Type</th>
                    <th className="px-4 py-2 text-left font-medium">Keyword</th>
                    <th className="px-4 py-2 text-left font-medium">Trigger Value</th>
                    <th className="px-4 py-2 text-left font-medium">Response Type</th>
                    <th className="px-4 py-2 text-left font-medium">Next Step</th>
                    <th className="px-4 py-2 text-left font-medium">Priority</th>
                    <th className="px-4 py-2 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    {
                      triggerType: 'Keyword',
                      keyword: 'Hello',
                      triggerValue: 'Greeting',
                      responseType: 'Text',
                      nextStep: 'Ask Name',
                      priority: 'High',
                    },
                    {
                      triggerType: 'Intent',
                      keyword: '-',
                      triggerValue: 'Purchase Inquiry',
                      responseType: 'Image',
                      nextStep: 'Show Product',
                      priority: 'Medium',
                    },
                  ].map((rule, index) => (
                    <tr
                      key={index}
                      className="border-t border-border/40 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-2">{rule.triggerType}</td>
                      <td className="px-4 py-2">{rule.keyword}</td>
                      <td className="px-4 py-2">{rule.triggerValue}</td>
                      <td className="px-4 py-2">{rule.responseType}</td>
                      <td className="px-4 py-2">{rule.nextStep}</td>
                      <td className="px-4 py-2">{rule.priority}</td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Response Test Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-medium mb-6">Chat Response Test</h2>

        <Card className="p-6 shadow-md border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 🧍 User Message Side */}
            <div className="bg-muted/30 rounded-xl border border-border/40 p-4 flex flex-col justify-between">
              <div>
                <CardHeader className="pb-3 px-0">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    User Message
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-0 space-y-3">
                  {/* User message bubble (preview of last sent message) */}
                  {message && (
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div className="bg-background border border-border/40 rounded-lg px-4 py-3 shadow-sm">
                        <p className="text-sm text-foreground">{message}</p>
                      </div>
                    </div>
                  )}

                  {/* Input + Send Button */}
                  <div className="flex items-center gap-2 mt-4">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="h-9 flex-1"
                    />
                    <Button
                      onClick={handleSend}
                      className="h-9 px-3 flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </Button>
                  </div>
                </CardContent>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-border/40 mt-4 text-xs text-muted-foreground">
                Type a message to test AI response
              </div>
            </div>

            {/* 🤖 AI Response Side */}
            <div className="bg-muted/30 rounded-xl border border-border/40 p-4 flex flex-col justify-between">
              <div>
                <CardHeader className="pb-3 px-0">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Bot className="w-4 h-4 text-green-500" />
                    AI Response
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-0">
                  {response ? (
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="bg-background border border-border/40 rounded-lg px-4 py-3 shadow-sm">
                        <p className="text-sm text-foreground">{response}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No response yet — send a message to test.
                    </p>
                  )}
                </CardContent>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-border/40 mt-4 text-xs text-muted-foreground">
                Simulated AI response (can link with actual model later)
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}