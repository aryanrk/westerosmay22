import Link from "next/link";
// import { ProfileButton } from "@/components/auth/profile-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="/"
          className="font-bold text-xl text-blue-600"
        >
          Westeros Real Estate
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/features"
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            About
          </Link>
        </nav>
        {/* <div className="ml-4">
          <ProfileButton />
        </div> */}
      </header>
      
      {/* Hero */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-gray-900">
                Transform Your Real Estate Business with AI
              </h1>
              <p className="max-w-2xl text-gray-600 text-lg md:text-xl">
                Engage visitors 24/7 with intelligent AI agents that understand your properties
                and close more leads while you focus on what matters.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  View Demo
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-lg aspect-video rounded-xl overflow-hidden shadow-xl">
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Property Showcase</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center space-y-4">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-gray-900">
              Everything You Need to Succeed
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              Our platform provides all the tools you need to automate your real estate business and focus on growth.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm bg-white">
              <div className="p-2 bg-blue-100 rounded-full">
                <div className="h-6 w-6 bg-blue-600 rounded"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">AI Conversations</h3>
              <p className="text-sm text-gray-600 text-center">
                AI agents that understand your listings and can engage with potential buyers 24/7.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm bg-white">
              <div className="p-2 bg-blue-100 rounded-full">
                <div className="h-6 w-6 bg-blue-600 rounded"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Website Widget</h3>
              <p className="text-sm text-gray-600 text-center">
                Easily embed our chat widget on your website to start generating leads instantly.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm bg-white">
              <div className="p-2 bg-blue-100 rounded-full">
                <div className="h-6 w-6 bg-blue-600 rounded"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Lead Management</h3>
              <p className="text-sm text-gray-600 text-center">
                Track and manage leads captured by your AI agents with our intuitive dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900">
              Ready to Transform Your Business?
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Join thousands of real estate professionals already using our platform.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row justify-center">
              <Link
                href="/signup"
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="font-semibold text-gray-900">Company</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-600 hover:text-blue-600">Careers</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="font-semibold text-gray-900">Product</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-gray-600 hover:text-blue-600">Features</Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
                </li>
                <li>
                  <Link href="/roadmap" className="text-gray-600 hover:text-blue-600">Roadmap</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="font-semibold text-gray-900">Resources</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-gray-600 hover:text-blue-600">Documentation</Link>
                </li>
                <li>
                  <Link href="/guides" className="text-gray-600 hover:text-blue-600">Guides</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="font-semibold text-gray-900">Legal</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-600 hover:text-blue-600">Cookie Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; 2024 Westeros Real Estate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
