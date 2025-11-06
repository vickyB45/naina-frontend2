
"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Search, Plus, Trash, Settings, X } from "lucide-react";
import StatCard from "@/components/SuperAdmin/Analytics/StatCard";

// Mock data
const overview = [
  { title: "Active Memories", value: "134" },
  { title: "Total Storage", value: "12.5 GB" },
  { title: "Avg Retention", value: "45 days" },
  { title: "Policies", value: "8" },
];

const policiesMock = [
  { id: 1, name: "Default Retention", type: "Long-Term", duration: "90 Days", storage: "Pinecone", agents: 35, status: "Active" },
  { id: 2, name: "Short Memory", type: "Ephemeral", duration: "7 Days", storage: "Local", agents: 12, status: "Active" },
  { id: 3, name: "Secure Mode", type: "Contextual", duration: "30 Days", storage: "Mongo + Cache", agents: 5, status: "Inactive" },
];

const agentsMock = [
  { id: "A-1001", name: "Acme Sales Bot", enabled: true, type: "Long-Term", retention: 90, storePrivate: false, anonymize: true, allowRecall: true },
  { id: "B-2034", name: "Beta Support Agent", enabled: true, type: "Short", retention: 7, storePrivate: false, anonymize: false, allowRecall: false },
  { id: "C-3099", name: "Gamma Chat", enabled: false, type: "Contextual", retention: 30, storePrivate: true, anonymize: true, allowRecall: true },
];

