import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Play, Shield, Zap, BarChart3, ArrowRight } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:py-32 bg-linear-to-b from-background to-secondary/20">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 animate-fade-in">
            <Zap className="h-3 w-3 fill-primary" />
            <span>Automate your trades with ease</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            The Future of <br className="hidden md:block" />
            <span className="text-primary">Automated Trading</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Build, test, and deploy complex trading strategies in minutes with our visual workflow editor. 
            Connect to top exchanges and let your bot do the work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full px-8 text-lg" onClick={() => navigate("/auth")}>
              Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-lg">
              View Documentation
            </Button>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground">Everything you need to succeed in the crypto markets.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col p-8 rounded-2xl border bg-card hover:border-primary/50 transition-colors shadow-sm">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-6">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure & Reliable</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your API keys are encrypted and stored securely. Our infrastructure ensures 99.9% uptime for your bots.
              </p>
            </div>
            
            <div className="flex flex-col p-8 rounded-2xl border bg-card hover:border-primary/50 transition-colors shadow-sm">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-6">
                <Play className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Visual Editor</h3>
              <p className="text-muted-foreground leading-relaxed">
                No coding required. Use our drag-and-drop interface to build complex logic and triggers.
              </p>
            </div>
            
            <div className="flex flex-col p-8 rounded-2xl border bg-card hover:border-primary/50 transition-colors shadow-sm">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-6">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Any Market</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect to Hyperliquid, Lighter, and Backpack. Trade any asset with precision and speed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 italic tracking-tight underline">Ready to automate?</h2>
          <p className="text-primary-foreground/80 text-lg mb-10">
            Join thousands of traders who are using TradingBot to gain an edge in the markets.
          </p>
          <Button size="lg" variant="secondary" className="rounded-full px-12 text-lg font-bold" onClick={() => navigate("/auth")}>
            Sign Up Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2026 TradingBot Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Twitter</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}