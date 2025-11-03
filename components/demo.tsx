"use client"

import { Card } from "@/components/ui/card"

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-5-3v-4.9z" />
  </svg>
)

export default function Demo() {
  const demoCall = {
    customer: 'Customer: "Hello, I\'m interested in upgrading my plan"',
    ai: 'AI Assistant: "Great! Let me find the best plans for you. What are your current usage patterns?"',
    customer2: 'Customer: "I use about 5GB of data monthly"',
    ai2: 'AI Assistant: "Perfect! I recommend our Premium plan. Shall I proceed?"',
    customer3: 'Customer: "Yes, please"',
    ai3: 'AI Assistant: "Excellent! Your upgrade will be complete shortly. Thank you!"',
  }

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-emerald-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">See It In Action</h2>
          <p className="text-xl text-gray-600">Experience a live conversation with our AI voice assistant</p>
        </div>

        <Card className="bg-white border-2 border-gray-200 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-orange-400">
                <PhoneIcon />
              </div>
              <span className="text-white font-semibold">Live Call Simulation</span>
              <div className="ml-auto flex items-center gap-2 bg-emerald-700 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-emerald-100 text-sm">Active</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1">
                  <UserIcon />
                </div>
                <p className="text-emerald-50">{demoCall.customer}</p>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 text-green-400 flex-shrink-0 mt-1">
                  <PhoneIcon />
                </div>
                <p className="text-emerald-100">{demoCall.ai}</p>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1">
                  <UserIcon />
                </div>
                <p className="text-emerald-50">{demoCall.customer2}</p>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 text-green-400 flex-shrink-0 mt-1">
                  <PhoneIcon />
                </div>
                <p className="text-emerald-100">{demoCall.ai2}</p>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1">
                  <UserIcon />
                </div>
                <p className="text-emerald-50">{demoCall.customer3}</p>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 text-green-400 flex-shrink-0 mt-1">
                  <PhoneIcon />
                </div>
                <p className="text-emerald-100">{demoCall.ai3}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-emerald-700 flex items-center gap-4 text-sm text-emerald-100">
              <div className="w-4 h-4">
                <ClockIcon />
              </div>
              <span>Call Duration: 2:34</span>
              <span className="ml-4">Resolution Rate: 100%</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
