import Hero from "@/components/hero"
import HowItWorks from "@/components/how-it-works"
import Features from "@/components/features"
import Demo from "@/components/demo"
import ContactForm from "@/components/contact-form"
import VoiceAssistant from "@/components/voice-assistant"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <HowItWorks />
      <Features />
      <Demo />
      <ContactForm />
      <VoiceAssistant />
    </div>
  )
}
