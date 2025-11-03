"use client"

const ZapIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
)

const HeadphonesIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 1C6.48 1 2 5.48 2 11v8c0 .55.45 1 1 1h1v-7c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v7h8v-7c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v7h1c.55 0 1-.45 1-1v-8c0-5.52-4.48-10-10-10zm-6 16c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm12 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
)

const DatabaseIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3C7.59 3 4 4.46 4 6.3v11.4C4 19.54 7.59 21 12 21s8-1.46 8-3.3V6.3C20 4.46 16.41 3 12 3m0 2c3.31 0 6 1.12 6 2.3S15.31 9.6 12 9.6s-6-1.12-6-2.3S8.69 5 12 5m0 13c-3.31 0-6-1.12-6-2.3V9.3c0 1.12 2.69 2.3 6 2.3s6-1.12 6-2.3v6.4c0 1.18-2.69 2.3-6 2.3z" />
  </svg>
)

const GlobeIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-5-3v-4.9z" />
  </svg>
)

const features = [
  {
    icon: ZapIcon,
    title: "AI Call Automation",
    description: "Fully automated voice calling with intelligent conversation flow",
  },
  {
    icon: HeadphonesIcon,
    title: "Real-time Speech Recognition",
    description: "Accurately capture and process customer speech in real-time",
  },
  {
    icon: DatabaseIcon,
    title: "CRM Integration",
    description: "Seamlessly integrate with your existing CRM systems",
  },
  {
    icon: GlobeIcon,
    title: "Multilingual Support",
    description: "Support customers in multiple languages and accents",
  },
  {
    icon: ChartIcon,
    title: "Analytics Dashboard",
    description: "Track performance metrics and call analytics in real-time",
  },
  {
    icon: ClockIcon,
    title: "24/7 Availability",
    description: "Your AI assistant works around the clock without interruptions",
  },
]

export default function Features() {
  return (
    <section className="py-20 sm:py-32 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">Powerful Features</h2>
          <p className="text-xl text-gray-600 text-pretty">
            Everything you need to revolutionize your telecalling operations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 group-hover:border-orange-300">
                  <div className="mb-4 inline-block p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg group-hover:scale-110 transition-transform">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
