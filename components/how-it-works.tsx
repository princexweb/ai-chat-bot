"use client"

const PhoneIcon = () => (
  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
  </svg>
)

const BrainIcon = () => (
  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 10h10M12 5c3.866 0 7 2.239 7 5-1.146-.424-2.423-.764-3.768-.899C17.502 12.93 15.396 14 12 14s-5.502-1.07-6.232-4.899C5.423 9.236 4.146 9.576 3 10c0-2.761 3.134-5 7-5m0 8c-3.866 0-7-2.239-7-5m0 0c1.146.424 2.423.764 3.768.899C6.498 11.07 8.604 10 12 10s5.502 1.07 6.232 4.899c1.345.135 2.622.475 3.768.899m-12 8c3.866 0 7 2.239 7 5-1.146-.424-2.423-.764-3.768-.899C17.502 20.93 15.396 22 12 22s-5.502-1.07-6.232-4.899C5.423 17.236 4.146 17.576 3 18c0-2.761 3.134-5 7-5" />
  </svg>
)

const DatabaseIcon = () => (
  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3C7.59 3 4 4.46 4 6.3v11.4C4 19.54 7.59 21 12 21s8-1.46 8-3.3V6.3C20 4.46 16.41 3 12 3m0 2c3.31 0 6 1.12 6 2.3S15.31 9.6 12 9.6s-6-1.12-6-2.3S8.69 5 12 5m0 13c-3.31 0-6-1.12-6-2.3V9.3c0 1.12 2.69 2.3 6 2.3s6-1.12 6-2.3v6.4c0 1.18-2.69 2.3-6 2.3z" />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
  </svg>
)

const steps = [
  {
    icon: PhoneIcon,
    title: "Customer Engagement",
    description: "Customer calls in or system auto-dials your target audience",
  },
  {
    icon: BrainIcon,
    title: "AI Processing",
    description: "Our AI voice assistant understands intent and context in real-time",
  },
  {
    icon: DatabaseIcon,
    title: "Data Logging",
    description: "Conversations and interactions are automatically logged and stored",
  },
  {
    icon: ChartIcon,
    title: "Analytics & Follow-up",
    description: "Generate reports and manage follow-ups seamlessly",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-white to-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">How It Works</h2>
          <p className="text-xl text-gray-600 text-pretty">
            Our AI-powered voice assistant streamlines your entire telecalling process
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {index < steps.length - 2 && (
                  <div className="hidden lg:block absolute -right-4 top-20 w-8 h-0.5 bg-gradient-to-r from-orange-500 to-transparent" />
                )}

                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                        <Icon />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 text-sm font-semibold text-orange-500">Step {index + 1}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
