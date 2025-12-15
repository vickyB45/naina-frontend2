"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// shadui components - adapt import paths to your project
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";


export default function SuperadminSettings() {
    const [themeDark, setThemeDark] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    // Platform (Global)
    const [platformName, setPlatformName] = useState("Naina AI Platform");
    const [supportEmail, setSupportEmail] = useState("support@naina.ai");
    const [defaultDomain, setDefaultDomain] = useState("{client}.naina.ai");

    // System
    const [timezone, setTimezone] = useState("UTC+05:30");
    const [maintenance, setMaintenance] = useState(false);
    const [logLevel, setLogLevel] = useState("info");

    // AI & Integrations
    const [globalOpenAIKey, setGlobalOpenAIKey] = useState("");
    const [enableWebhookLogging, setEnableWebhookLogging] = useState(true);

    // Billing plans (superadmin controls plans & defaults)
    const [plans, setPlans] = useState([
        { id: "basic", name: "Basic", price: 999, clients: 5, users: 50, messages: "10k", whiteLabel: false },
        { id: "pro", name: "Pro", price: 4999, clients: 50, users: 500, messages: "100k", whiteLabel: false },
        { id: "business", name: "Business", price: 19999, clients: 9999, users: 9999, messages: "unlimited", whiteLabel: true },
    ]);

    // Admins
    const [admins, setAdmins] = useState([
        { id: 1, name: "Vicky Bisht", email: "vicky@naina.ai", role: "Owner", status: "active" },
        { id: 2, name: "Asha Kumar", email: "asha@naina.ai", role: "Manager", status: "active" },
    ]);
    const [newAdminEmail, setNewAdminEmail] = useState("");
    const [newAdminName, setNewAdminName] = useState("");

    // Clients
    const [clients, setClients] = useState([
        { id: "clt_001", name: "FinConnect", plan: "pro", status: "active" },
        { id: "clt_002", name: "Travelio", plan: "basic", status: "suspended" },
    ]);

    // Backups & Logs
    const [backupFreq, setBackupFreq] = useState("daily");
    const [lastBackup, setLastBackup] = useState("2025-10-28T02:14:00Z");

    // Helpers
    function savePlatform() {
        console.log("Save Platform", { platformName, supportEmail, defaultDomain });
        alert("Platform settings saved (mock)");
    }

    function saveSystem() {
        console.log("Save System", { timezone, maintenance, logLevel });
        alert("System settings saved (mock)");
    }

    function saveAI() {
        console.log("Save AI", { globalOpenAIKey, enableWebhookLogging });
        alert("AI & integrations saved (mock)");
    }

    function updatePlan(id, key, value) {
        setPlans((p) => p.map((pl) => (pl.id === id ? { ...pl, [key]: value } : pl)));
    }

    function addAdmin() {
        if (!newAdminEmail || !newAdminName) return alert("Provide name and email");
        const id = Date.now();
        setAdmins((a) => [...a, { id, name: newAdminName, email: newAdminEmail, role: "Admin", status: "active" }]);
        setNewAdminEmail("");
        setNewAdminName("");
    }

    function removeAdmin(id) {
        if (!confirm("Remove this admin?")) return;
        setAdmins((a) => a.filter((x) => x.id !== id));
    }

    function toggleClientStatus(id) {
        setClients((c) => c.map((cl) => (cl.id === id ? { ...cl, status: cl.status === "active" ? "suspended" : "active" } : cl)));
    }

    return (
        <div className="min-h-screen p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                <header className="flex items-start justify-between gap-6 mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold">Superadmin Settings</h1>
                        <p className="text-sm text-muted-foreground mt-1">Central control panel — manage platform, plans, admins, clients, AI keys, backups and logs.</p>
                    </div>
                </header>

                <Card className="shadow-lg rounded-2xl overflow-hidden border" >
                    <div className="p-4 md:p-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="rounded-lg bg-opacity-40 p-1 gap-1 flex-wrap">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="platform">Platform</TabsTrigger>
                                <TabsTrigger value="system">System</TabsTrigger>
                                <TabsTrigger value="ai">AI & Integrations</TabsTrigger>
                                <TabsTrigger value="billing">Billing & Plans</TabsTrigger>
                                <TabsTrigger value="admins">Admins</TabsTrigger>
                                <TabsTrigger value="clients">Clients</TabsTrigger>
                                <TabsTrigger value="backup">Backup & Logs</TabsTrigger>
                            </TabsList>

                            <div className="mt-6">
                                <AnimatePresence exitBeforeEnter>
                                    <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.22 }}>

                                        {/* OVERVIEW */}
                                        {activeTab === "overview" && (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <Card className="p-6 rounded-2xl">
                                                    <CardHeader>
                                                        <CardTitle>Platform Snapshot</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="text-sm">Admins: {admins.length}</div>
                                                        <div className="text-sm mt-2">Clients: {clients.length}</div>
                                                        <div className="text-sm mt-2">Plans: {plans.length}</div>
                                                    </CardContent>
                                                </Card>

                                                <Card className="p-6 rounded-2xl md:col-span-2">
                                                    <CardHeader>
                                                        <CardTitle>Recent Activity</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="text-sm text-muted-foreground">Latest events and alerts will be shown here (mock data).</div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        )}

                                        {/* PLATFORM */}
                                        {activeTab === "platform" && (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <Card className="col-span-2 p-6 rounded-2xl">
                                                    <CardHeader>
                                                        <CardTitle>Platform Settings</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="flex flex-col gap-4">
                                                        <div>
                                                            <Label>Platform Name</Label>
                                                            <Input value={platformName} onChange={(e) => setPlatformName(e.target.value)} />
                                                        </div>

                                                        <div>
                                                            <Label>Support Email</Label>
                                                            <Input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
                                                        </div>

                                                        <div>
                                                            <Label>Default Domain Pattern</Label>
                                                            <Input value={defaultDomain} onChange={(e) => setDefaultDomain(e.target.value)} />
                                                        </div>

                                                        <div className="flex justify-end">
                                                            <Button className="text-white" onClick={savePlatform}>Save Platform</Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                <Card className="p-6 rounded-2xl">
                                                    <CardHeader>
                                                        <CardTitle>Legal & Footer</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="text-sm text-muted-foreground">Links for Privacy Policy, Terms and Support can be managed here.</div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        )}

                                        {/* SYSTEM */}
                                        {activeTab === "system" && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <Card className="p-6 rounded-2xl">
                                                    <CardHeader>
                                                        <CardTitle>System Configuration</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="flex flex-col gap-4">
                                                        <div>
                                                            <Label>Timezone</Label>
                                                            <Select value={timezone} onValueChange={setTimezone}>
                                                                <SelectTrigger className="w-full">{timezone}</SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="UTC+00:00">UTC+00:00</SelectItem>
                                                                    <SelectItem value="UTC+05:30">UTC+05:30 (India)</SelectItem>
                                                                    <SelectItem value="UTC-08:00">UTC-08:00 (PST)</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <Label>Maintenance Mode</Label>
                                                                <p className="text-sm text-muted-foreground">Enable platform-wide maintenance.</p>
                                                            </div>
                                                            <Switch checked={maintenance} onCheckedChange={setMaintenance} />
                                                        </div>

                                                        <div>
                                                            <Label>Log Level</Label>
                                                            <Select value={logLevel} onValueChange={setLogLevel}>
                                                                <SelectTrigger className="w-full">{logLevel}</SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="error">error</SelectItem>
                                                                    <SelectItem value="warning">warning</SelectItem>
                                                                    <SelectItem value="info">info</SelectItem>
                                                                    <SelectItem value="debug">debug</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div className="flex justify-end">
                                                            <Button className="text-white" onClick={saveSystem}>Save System</Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                <Card className="p-6 rounded-2xl">
                                                    <CardHeader>
                                                        <CardTitle>Storage & Email</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="text-sm text-muted-foreground">Configure S3 / R2, SMTP and notification providers here.</div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        )}

                                        {/* AI & INTEGRATIONS */}
                                        {activeTab === "ai" && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <Card className="col-span-2 p-6 rounded-2xl">
                                                    <CardHeader>
                                                        <CardTitle>Global AI Keys & Models</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="flex flex-col gap-4">
                                                        <div>
                                                            <Label>Global OpenAI / Provider Key</Label>
                                                            <Input value={globalOpenAIKey} onChange={(e) => setGlobalOpenAIKey(e.target.value)} placeholder="sk-..." />
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <Label>Webhook logging</Label>
                                                                <p className="text-sm text-muted-foreground">Log incoming/outgoing webhook traffic for debugging (may increase storage).</p>
                                                            </div>
                                                            <Switch checked={enableWebhookLogging} onCheckedChange={setEnableWebhookLogging} />
                                                        </div>

                                                        <div className="flex justify-end">
                                                            <Button className="text-white" onClick={saveAI}>Save AI Settings</Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                            </div>
                                        )}

                                        {/* BILLING & PLANS */}
                                        {activeTab === "billing" && (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <Card className="p-6 rounded-2xl md:col-span-1">
                                                    <CardHeader>
                                                        <CardTitle>Plans (Superadmin)</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className="text-sm text-muted-foreground">Edit default plan prices & limits. Changes apply to new signups or when you force-update clients.</p>
                                                        <div className="mt-4 space-y-3">
                                                            {plans.map((pl) => (
                                                                <div key={pl.id} className="p-3 rounded-lg border">
                                                                    <div className="flex items-center justify-between">
                                                                        <div>
                                                                            <div className="font-medium">{pl.name}</div>
                                                                            <div className="text-xs text-muted-foreground">₹{pl.price} / month • Clients: {pl.clients} • Users: {pl.users}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                <Card className="p-6 rounded-2xl md:col-span-2">
                                                    <CardHeader>
                                                        <CardTitle>Edit Plan</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                            {plans.map((pl) => (
                                                                <div key={pl.id} className="p-3 rounded-lg border">
                                                                    <Label className="mb-2">{pl.name}</Label>
                                                                    <Input value={pl.price} onChange={(e) => updatePlan(pl.id, 'price', Number(e.target.value))} placeholder="Price" />
                                                                    <Input value={pl.clients} onChange={(e) => updatePlan(pl.id, 'clients', Number(e.target.value))} placeholder="Clients" className="mt-2" />
                                                                    <Input value={pl.users} onChange={(e) => updatePlan(pl.id, 'users', Number(e.target.value))} placeholder="Users" className="mt-2" />
                                                                    <div className="flex items-center justify-between mt-3">
                                                                        <div className="text-sm">White-label</div>
                                                                        <Switch checked={pl.whiteLabel} onCheckedChange={(v) => updatePlan(pl.id, 'whiteLabel', v)} />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <div className="flex justify-end mt-4">
                                                            <Button
                                                            
                                                            className="text-white"
                                                            onClick={() => alert('Plans saved (mock)')}>Save Plans</Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        )}

                                        {/* ADMINS */}
                                        {activeTab === "admins" && (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <Card className="p-6 rounded-2xl md:col-span-2">
                                                    <CardHeader>
                                                        <CardTitle>Manage Superadmins</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="overflow-x-auto">
                                                            <Table>
                                                                <TableHeader>
                                                                    <TableRow>
                                                                        <TableCell>Name</TableCell>
                                                                        <TableCell>Email</TableCell>
                                                                        <TableCell>Role</TableCell>
                                                                        <TableCell>Status</TableCell>
                                                                        <TableCell>Actions</TableCell>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {admins.map((a) => (
                                                                        <TableRow key={a.id}>
                                                                            <TableCell>{a.name}</TableCell>
                                                                            <TableCell>{a.email}</TableCell>
                                                                            <TableCell>{a.role}</TableCell>
                                                                            <TableCell>{a.status}</TableCell>
                                                                            <TableCell>
                                                                                <div className="flex gap-2">
                                                                                    <Button className="text-white"variant="ghost">Edit</Button>
                                                                                    <Button 
                                                                                    className="text-white"variant="destructive" onClick={() => removeAdmin(a.id)}>Remove</Button>
                                                                                </div>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                <Card className="p-6 rounded-2xl">
                                                    <CardHeader>
                                                        <CardTitle>Add Admin</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="flex flex-col gap-3">
                                                        <Input placeholder="Name" value={newAdminName} onChange={(e) => setNewAdminName(e.target.value)} />
                                                        <Input placeholder="Email" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} />
                                                        <div className="flex justify-end">
                                                            <Button className="text-white" onClick={addAdmin}>Invite Admin</Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        )}

                                        {/* CLIENTS */}
                                        {activeTab === "clients" && (
                                            <div className="grid grid-cols-1 gap-6">
                                                <Card className="p-6 rounded-2xl">
                                                    <CardHeader>
                                                        <CardTitle>Clients</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="overflow-x-auto">
                                                            <table className="w-full text-sm table-auto">
                                                                <thead className="text-left text-xs text-muted-foreground">
                                                                    <tr>
                                                                        <th className="pb-2">Client</th>
                                                                        <th className="pb-2">Plan</th>
                                                                        <th className="pb-2">Status</th>
                                                                        <th className="pb-2">Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {clients.map((c) => (
                                                                        <tr key={c.id} className="border-t">
                                                                            <td className="py-3">{c.name}</td>
                                                                            <td className="py-3">{c.plan}</td>
                                                                            <td className="py-3">{c.status}</td>
                                                                            <td className="py-3">
                                                                                <div className="flex gap-2">
                                                                                    <Button 
                                                                                 variant="outline" onClick={() => toggleClientStatus(c.id)}>{c.status === 'active' ? 'Suspend' : 'Activate'}</Button>
                                                                                    <Button
                                                                                    variant="ghost">View</Button>
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
                                        )}

                                        {/* BACKUP & LOGS */}
                                        {activeTab === "backup" && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <Card className="p-6 rounded-2xl">
                                                    <CardHeader>
                                                        <CardTitle>Backups</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="flex flex-col gap-4">
                                                        <div>
                                                            <Label>Auto Backup Frequency</Label>
                                                            <Select value={backupFreq} onValueChange={setBackupFreq}>
                                                                <SelectTrigger className="w-full">{backupFreq}</SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="daily">Daily</SelectItem>
                                                                    <SelectItem value="weekly">Weekly</SelectItem>
                                                                    <SelectItem value="monthly">Monthly</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <Button className="text-white" onClick={() => alert('Export started (mock)')}>Export Data</Button>
                                                            <Button 
                                                            className="text-white"variant="outline">Import Data</Button>
                                                            <Button
                                                            className="text-white" variant="destructive">Clear Cache</Button>
                                                        </div>

                                                        <div className="mt-4">
                                                            <Label>Last Backup</Label>
                                                            <div className="text-sm text-muted-foreground">{new Date(lastBackup).toLocaleString()}</div>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                <Card className="p-6 rounded-2xl">
                                                    <CardHeader>
                                                        <CardTitle>Logs & Monitoring</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="text-sm text-muted-foreground">Recent system logs and alerts will be shown here. Integrate with Sentry / LogRocket / Datadog for full observability.</div>
                                                        <div className="mt-4">
                                                            <Button 
                                                            className="text-white"
                                                            onClick={() => alert('Download logs (mock)')}>Download Logs</Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        )}

                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </Tabs>
                    </div>
                </Card>
            </div>
        </div>
    );
}
