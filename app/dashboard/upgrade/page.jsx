'use client';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

// UpgradePage component to display upgrade options for Travel Planner GPT
const UpgradePage = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto text-center">
      <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Image 
            src="/pay.gif" 
            alt="Trophy" 
            width={200}
            height={200}
            className="rounded-lg shadow-lg shadow-yellow-400/50 hover:shadow-yellow-400/80 transition-shadow duration-300"
          />
        </motion.div>
        <h2 className="text-4xl font-bold text-gray-200 mb-8">Upgrade Your Gaming Experience</h2>
        <p className="text-lg text-gray-400 mb-12">
          Unlock premium features and make your gaming experience even more seamless and customized.
        </p>
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 ml-24 mr-24 md:grid-cols-3 gap-10">
          
          {/* Basic Plan */}
          <div className="space-y-2 border border-gray-500 rounded-lg p-6 bg-gray-800">
            <p className="text-2xl font-semibold text-gray-200">Basic Plan</p>
            <h3 className="text-3xl font-bold text-gray-200">$0</h3>
            <p className="text-lg text-gray-400">per month</p>
            <div className="space-y-4 mt-4 text-left">
              <p className="text-gray-300">- Access to limited games</p>
              <p className="text-gray-300">- No Advanced AI-powered aptos Game Hosting and Generation</p>
              <p className="text-gray-300">- Basic game tips and guides</p>
            </div>
            <button 
              className="mt-6 px-4 py-2 bg-gray-600 text-gray-200 rounded-lg cursor-not-allowed" 
              disabled>
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="space-y-2 border border-gray-500 rounded-lg p-6 bg-gray-900">
            <p className="text-2xl font-semibold text-gray-200">Pro Plan</p>
            <h3 className="text-3xl font-bold text-gray-200">$14.99</h3>
            <p className="text-lg text-gray-400">per month</p>
            <div className="space-y-4 mt-4 text-left">
              <p className="text-gray-300">- Access to 50+ games</p>
              <p className="text-gray-300">- Advanced AI-powered aptos game hosting and generation</p>
              <p className="text-gray-300">- Personalized recommendations for improvements</p>
            </div>
            <button className="mt-6 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition"
                onClick={() => alert("This feature will be available in the next release")}>
              Upgrade to Pro
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="space-y-2 border border-gray-500 rounded-lg p-6 bg-gray-800">
            <p className="text-2xl font-semibold text-gray-200">Enterprise Plan</p>
            <h3 className="text-3xl font-bold text-gray-200">$49.99</h3>
            <p className="text-lg text-gray-400">per month</p>
            <div className="space-y-4 mt-4 text-left">
              <p className="text-gray-300">- Unlimited games access</p>
              <p className="text-gray-300">- Custom games based on personal preferences</p>
              <p className="text-gray-300">- Exclusive aptos minigames deals and priority support</p>
            </div>
            <button className="mt-6 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition"
                onClick={() => alert("This feature will be available in the next release")}>
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Default export of the component
export default UpgradePage;
