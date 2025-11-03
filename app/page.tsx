import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-foreground">Sun AI Chat Bot</div>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button variant="default">Dashboard</Button>
            </Link>
            <Link href="#features">
              <Button variant="outline">Features</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-foreground mb-4 text-balance">
            Intelligent Voice AI for Your Business
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Automate customer conversations with AI-powered voice calls. Handle inquiries, support tickets, and sales
            with secure OpenAI Realtime API integration.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="px-8 py-6 text-lg">
              Get Started Now
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="text-4xl mb-4">🎤</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Voice Recognition</h3>
            <p className="text-muted-foreground">
              Real-time speech-to-text conversion with high accuracy powered by Web Speech API
            </p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">AI Conversations</h3>
            <p className="text-muted-foreground">Secure OpenAI Realtime API for intelligent, context-aware responses</p>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">
              API keys stored securely in environment variables, never exposed to frontend
            </p>
          </Card>
        </div>

        {/* Tech Stack */}
        <Card className="p-8 bg-card border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Built with Modern Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Next.js 16", icon: "⚡" },
              { name: "OpenAI Realtime", icon: "🤖" },
              { name: "Twilio", icon: "📞" },
              { name: "WebRTC", icon: "🔊" },
              { name: "TypeScript", icon: "📝" },
              { name: "Tailwind CSS", icon: "🎨" },
              { name: "Web Speech API", icon: "🎤" },
              { name: "Environment Vars", icon: "🔐" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="p-4 bg-background rounded-lg border border-border flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors"
              >
                <div className="text-3xl mb-2">{tech.icon}</div>
                <p className="text-sm font-semibold text-foreground">{tech.name}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Customer Interactions?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Deploy Sun AI Chat Bot to your business and start automating voice conversations today.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="px-8 py-6 text-lg">
              Launch Dashboard
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
