import Link from "next/link";
import { ArrowRight, Bot, Globe, BarChart3, Star, Check, Play, Home, Users, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-amber-900 overflow-hidden relative">
      {/* Desert-inspired Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-100/30 via-orange-100/20 to-yellow-100/30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4a57420_1px,transparent_1px),linear-gradient(to_bottom,#d4a57420_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-gradient-to-r from-amber-200/40 to-orange-200/40 opacity-60 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_900px_at_80%_300px,#f59e0b20,transparent)]"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-amber-200/50 backdrop-blur-sm bg-white/70">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-3xl text-amber-800">Westeros</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-amber-700 hover:text-amber-900 transition-colors duration-200 text-sm font-medium">
              Features
            </Link>
            <Link href="/pricing" className="text-amber-700 hover:text-amber-900 transition-colors duration-200 text-sm font-medium">
              Pricing
            </Link>
            <Link href="/about" className="text-amber-700 hover:text-amber-900 transition-colors duration-200 text-sm font-medium">
              About
            </Link>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 transform hover:scale-105 shadow-lg shadow-amber-600/25"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-40 pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300/50 rounded-full px-5 py-2.5 mb-8 backdrop-blur-sm shadow-sm">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <span className="text-sm text-amber-800 font-medium">AI-Powered Real Estate Revolution</span>
          </div>

          {/* Main Headlines */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 bg-clip-text text-transparent">
              Transform Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-700 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Real Estate Business
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 bg-clip-text text-transparent">
              with AI
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-amber-700 max-w-4xl mx-auto mb-12 leading-relaxed">
            Engage visitors 24/7 with intelligent AI agents that understand your properties, 
            qualify leads automatically, and close deals while you focus on what matters most.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/signup"
              className="group bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-xl shadow-amber-600/30"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/demo"
              className="group border-2 border-amber-300 hover:border-amber-400 px-8 py-4 rounded-xl text-lg font-semibold text-amber-800 transition-all duration-300 backdrop-blur-sm hover:bg-amber-50 flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">24/7</div>
              <div className="text-amber-600 text-sm font-medium">AI Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">10k+</div>
              <div className="text-amber-600 text-sm font-medium">Agents Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">95%</div>
              <div className="text-amber-600 text-sm font-medium">Lead Conversion</div>
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
              <span className="bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent">
                Everything You Need to
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-700 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Dominate Your Market
              </span>
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Our AI-powered platform provides all the tools you need to automate, scale, and accelerate your real estate business.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-white/80 to-amber-50/80 border border-amber-200/50 backdrop-blur-sm hover:border-amber-300/70 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">AI Conversations</h3>
              <p className="text-amber-700 leading-relaxed">
                Advanced AI agents that understand your listings, qualify leads, and handle complex real estate inquiries with human-like precision.
              </p>
              <div className="mt-6 flex items-center space-x-2 text-amber-600 text-sm font-medium">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-white/80 to-orange-50/80 border border-orange-200/50 backdrop-blur-sm hover:border-orange-300/70 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Smart Website Widget</h3>
              <p className="text-amber-700 leading-relaxed">
                Seamlessly embed our intelligent chat widget on any website to instantly capture and qualify leads with zero setup time.
              </p>
              <div className="mt-6 flex items-center space-x-2 text-orange-600 text-sm font-medium">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-white/80 to-yellow-50/80 border border-yellow-200/50 backdrop-blur-sm hover:border-yellow-300/70 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Advanced Analytics</h3>
              <p className="text-amber-700 leading-relaxed">
                Deep insights into lead behavior, conversion metrics, and AI performance with real-time dashboards and predictive analytics.
              </p>
              <div className="mt-6 flex items-center space-x-2 text-yellow-600 text-sm font-medium">
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
          <p className="text-amber-600 mb-8 font-medium">Trusted by leading real estate professionals worldwide</p>
          <div className="flex items-center justify-center space-x-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-amber-500 fill-current" />
            ))}
            <span className="text-amber-800 font-semibold ml-3 text-lg">4.9/5</span>
            <span className="text-amber-600 text-lg">(2,847 reviews)</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-40 py-32">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-white/70 to-amber-50/70 border border-amber-200/50 backdrop-blur-xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-orange-100/20 rounded-3xl"></div>
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent">
                  Ready to 10x Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-700 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  Real Estate Business?
                </span>
              </h2>
              <p className="text-xl text-amber-700 mb-8 max-w-2xl mx-auto">
                Join thousands of successful agents who've transformed their business with our AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-xl shadow-amber-600/30"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-amber-300 hover:border-amber-400 px-8 py-4 rounded-xl text-lg font-semibold text-amber-800 transition-all duration-300 backdrop-blur-sm hover:bg-amber-50"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-40 border-t border-amber-200/50 py-16 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-2xl text-amber-800">Westeros</span>
              </div>
              <p className="text-amber-600 text-sm leading-relaxed">
                The future of real estate is here. Transform your business with AI-powered automation and natural intelligence.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="font-semibold text-amber-900">Product</div>
              <div className="space-y-2">
                <Link href="/features" className="block text-amber-700 hover:text-amber-900 transition-colors text-sm">Features</Link>
                <Link href="/pricing" className="block text-amber-700 hover:text-amber-900 transition-colors text-sm">Pricing</Link>
                <Link href="/integrations" className="block text-amber-700 hover:text-amber-900 transition-colors text-sm">Integrations</Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="font-semibold text-amber-900">Company</div>
              <div className="space-y-2">
                <Link href="/about" className="block text-amber-700 hover:text-amber-900 transition-colors text-sm">About</Link>
                <Link href="/careers" className="block text-amber-700 hover:text-amber-900 transition-colors text-sm">Careers</Link>
                <Link href="/contact" className="block text-amber-700 hover:text-amber-900 transition-colors text-sm">Contact</Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="font-semibold text-amber-900">Legal</div>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-amber-700 hover:text-amber-900 transition-colors text-sm">Privacy</Link>
                <Link href="/terms" className="block text-amber-700 hover:text-amber-900 transition-colors text-sm">Terms</Link>
                <Link href="/security" className="block text-amber-700 hover:text-amber-900 transition-colors text-sm">Security</Link>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-amber-200/50 text-center text-amber-600 text-sm">
            <p>&copy; 2024 Westeros Real Estate AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
