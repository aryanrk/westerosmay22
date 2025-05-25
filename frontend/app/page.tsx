"use client";

import Link from "next/link";
import { ArrowRight, Bot, MessageCircle, BarChart3, Star, Play, Home, TrendingUp, Zap, Shield, Clock, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <span className="font-bold text-xl text-gray-900">Westeros AI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors">
              Get Started
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-8">
            <span className="text-sm text-blue-600 font-medium">🚀 AI-Powered Real Estate Platform</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Transform Your Real Estate Business with AI
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Automate lead qualification, engage visitors 24/7, and close more deals with intelligent AI agents that understand your properties and customers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="/signup" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold text-white transition-colors">
              Start Free Trial →
            </a>
            <a href="/demo" className="border border-gray-300 hover:border-gray-400 px-8 py-4 rounded-lg text-lg font-semibold text-gray-700 transition-colors">
              ▶ Watch Demo
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-600">AI Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">10k+</div>
              <div className="text-gray-600">Agents Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">95%</div>
              <div className="text-gray-600">Lead Conversion</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Everything You Need to Scale Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI platform provides all the tools you need to automate lead generation, qualify prospects, and close more deals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Smart AI Conversations</h3>
              <p className="text-gray-600 mb-4">
                AI agents that understand your listings, qualify leads, and handle complex real estate inquiries with human-like responses.
              </p>
              <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                Learn more →
              </a>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-6">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Website Integration</h3>
              <p className="text-gray-600 mb-4">
                Embed our intelligent chat widget on any website to instantly capture and qualify leads with zero setup time.
              </p>
              <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                Learn more →
              </a>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Advanced Analytics</h3>
              <p className="text-gray-600 mb-4">
                Deep insights into lead behavior, conversion metrics, and AI performance with real-time dashboards.
              </p>
              <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-8 font-medium">Trusted by leading real estate professionals</p>
          <div className="flex items-center justify-center space-x-2 mb-8">
            <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
            <span className="text-gray-900 font-semibold ml-2">4.9/5</span>
            <span className="text-gray-600">(2,847 reviews)</span>
          </div>
          
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center p-6 rounded-lg bg-gray-50">
              <span className="text-3xl mb-3">🛡️</span>
              <span className="text-gray-900 font-medium">Secure & Compliant</span>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg bg-gray-50">
              <span className="text-3xl mb-3">⚡</span>
              <span className="text-gray-900 font-medium">Lightning Fast</span>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg bg-gray-50">
              <span className="text-3xl mb-3">🕒</span>
              <span className="text-gray-900 font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to 10x Your Real Estate Business?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of successful agents who have transformed their business with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/signup" className="bg-white hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold text-blue-600 transition-colors">
              Start Free Trial
            </a>
            <a href="/contact" className="border border-blue-400 hover:border-blue-300 px-8 py-4 rounded-lg text-lg font-semibold text-white transition-colors">
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                <span className="font-bold text-xl text-gray-900">Westeros AI</span>
              </div>
              <p className="text-gray-600">
                The future of real estate is here. Transform your business with AI-powered automation.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="font-semibold text-gray-900">Product</div>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-gray-900">Features</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">Pricing</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">Integrations</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="font-semibold text-gray-900">Company</div>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-gray-900">About</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">Careers</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">Contact</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="font-semibold text-gray-900">Legal</div>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-gray-900">Privacy</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">Terms</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900">Security</a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600">&copy; 2024 Westeros AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
