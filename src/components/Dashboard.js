'use client';
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


export default function Dashboard() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [geminiSuggestions, setGeminiSuggestions] = useState([]);
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchBlockedSites = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Send an api request to http://localhost:8000/blocked-sites with {url: input}
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://api.doomspray.com"
          }
        });

        const response = await fetch('http://localhost:8000/blocked-sites', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          // credentials: 'include',
          // body: JSON.stringify({ url: input }), // Using 'input' as requested
        });

        
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${data.message || 'Unknown error'}`);
        }
        setHistory(data);

        // Call Google Gemini AI API here
        await fetchGeminiSuggestions(data);


      } catch (error) {
        console.error('Error fetching blocked sites', error);
        setError('Failed to load blocked sites');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) fetchBlockedSites();
  }, [isAuthenticated, getAccessTokenSilently]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setLoading(true);
      // Send an api request to http://localhost:8000/blocked-sites with {url: input}
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://api.doomspray.com"
        }
      });

      const res = await fetch('http://localhost:8000/blocked-sites', {
        method: 'POST', // Assuming POST based on the body structure {url: input}
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ url: input }), // Using 'input' as requested
      });

      
      await fetchGeminiSuggestions([input.trim(), ...history]);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setHistory([input.trim(), ...history]);
      setInput('');
    } catch (error) {
      console.error('Error adding site', error);
      setError('Failed to add site');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (index) => {
    const siteToDelete = history[index];
    try {
      setLoading(true);
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://api.doomspray.com"
        }
      });

      const res = await fetch('http://localhost:8000/blocked-sites', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ url: siteToDelete }),
      });

      const updatedHistory = history.filter((_, i) => i !== index);
      setHistory(updatedHistory);
      await fetchGeminiSuggestions(updatedHistory);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setHistory(history.filter((_, i) => i !== index));
    } catch (err) {
      console.error('Error deleting site', err);
      setError('Failed to delete site');
    } finally {
      setLoading(false);
    }
  };

  const fetchGeminiSuggestions = async (blockedSitesList) => {
    try {
      console.log('Fetching suggestions for:', blockedSitesList);
      setLoading(true);
      setError(null);
    
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://api.doomspray.com"
        }
      });
    
      const response = await fetch('http://localhost:8000/notifications/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ blockedSites: blockedSitesList }),
      });
  
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get suggestions');
      }
    
      setGeminiSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Error fetching Gemini suggestions:', error);
      setError('Failed to get Gemini suggestions: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-2xl">Loading user data...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-2xl">Please log in to access the dashboard</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-5xl text-blue-700 font-Khand mb-8">Welcome, {user.name}</h1>
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-2xl font-Khand">Enter Site</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border border-gray-300 rounded-lg text-xl font-Khand p-3 resize-none h-32"
            placeholder="https://www.instagram.com/"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="bg-blue-700 text-white font-Khand py-2 px-4 rounded-lg hover:bg-blue-500 transition disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>
        <div>
          <h2 className="text-2xl font-Khand mb-4">Block List</h2>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-4">
              <p>{error}</p>
            </div>
          )}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {loading && history.length === 0 ? (
              <p className="text-gray-300 text-xl font-Khand">Loading...</p>
            ) : history.length === 0 ? (
              <p className="text-gray-300 text-xl font-Khand">No distractions yet...</p>
            ) : (
              history.map((item, index) => (
                <div key={index} className="flex justify-between items-start hover:bg-sky-100 p-3 rounded-lg shadow-sm">
                  <p className="text-gray-800 font-Khand text-xl whitespace-pre-wrap">{item}</p>
                  <button 
                    onClick={() => handleDelete(index)} 
                    className="ml-4 w-5 h-6" 
                    title="Delete"
                    disabled={loading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88" className={`w-full h-full ${loading ? 'fill-gray-400' : 'fill-gray-800 hover:fill-red-500'}`}>
                      <title>cross</title>
                      <path d="M6,6H6a20.53,20.53,0,0,1,29,0l26.5,26.49L87.93,6a20.54,20.54,0,0,1,29,0h0a20.53,20.53,0,0,1,0,29L90.41,61.44,116.9,87.93a20.54,20.54,0,0,1,0,29h0a20.54,20.54,0,0,1-29,0L61.44,90.41,35,116.9a20.54,20.54,0,0,1-29,0H6a20.54,20.54,0,0,1,0-29L32.47,61.44,6,34.94A20.53,20.53,0,0,1,6,6Z"/>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

          <div>
            <h2 className="text-2xl font-Khand mb-4">Suggested Sites to Block</h2>
            {loading && geminiSuggestions.length === 0 ? (
              <p className="text-gray-300 text-xl font-Khand">Loading suggestions...</p>
            ) : geminiSuggestions.length === 0 ? (
              <p className="text-gray-300 text-xl font-Khand">No suggestions yet.</p>
            ) : (
              <div className="whitespace-nowrap overflow-x-auto py-2">
                {geminiSuggestions
                  .map(site => {
                    // Clean up the URL formatting
                    let cleanUrl = site
                      .replace(/"/g, '')      // Remove quotes
                      .replace(/,$/, '')      // Remove trailing commas
                      .replace(/\.$/, '')     // Remove trailing periods
                      .replace(/",/g, '')     // Remove ",
                      .replace(/"]}/g, '')    // Remove ]}
                      .trim();
                    
                    // Ensure it starts with https:// if not already
                    if (!cleanUrl.startsWith('http')) {
                      cleanUrl = `https://${cleanUrl}`;
                    }
                    
                    try {
                      // Attempt to construct URL and return hostname, or null if invalid
                      return new URL(cleanUrl).hostname;
                    } catch (error) {
                      console.error('Invalid URL after cleanup:', cleanUrl, error);
                      return null; // Return null for invalid URLs
                    }
                  })
                  .filter(hostname => hostname) // Remove any null entries
                  .map((hostname, i) => (
                    <React.Fragment key={i}>
                      <button
                        onClick={() => {
                          console.log('Setting input with hostname:', hostname); // Log the hostname
                          setInput(`https://${hostname}/`); // Pre-fill the input with a valid URL and add trailing slash
                          handleSubmit({ preventDefault: () => {} }); // Trigger submit
                        }}
                        className="text-blue-600 hover:text-blue-800 font-Khand text-lg hover:underline cursor-pointer"
                      >
                        {hostname}
                      </button>
                      {i < geminiSuggestions.filter(hostname => hostname).length - 1 && (
                        <span className="text-gray-500 mx-2">|</span>
                      )}
                    </React.Fragment>
                  ))
                }
              </div>
            )}
          </div>

          
      </div>
    </div>
  );
}