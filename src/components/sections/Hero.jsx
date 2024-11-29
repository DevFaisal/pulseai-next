"use client";
import React from "react";
import { Button } from "../ui/Button";
import { ArrowRight, Play, Brain } from "lucide-react";
import { Stats } from "./Stats";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-top" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-semibold bg-blue-100 text-blue-700 mb-6">
              Revolutionizing Healthcare
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
              Transform Healthcare with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                AI-Powered Insights
              </span>
            </h1>

            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Enhance patient care with real-time health monitoring, AI-driven
              symptom analysis, and seamless healthcare system integration.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 shadow-lg shadow-blue-500/25"
              >
                <Link href="/login">Get Started</Link>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 group"
              >
                <Play className="mr-2 h-4 w-4 fill-gray-700 group-hover:fill-blue-600" />
                Watch Demo
              </Button>
            </div>

            <Stats />
          </div>

          {/* Right Column - Image */}
          <div className="relative lg:ml-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent z-10" />
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
                alt="Medical professional using digital interface"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 z-20">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    AI Analysis Complete
                  </p>
                  <p className="text-xs text-gray-500">
                    Processing 1M+ data points daily
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
