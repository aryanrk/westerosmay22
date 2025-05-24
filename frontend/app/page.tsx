import Link from "next/link";
import { ArrowRight, Bot, Globe, BarChart3, Zap, Star, Check, Play } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d946ef,transparent)]"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/10 backdrop-blur-md bg-black/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
            Westeros
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
              About
            </Link>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-40 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">AI-Powered Real Estate Revolution</span>
          </div>

          {/* Main Headlines */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Transform Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
              Real Estate Business
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              with AI
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
            Engage visitors 24/7 with intelligent AI agents that understand your properties, 
            qualify leads automatically, and close deals while you sleep.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/signup"
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/demo"
              className="group border border-white/20 hover:border-white/40 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/5 flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">24/7</div>
              <div className="text-gray-400 text-sm">AI Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">10k+</div>
              <div className="text-gray-400 text-sm">Agents Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">95%</div>
              <div className="text-gray-400 text-sm">Lead Conversion</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-40 py-32">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Everything You Need to
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
                Dominate Your Market
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our AI-powered platform provides all the tools you need to automate, scale, and accelerate your real estate business.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Conversations</h3>
              <p className="text-gray-400 leading-relaxed">
                Advanced AI agents that understand your listings, qualify leads, and handle complex real estate inquiries with human-like precision.
              </p>
              <div className="mt-6 flex items-center space-x-2 text-blue-400 text-sm font-medium">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-teal-500/10 border border-purple-500/20 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Website Widget</h3>
              <p className="text-gray-400 leading-relaxed">
                Seamlessly embed our intelligent chat widget on any website to instantly capture and qualify leads with zero setup time.
              </p>
              <div className="mt-6 flex items-center space-x-2 text-purple-400 text-sm font-medium">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-teal-500/20 backdrop-blur-sm hover:border-teal-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Advanced Analytics</h3>
              <p className="text-gray-400 leading-relaxed">
                Deep insights into lead behavior, conversion metrics, and AI performance with real-time dashboards and predictive analytics.
              </p>
              <div className="mt-6 flex items-center space-x-2 text-teal-400 text-sm font-medium">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative z-40 py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <p className="text-gray-400 mb-8">Trusted by leading real estate professionals worldwide</p>
          <div className="flex items-center justify-center space-x-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
            <span className="text-white font-semibold ml-2">4.9/5</span>
            <span className="text-gray-400">(2,847 reviews)</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-40 py-32">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ready to 10x Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
                  Real Estate Business?
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of successful agents who've transformed their business with our AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/contact"
                  className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/5"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-40 border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="font-bold text-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
                Westeros
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The future of real estate is here. Transform your business with AI-powered automation.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="font-semibold text-white">Product</div>
              <div className="space-y-2">
                <Link href="/features" className="block text-gray-400 hover:text-white transition-colors text-sm">Features</Link>
                <Link href="/pricing" className="block text-gray-400 hover:text-white transition-colors text-sm">Pricing</Link>
                <Link href="/integrations" className="block text-gray-400 hover:text-white transition-colors text-sm">Integrations</Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="font-semibold text-white">Company</div>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-400 hover:text-white transition-colors text-sm">About</Link>
                <Link href="/careers" className="block text-gray-400 hover:text-white transition-colors text-sm">Careers</Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors text-sm">Contact</Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="font-semibold text-white">Legal</div>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors text-sm">Privacy</Link>
                <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors text-sm">Terms</Link>
                <Link href="/security" className="block text-gray-400 hover:text-white transition-colors text-sm">Security</Link>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Westeros Real Estate AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
