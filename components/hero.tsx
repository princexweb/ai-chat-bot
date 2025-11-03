"use client"

import { Button } from "@/components/ui/button"

const MicIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
    <path d="M17 16.91c-1.48 1.46-3.51 2.36-5.77 2.36-2.26 0-4.29-.9-5.77-2.36l-1.1 1.1c1.86 1.86 4.41 3.01 7.07 3.01 2.66 0 5.21-1.15 7.07-3.01l-1.1-1.1zM19 12h2c0 .91-.24 1.75-.67 2.5l1.45 1.45c.9-1.23 1.42-2.71 1.42-4.34 0-3.97-3.03-7.29-6.96-7.56V2h-2v3.13C8.72 5.35 6 8.13 6 11.5c0 1.56.38 3.03 1.07 4.34l1.45-1.45c-.43-.75-.67-1.59-.67-2.5h2c0 2.21 1.79 4 4 4s4-1.79 4-4z" />
  </svg>
)

export default function Hero() {
  const handleDemo = () => {
    const element = document.getElementById("voice-assistant")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-white to-orange-50 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute -bottom-8 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500 rounded-full blur-lg opacity-75 animate-pulse" />
            <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-full">
              <MicIcon />
            </div>
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">
          <span className="text-gray-900">Automate Your Telecalling with </span>
          <span className="bg-gradient-to-r from-orange-500 via-orange-500 to-emerald-600 bg-clip-text text-transparent">
            AI Voice Intelligence
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-600 mb-8 text-pretty max-w-2xl mx-auto">
          Empower your telecom business with smart, scalable, and automated voice communication.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleDemo}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0"
          >
            <MicIcon />
            <span className="ml-2">Try AI Voice Demo</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
          >
            View Documentation
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <p className="text-3xl font-bold text-orange-500">10K+</p>
            <p className="text-gray-600 text-sm mt-1">Active Users</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-500">99.9%</p>
            <p className="text-gray-600 text-sm mt-1">Uptime</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-500">50M+</p>
            <p className="text-gray-600 text-sm mt-1">Calls Processed</p>
          </div>
        </div>
      </div>
    </section>
  )
}
