// src/components/Dashboard.js
'use client';
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>You are not logged in.</div>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-Khand text-blue-700 mb-4">Welcome, {user.name}!</h1>
      <p className="text-xl">This is your dashboard.</p>
    </div>
  );
}
