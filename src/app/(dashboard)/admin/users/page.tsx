"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; 

interface UserProfile {
    id: string;
    username: string | null;
    email: string | null; // Added field map
    role: "admin" | "manager" | "user";
}

export default function UserManagementPage() {
    const [activeTab, setActiveTab] = useState<"list" | "register">("list");
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [selectedRole, setSelectedRole] = useState<"admin" | "manager" | "user">("user");
    
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [actionId, setActionId] = useState<string | null>(null); 
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const fetchUsers = async () => {
        setFetching(true);
        try {
            // Select includes both username and email columns now
            const { data, error } = await supabase
                .from("profiles")
                .select("id, username, email, role")
                .order('username', { ascending: true });
            
            if (error) throw error;
            setUsers(data || []);
        } catch (error: any) {
            console.error("Error loading profiles:", error.message);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            // Provide display name metadata to the auth client during sign up
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email.trim().toLowerCase(),
                password: password,
                options: {
                    data: { display_name: username.trim() }
                }
            });

            if (authError) throw authError;

            if (authData?.user) {
                // Upsert maps explicitly to match the updated fields cleanly
                const { error: profileError } = await supabase
                    .from("profiles")
                    .upsert({
                        id: authData.user.id,
                        username: username.trim() || email.split("@")[0],
                        email: email.trim().toLowerCase(),
                        role: selectedRole
                    });

                if (profileError) throw profileError;

                setMessage({ type: "success", text: `Provisioned account successfully for ${email}!` });
                setEmail("");
                setPassword("");
                setUsername("");
                fetchUsers();
                setActiveTab("list");
            }
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "An error occurred." });
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: string, newRole: "admin" | "manager" | "user") => {
        try {
            const { error } = await supabase
                .from("profiles")
                .update({ role: newRole })
                .eq("id", userId);

            if (error) throw error;
            
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
            setMessage({ type: "success", text: "Permissions matrix updated cleanly." });
        } catch (error: any) {
            setMessage({ type: "error", text: `Failed to change access: ${error.message}` });
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("Are you absolutely sure you want to permanently delete this user account?")) return;
        
        setActionId(userId);
        setMessage(null);

        try {
            const { error } = await supabase.rpc("delete_user_by_id", {
                target_user_id: userId
            });

            if (error) throw error;

            setMessage({ type: "success", text: "Identity wiped from registry successfully." });
            setUsers(prev => prev.filter(u => u.id !== userId));
        } catch (error: any) {
            setMessage({ type: "error", text: `Termination process failed: ${error.message}` });
        } finally {
            setActionId(null);
        }
    };

    return (
        <div className="p-6 bg-gray-200 min-h-screen rounded-lg space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">User Identity Governance</h2>
                <p className="text-gray-600 text-sm mt-0.5">Manage operator credentials, dynamic roles, and system directory properties.</p>
            </div>

            {message && (
                <div className={`p-4 rounded-lg text-sm font-medium border ${
                    message.type === "success" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"
                }`}>
                    {message.text}
                </div>
            )}

            <div className="flex border-b border-gray-300 space-x-2">
                <button
                    onClick={() => { setActiveTab("list"); setMessage(null); }}
                    className={`px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px ${
                        activeTab === "list" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                >
                    📁 Managed Users ({users.length})
                </button>
                <button
                    onClick={() => { setActiveTab("register"); setMessage(null); }}
                    className={`px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px ${
                        activeTab === "register" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                >
                    ➕ Provision New Account
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-300 shadow-sm p-6">
                {activeTab === "list" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">Operational Registry Directory</h3>
                            <button onClick={fetchUsers} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md font-medium border border-gray-300 transition">
                                Sync Directory
                            </button>
                        </div>

                        {fetching ? (
                            <div className="py-12 text-center text-sm text-gray-500">Querying identity architecture records...</div>
                        ) : users.length === 0 ? (
                            <div className="py-12 text-center text-sm text-gray-500">No active system profiles mapped.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50 text-xs font-bold text-gray-600 uppercase tracking-wider">
                                            <th className="py-3 px-4">Operator Info</th>
                                            <th className="py-3 px-4">Email Address</th>
                                            <th className="py-3 px-4">Unique Identity Reference</th>
                                            <th className="py-3 px-4 text-center">Active Scope Domain</th>
                                            <th className="py-3 px-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                        {users.map((u) => (
                                            <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-3 px-4 font-semibold text-gray-900">
                                                    {u.username || <span className="text-gray-400 italic font-normal">No handle set</span>}
                                                </td>
                                                <td className="py-3 px-4 text-gray-600 font-medium">
                                                    {u.email || <span className="text-gray-400 italic font-normal">N/A</span>}
                                                </td>
                                                <td className="py-3 px-4 font-mono text-xs text-gray-400 max-w-[120px] truncate">
                                                    {u.id}
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    <select
                                                        value={u.role}
                                                        className="px-2 py-1 text-xs border border-gray-300 rounded bg-white font-medium text-gray-700 focus:ring-1 focus:ring-blue-500"
                                                        onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="manager">Manager</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <button
                                                        onClick={() => handleDeleteUser(u.id)}
                                                        disabled={actionId === u.id}
                                                        className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-2.5 py-1 rounded border border-red-200 transition disabled:opacity-50"
                                                    >
                                                        {actionId === u.id ? "Dropping..." : "Delete User"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "register" && (
                    <div className="max-w-xl mx-auto py-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Register New Dashboard Identity</h3>
                        <form onSubmit={handleCreateUser} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Display Name</label>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none" placeholder="Jane Doe" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Security Authentication Email</label>
                                <input type="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none" placeholder="operator@system.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Initial Password</label>
                                <input type="password" required className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Access Authorization Level</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none capitalize" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value as any)}>
                                    <option value="user">User (Root Route Lockout)</option>
                                    <option value="manager">Manager Panel Authorization (/manager)</option>
                                    <option value="admin">Root System Admin Panel (/admin)</option>
                                </select>
                            </div>
                            <div className="pt-2">
                                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition text-sm disabled:bg-blue-300">
                                    {loading ? "Registering Target Records..." : "Provision Target Account Identity"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}