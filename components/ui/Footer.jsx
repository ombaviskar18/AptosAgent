"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/ombaviskar18/AptosMiniHub');
        const data = await response.json();
        setStarCount(data.stargazers_count);
      } catch (error) {
        console.error('Error fetching star count:', error);
      }
    };

    fetchStarCount();
  }, []);

  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          
          {/* Branding Section */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="AptosMiniHub Logo" 
                width={42} 
                height={42}
                className="rounded-lg hover:rotate-12 transition-transform"
              />
              <h2 className="text-2xl font-bold bg-white bg-clip-text text-transparent">
                AptosMiniHub
              </h2>
            </div>
            <p className="text-gray-300 text-center lg:text-left max-w-xs">
              AI-Powered MiniGames Launchpad on Aptos Network
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-6">
              <Link 
                href="https://www.linkedin.com/in/om-baviskar-/"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                target="_blank"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                </svg>
              </Link>

              <Link
                href="https://www.instagram.com/om_baviskar18/"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                target="_blank"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-pink-400">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </Link>

              <Link
                href="https://github.com/ombaviskar18"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                target="_blank"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-purple-400">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </Link>
            </div>

            {/* GitHub Star Section */}
            <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-full">
              <Link
                href="https://github.com/ombaviskar18/Minigames_AptosAgent"
                className="flex items-center gap-2 hover:scale-105 transition-transform"
                target="_blank"
              >
                <svg viewBox="0 0 16 16" width="20" height="20" className="fill-yellow-400">
                  <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
                </svg>
                <span className="text-gray-100 font-medium">Star on GitHub</span>
              </Link>
              <div className="h-6 w-px bg-gray-500"/>
              <span className="text-gray-300 font-mono">{starCount}</span>
            </div>
          </div>
        </div>

        {/* Credits Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-sm">🚀 Powered by</span>
              <span className="font-bold text-blue-300">Aptos Network</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">❤️ Crafted by</span>
              <span className="font-bold text-purple-300">Team Pioneers</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>
            </div>
            
            <div className="text-sm">
              © {new Date().getFullYear()} AptosMiniHub. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;