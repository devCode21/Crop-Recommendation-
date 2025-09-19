import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Droplet, Thermometer, Sparkles } from "lucide-react";

export default function CropAdvisorUI() {
  const [inputs, setInputs] = useState({
    soilType: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    humidity: "",
    temperature: "",
  });

  const [recommendations, setRecommendations] = useState([]);

  const handleChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const runAdvisor = () => {
    // mock AI logic
    if (!inputs.soilType || !inputs.nitrogen || !inputs.ph) {
      alert("Please fill soil details first!");
      return;
    }
    setRecommendations([
      { crop: "Rice", score: 90, reason: "High water retention, suits humid climate" },
   
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-slate-900 to-indigo-900 text-slate-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md"
      >
        <h1 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
          <Leaf className="text-emerald-300" /> Crop Diversification Advisor
        </h1>

        {/* Input Grid */}
        <div className="grid grid-cols-2 gap-5">
          <InputBox
            label="Soil Type"
            value={inputs.soilType}
            onChange={(e) => handleChange("soilType", e.target.value)}
            type="text"
          />
          <InputBox
            label="Nitrogen (N)"
            value={inputs.nitrogen}
            onChange={(e) => handleChange("nitrogen", e.target.value)}
            type="number"
          />
          <InputBox
            label="Phosphorus (P)"
            value={inputs.phosphorus}
            onChange={(e) => handleChange("phosphorus", e.target.value)}
            type="number"
          />
          <InputBox
            label="Potassium (K)"
            value={inputs.potassium}
            onChange={(e) => handleChange("potassium", e.target.value)}
            type="number"
          />
          <InputBox
            label="pH"
            value={inputs.ph}
            onChange={(e) => handleChange("ph", e.target.value)}
            type="number"
          />
          <InputBox
            label="Humidity (%)"
            icon={<Droplet className="text-sky-300" />}
            value={inputs.humidity}
            onChange={(e) => handleChange("humidity", e.target.value)}
            type="number"
          />
          <InputBox
            label="Temperature (°C)"
            icon={<Thermometer className="text-red-300" />}
            value={inputs.temperature}
            onChange={(e) => handleChange("temperature", e.target.value)}
            type="number"
          />
        </div>

        {/* Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={runAdvisor}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-indigo-400 text-slate-900 font-bold shadow-lg hover:scale-105 active:scale-95 transition"
          >
            <Sparkles className="inline mr-2" /> Get Recommendations
          </button>
        </div>

        {/* Results */}
        <div className="mt-8">
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {recommendations.map((r, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 shadow-lg"
                >
                  <h3 className="font-bold text-lg">{r.crop}</h3>
                  <p className="text-sm text-slate-300 mt-1">{r.reason}</p>
               
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-center">Fill inputs and click Get Recommendations</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* Reusable InputBox */
function InputBox({ label, value, onChange, icon, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-semibold mb-1 block">{label}</label>
      <div className="flex items-center bg-white/10 rounded-xl px-3 py-2 focus-within:ring-2 ring-emerald-400">
        {icon && <div className="mr-2">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={`Enter ${label}`}
          className="bg-transparent outline-none w-full text-slate-100 placeholder-slate-400"
        />
      </div>
    </div>
  );
}
