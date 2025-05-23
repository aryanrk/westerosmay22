import Link from "next/link";
// import { ProfileButton } from "@/components/auth/profile-button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link
          href="/"
          className="flex items-center justify-center font-bold text-xl mr-auto"
        >
          Westeros Real Estate
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/features"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            About
          </Link>
        </nav>
        {/* <div className="ml-4">
          <ProfileButton />
        </div> */}
      </header>
      
      {/* Hero */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Transform Your Real Estate Business with AI
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Engage visitors 24/7 with intelligent AI agents that understand your properties
                and close more leads while you focus on what matters.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Get Started
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  View Demo
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-xl">
              {/* Placeholder for hero image or animation */}
              <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <span className="text-gray-500">Property Showcase</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything You Need to Succeed
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our platform provides all the tools you need to automate your real estate business and focus on growth.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {/* Feature 1 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 2v8" />
                  <path d="m4.93 10.93 1.41 1.41" />
                  <path d="M2 18h2" />
                  <path d="M20 18h2" />
                  <path d="m19.07 10.93-1.41 1.41" />
                  <path d="M22 22H2" />
                  <path d="m16 6-4 4-4-4" />
                  <path d="M16 18a4 4 0 0 0-8 0" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">AI Conversations</h3>
              <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                AI agents that understand your listings and can engage with potential buyers 24/7.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Website Widget</h3>
              <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                Easily embed our chat widget on your website to start generating leads instantly.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 20V10" />
                  <path d="m18 20-6-6-6 6" />
                  <path d="M8 4v2" />
                  <path d="M12 4v2" />
                  <path d="M16 4v2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Lead Management</h3>
              <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                Track and manage leads captured by your AI agents with our intuitive dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Business?
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join thousands of real estate professionals already using our platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/signup"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 py-8">
            <div className="space-y-4">
              <div className="font-semibold">Company</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:underline">About</Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:underline">Careers</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="font-semibold">Product</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="hover:underline">Features</Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:underline">Pricing</Link>
                </li>
                <li>
                  <Link href="/roadmap" className="hover:underline">Roadmap</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="font-semibold">Resources</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="hover:underline">Blog</Link>
                </li>
                <li>
                  <Link href="/documentation" className="hover:underline">Documentation</Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:underline">Guides</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="font-semibold">Legal</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:underline">Cookie Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between border-t py-6">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © 2023 Westeros Real Estate. All rights reserved.
            </div>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