export default function MemorySettingsDashboard() {
  const [filter, setFilter] = useState("All");
  const [policies, setPolicies] = useState(policiesMock);
  const [agents, setAgents] = useState(agentsMock);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Add/Edit Policy Dialog
  const [isPolicyDialogOpen, setIsPolicyDialogOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [policyForm, setPolicyForm] = useState({
    name: "",
    type: "Long-Term",
    duration: "90 Days",
    storage: "Pinecone",
    status: "Active"
  });

  // Edit Agent Dialog
  const [isAgentDialogOpen, setIsAgentDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);

  // Delete Confirmation Dialog
  const [deleteDialog, setDeleteDialog] = useState({ open: false, type: "", id: null });

  // Clear All Memory Dialog
  const [clearAllDialog, setClearAllDialog] = useState(false);

  const handleToggleAgent = (id) => {
    setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)));
  };

  const openAddPolicyDialog = () => {
    setEditingPolicy(null);
    setPolicyForm({
      name: "",
      type: "Long-Term",
      duration: "90 Days",
      storage: "Pinecone",
      status: "Active"
    });
    setIsPolicyDialogOpen(true);
  };

  const openEditPolicyDialog = (policy) => {
    setEditingPolicy(policy);
    setPolicyForm({
      name: policy.name,
      type: policy.type,
      duration: policy.duration,
      storage: policy.storage,
      status: policy.status
    });
    setIsPolicyDialogOpen(true);
  };

  const handleSavePolicy = () => {
    if (editingPolicy) {
      // Edit existing policy
      setPolicies(prev => prev.map(p => 
        p.id === editingPolicy.id 
          ? { ...p, ...policyForm, agents: p.agents }
          : p
      ));
    } else {
      // Add new policy
      const newPolicy = {
        id: Math.max(...policies.map(p => p.id)) + 1,
        ...policyForm,
        agents: 0
      };
      setPolicies(prev => [...prev, newPolicy]);
    }
    setIsPolicyDialogOpen(false);
  };

  const handleDeletePolicy = (id) => {
    setPolicies((p) => p.filter((x) => x.id !== id));
    setDeleteDialog({ open: false, type: "", id: null });
  };

  const openEditAgentDialog = (agent) => {
    setEditingAgent(agent);
    setIsAgentDialogOpen(true);
  };

  const handleSaveAgent = () => {
    setAgents(prev => prev.map(a => 
      a.id === editingAgent.id ? editingAgent : a
    ));
    setIsAgentDialogOpen(false);
  };

  const handleClearAllMemory = () => {
    console.log("Clearing all memory...");
    setClearAllDialog(false);
  };

  const handleResetDefaults = () => {
    setPolicies(policiesMock);
    setAgents(agentsMock);
  };

  const filteredPolicies = policies.filter((p) => {
    const matchesFilter = filter === "All" || 
                         (filter === "Active" && p.status === "Active") ||
                         (filter === "Inactive" && p.status === "Inactive");
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen p-6 ">
      <div className="max-w-full mx-auto grid grid-cols-12 gap-6">
        {/* Main column */}
        <div className="col-span-9">
          {/* Header */}
          <div className=" mb-4">
              <h1 className="text-2xl font-semibold">AI Agent Memory Settings</h1>
              <p className="text-sm text-slate-500">Manage memory configurations, usage, and storage for all client agents.</p>
            </div>
          <div className="flex items-center justify-between gap-4 mb-6">
            

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input 
                  placeholder="Search policies..." 
                  className="pl-10 w-48"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select onValueChange={(v) => setFilter(v)} defaultValue="All">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter: All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-violet-600 hover:bg-violet-700 text-white" onClick={openAddPolicyDialog}>
                <Plus className="mr-2 w-4 h-4" />
                Add Memory Policy
              </Button>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {overview.map((o, index) => (
              <StatCard key={index} title={o.title} value={o.value} />
            ))}
          </div>

          {/* Policies Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Memory Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Storage</TableHead>
                    <TableHead>Agents Linked</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPolicies.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.type}</TableCell>
                      <TableCell>{p.duration}</TableCell>
                      <TableCell>{p.storage}</TableCell>
                      <TableCell>{p.agents}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-sm ${p.status === "Active" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-700"}`}>
                          {p.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            className="bg-violet-600 hover:bg-violet-700 text-white" 
                            size="sm"
                            onClick={() => openEditPolicyDialog(p)}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => setDeleteDialog({ open: true, type: "policy", id: p.id })}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Agent Memory Configuration */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Agents — Memory Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div key={agent.id} className=" border rounded-md shadow-sm p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold">{agent.name} <span className="text-xs text-slate-400">({agent.id})</span></div>
                        <div className="text-xs text-slate-500">Type: {agent.type} • Retention: {agent.retention} days</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">Enable Memory</span>
                          <Switch checked={agent.enabled} onCheckedChange={() => handleToggleAgent(agent.id)} />
                        </div>
                        <Button 
                          className="bg-violet-600 hover:bg-violet-700 text-white" 
                          size="sm"
                          onClick={() => openEditAgentDialog(agent)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>

                    <Separator className="my-3" />

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Memory Type</label>
                        <div className="text-sm font-medium">{agent.type}</div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Retention</label>
                        <div className="text-sm font-medium">{agent.retention} days</div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Behavior</label>
                        <div className="flex flex-col gap-1 text-xs">
                          <div>Private: {agent.storePrivate ? "✓" : "✗"}</div>
                          <div>Anonymize: {agent.anonymize ? "✓" : "✗"}</div>
                          <div>Recall: {agent.allowRecall ? "✓" : "✗"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Manual Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Manual Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="destructive" onClick={() => setClearAllDialog(true)}>
                  <Trash className="mr-2 w-4 h-4" />
                  Clear All Memory
                </Button>
                <Button className="bg-violet-600 hover:bg-violet-700 text-white" onClick={handleResetDefaults}>
                  <Settings className="mr-2 w-4 h-4" />
                  Reset to Defaults
                </Button>
                <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                  Export Memory Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <aside className="col-span-3">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-slate-600">Tokens Saved vs Used</div>
                <div className="w-full h-24 border rounded-md mt-3 flex items-center justify-center text-xs text-slate-400">Mini chart placeholder</div>
                <Separator className="my-3" />
                <div className="text-sm">Storage Quota</div>
                <div className="w-full bg-slate-100 rounded-full h-3 mt-2 overflow-hidden">
                  <div className="h-3 rounded-full bg-violet-600" style={{ width: "60%" }} />
                </div>
                <Separator className="my-3" />
                <div className="text-sm">Recent Policy Updates</div>
                <ul className="mt-2 text-sm space-y-2">
                  <li className="text-slate-600">Default Retention edited 2 days ago</li>
                  <li className="text-slate-600">Short Memory created 8 days ago</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>Acme Sales Bot — 2.4M tokens</li>
                  <li>Beta Support Agent — 1.1M tokens</li>
                  <li>Gamma Chat — 800K tokens</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>


      <Dialog open={isPolicyDialogOpen} onOpenChange={setIsPolicyDialogOpen}>
        <DialogContent className="sm:max-w-[500px] dark:text-white ">
          <DialogHeader>
            <DialogTitle>{editingPolicy ? "Edit Memory Policy" : "Add Memory Policy"}</DialogTitle>
            <DialogDescription>
              {editingPolicy ? "Update the memory policy configuration." : "Create a new memory policy for your agents."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="policy-name">Policy Name</Label>
              <Input
                id="policy-name"
                value={policyForm.name}
                onChange={(e) => setPolicyForm({ ...policyForm, name: e.target.value })}
                placeholder="e.g., Default Retention"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="policy-type">Type</Label>
              <Select value={policyForm.type} onValueChange={(v) => setPolicyForm({ ...policyForm, type: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Long-Term">Long-Term</SelectItem>
                  <SelectItem value="Ephemeral">Ephemeral</SelectItem>
                  <SelectItem value="Contextual">Contextual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="policy-duration">Duration</Label>
              <Select value={policyForm.duration} onValueChange={(v) => setPolicyForm({ ...policyForm, duration: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7 Days">7 Days</SelectItem>
                  <SelectItem value="30 Days">30 Days</SelectItem>
                  <SelectItem value="90 Days">90 Days</SelectItem>
                  <SelectItem value="180 Days">180 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="policy-storage">Storage</Label>
              <Select value={policyForm.storage} onValueChange={(v) => setPolicyForm({ ...policyForm, storage: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pinecone">Pinecone</SelectItem>
                  <SelectItem value="Local">Local</SelectItem>
                  <SelectItem value="Mongo + Cache">Mongo + Cache</SelectItem>
                  <SelectItem value="Redis">Redis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="policy-status">Status</Label>
              <Select value={policyForm.status} onValueChange={(v) => setPolicyForm({ ...policyForm, status: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPolicyDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white" onClick={handleSavePolicy}>
              {editingPolicy ? "Save Changes" : "Add Policy"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Agent Dialog */}
      <Dialog open={isAgentDialogOpen} onOpenChange={setIsAgentDialogOpen}>
        <DialogContent className="sm:max-w-[550px] dark:text-white">
          <DialogHeader>
            <DialogTitle>Edit Agent Memory Configuration</DialogTitle>
            <DialogDescription>
              Update memory settings for {editingAgent?.name}
            </DialogDescription>
          </DialogHeader>
          {editingAgent && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Memory Type</Label>
                <Select 
                  value={editingAgent.type} 
                  onValueChange={(v) => setEditingAgent({ ...editingAgent, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Short">Short</SelectItem>
                    <SelectItem value="Long-Term">Long-Term</SelectItem>
                    <SelectItem value="Contextual">Contextual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Retention Period: {editingAgent.retention} days</Label>
                <input 
                  type="range" 
                  min={1} 
                  max={180} 
                  value={editingAgent.retention}
                  onChange={(e) => setEditingAgent({ ...editingAgent, retention: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="store-private">Store Private Chats</Label>
                  <Switch 
                    id="store-private"
                    checked={editingAgent.storePrivate}
                    onCheckedChange={(checked) => setEditingAgent({ ...editingAgent, storePrivate: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="anonymize">Anonymize Sensitive Data</Label>
                  <Switch 
                    id="anonymize"
                    checked={editingAgent.anonymize}
                    onCheckedChange={(checked) => setEditingAgent({ ...editingAgent, anonymize: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="recall">Allow Context Recall</Label>
                  <Switch 
                    id="recall"
                    checked={editingAgent.allowRecall}
                    onCheckedChange={(checked) => setEditingAgent({ ...editingAgent, allowRecall: checked })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAgentDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white" onClick={handleSaveAgent}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the {deleteDialog.type}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700 dark:text-white"
              onClick={() => handleDeletePolicy(deleteDialog.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear All Memory Dialog */}
      <AlertDialog open={clearAllDialog} onOpenChange={setClearAllDialog}>
        <AlertDialogContent className="dark:text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All Memory?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all stored memory data for all agents. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleClearAllMemory}
            >
              Clear All Memory
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}