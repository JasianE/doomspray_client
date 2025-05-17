// Dashboard.tsx
'use client';
import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>You are not logged in.</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setHistory([input, ...history]);
      setInput("");
    }
  };

  const handleDelete = (index) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-5xl text-blue-700 font-Khand mb-8">Welcome, {user.name}</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Area */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-2xl font-Khand"> Enter Site</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border border-gray-300 rounded-lg text-xl font-Khand p-3 resize-none h-32"
            placeholder="https://www.instagram.com/"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white font-Khand py-2 px-4 rounded-lg hover:bg-blue-500 transition"
          >
            Submit
          </button>
        </form>

        <div>
          <h2 className="text-2xl font-Khand mb-4">Block List</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {history.length === 0 ? (
              <p className="text-gray-300 text-xl font-Khand">No distractions yet...</p>
            ) : (
              history.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start hover:bg-sky-100 p-3 rounded-lg shadow-sm"
                >
                  <p className="text-gray-800 font-Khand text-xl whitespace-pre-wrap">{item}</p>
                  <button
                    onClick={() => handleDelete(index)}
                    className="ml-4 w-5 h-6"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 122.88 122.88"
                      className="w-full h-full fill-grey-800 hover:fill-red-500">
                      <title>cross</title>
                      <path
                        className="cls-1"
                        d="M6,6H6a20.53,20.53,0,0,1,29,0l26.5,26.49L87.93,6a20.54,20.54,0,0,1,29,0h0a20.53,20.53,0,0,1,0,29L90.41,61.44,116.9,87.93a20.54,20.54,0,0,1,0,29h0a20.54,20.54,0,0,1-29,0L61.44,90.41,35,116.9a20.54,20.54,0,0,1-29,0H6a20.54,20.54,0,0,1,0-29L32.47,61.44,6,34.94A20.53,20.53,0,0,1,6,6Z"
                      />
                    </svg>
        
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
