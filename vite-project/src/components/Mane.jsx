import React from "react";
import { motion } from "framer-motion";
import { Leaf, BarChart2, Sparkles, Droplet } from "lucide-react";

import { Link } from "react-router-dom";

export default function Mane({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-slate-900 to-indigo-900 text-slate-100 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center shadow-xl backdrop-blur-md">
              <Leaf className="w-10 h-10 text-emerald-300" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl mb-4">
            AI-Powered <span className="text-emerald-300">Crop Diversification</span> Advisor
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-lg">
            Smarter farming with soil, climate, and demand insights. 
            Reduce risks 🌱 Boost profits 📈 Strengthen resilience 🌍
          </p>
          <div className="mt-8">
            <Link to="/app">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-indigo-400 text-slate-900 font-bold shadow-lg hover:scale-105 active:scale-95 transition"
              >
                🚀 Get Started
              </button>
            </Link>
          </div>
        </motion.div>
        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="py-16 bg-white/5 backdrop-blur-md"
        >
          <h2 className="text-2xl font-bold text-center mb-10">Why Choose Us?</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-6">
            <FeatureCard
              icon={<BarChart2 className="text-emerald-300" />}
              title="Market Smart"
              desc="Recommends crops with strong demand trends and premium pricing."
            />
            <FeatureCard
              icon={<Droplet className="text-sky-300" />}
              title="Soil & Climate Fit"
              desc="Matches soil nutrients, pH, humidity and temperature with crops."
            />
            <FeatureCard
              icon={<Sparkles className="text-amber-300" />}
              title="Resilient Farming"
              desc="Diversify crops to reduce climate risks and improve soil health."
            />
          </div>
        </motion.div>
      </div>
      {/* Footer */}
      <footer className="py-6 text-center text-slate-400 text-sm border-t border-white/10">
        Built with ❤ for Hackathon | Crop Advisor 2025
      </footer>
    </div>
  );
}

/* Reusable Feature Card */
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 shadow-lg text-center">
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl bg-white/10">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-300 text-sm">{desc}</p>
    </div>
  );
}