# Sun AI Chat Bot - AI Telecalling Automation

*Intelligent voice assistant powered by OpenAI Realtime API and Twilio for automated customer conversations*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/princexbundela-2018s-projects/v0-hello)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/bUR1UeuhVsK)

## Overview

Sun AI Chat Bot is a full-stack application that enables AI-powered voice conversations through multiple channels:

- Real-time voice calls using OpenAI Realtime API
- Incoming/outgoing phone calls via Twilio
- WebRTC peer-to-peer audio connections
- Web-based dashboard for call management
- Admin panel for API key and log management

This repository stays in sync with deployments on [v0.app](https://v0.app).

## Features

- 🎤 **Real-time Speech Recognition** - Web Speech API for live transcription
- 🤖 **AI-Powered Responses** - OpenAI Realtime API for intelligent conversations
- 📞 **Phone Integration** - Twilio for incoming/outgoing calls
- 🔊 **WebRTC Calls** - P2P audio communication with ICE candidate handling
- 🔒 **Secure API Keys** - Environment variables, never exposed to frontend
- 📊 **Admin Dashboard** - Call logs, analytics, and API key management
- 🎨 **Modern UI** - Tailwind CSS with orange (#FF7A00) and dark green (#004D40) theme
- ⚡ **Built with Next.js 16** - TypeScript, Server Actions, API Routes

## Quick Start

### Prerequisites

- Node.js 18+
- OpenAI API key ([get here](https://platform.openai.com/api-keys))
- Twilio account (optional, for phone calls)

### Installation

\`\`\`bash
# Clone repository
git clone <your-repo-url>
cd sun-ai-chatbot

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your API keys to .env.local
# OPENAI_API_KEY=sk_...
# TWILIO_ACCOUNT_SID=AC_...
# TWILIO_AUTH_TOKEN=...
# TWILIO_PHONE_NUMBER=+1...

# Start development server
npm run dev

# Visit http://localhost:3000
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   ├── voice/              # OpenAI Realtime API routes
│   │   ├── twilio/             # Twilio integration endpoints
│   │   ├── config/             # Configuration checks
│   │   ├── health/             # Health status endpoint
│   │   └── logs/               # System logs
│   ├── dashboard/              # Main call interface
│   ├── admin/                  # Admin panel
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/
│   ├── call-interface.tsx      # Call control UI
│   ├── voice-recorder.tsx      # Voice recording
│   ├── webrtc-call-panel.tsx   # WebRTC calls
│   ├── twilio-call-panel.tsx   # Twilio calls
│   ├── admin-key-manager.tsx   # API key management
│   ├── admin-call-logs.tsx     # Call history
│   └── ui/                     # shadcn/ui components
├── hooks/
│   ├── use-voice-call.ts       # OpenAI Realtime hook
│   ├── use-speech-recognition.ts
│   ├── use-text-to-speech.ts
│   └── use-webrtc-call.ts      # WebRTC hook
├── lib/
│   └── secure-config.ts        # Security utilities
├── .env.example                # Environment template
├── .env.local                  # Local variables (not committed)
├── SETUP.md                    # Detailed setup guide
├── DEPLOYMENT.md               # Deployment instructions
└── README.md                   # This file
\`\`\`

## Core API Routes

### Voice Calls
- \`POST /api/voice\` - Initialize OpenAI Realtime session
- \`POST /api/voice\` - Process audio from WebRTC connections

### Twilio Integration
- \`POST /api/twilio/incoming-call\` - Handle incoming calls
- \`POST /api/twilio/make-call\` - Initiate outgoing calls
- \`POST /api/twilio/process-recording\` - Process call recordings

### System
- \`GET /api/config\` - Check available services
- \`GET /api/health\` - Health status check
- \`GET /api/logs\` - Retrieve system logs

## Environment Variables

### Required for Production
- \`OPENAI_API_KEY\` - OpenAI API key
- \`TWILIO_ACCOUNT_SID\` - Twilio account ID
- \`TWILIO_AUTH_TOKEN\` - Twilio authentication token
- \`TWILIO_PHONE_NUMBER\` - Your Twilio phone number

### Optional Configuration
- \`NEXT_PUBLIC_ADMIN_PASSWORD\` - Admin panel password
- \`NEXT_PUBLIC_APP_NAME\` - Application name
- \`NEXT_PUBLIC_THEME_PRIMARY\` - Primary color (#FF7A00)
- \`NEXT_PUBLIC_THEME_SECONDARY\` - Secondary color (#004D40)

## Usage

### Web Dashboard
Navigate to http://localhost:3000/dashboard to:
- Start/stop voice calls
- View real-time transcripts
- Monitor call duration
- See AI responses

### Admin Panel
Access http://localhost:3000/admin to:
- Manage API keys
- View call logs with transcriptions
- Adjust system settings
- Monitor call analytics

### Make Phone Calls
Use the Twilio panel to initiate outgoing calls or receive incoming calls automatically.

## Security

### API Key Protection
- Keys stored in \`.env.local\` only (never in code)
- Frontend never accesses sensitive keys
- Backend proxies all API authentication
- Environment variables for all credentials

### Best Practices
1. Never commit \`.env.local\` to version control
2. Rotate API keys every 90 days
3. Use separate keys for production/development
4. Monitor API usage for anomalies
5. Set strong admin password

## Deployment

Your project is live at:
**[https://vercel.com/princexbundela-2018s-projects/v0-hello](https://vercel.com/princexbundela-2018s-projects/v0-hello)**

### Deploy to Vercel

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
\`\`\`

Then add environment variables in Vercel dashboard:
- Settings > Environment Variables
- Add \`OPENAI_API_KEY\`, \`TWILIO_ACCOUNT_SID\`, etc.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Tech Stack

- **Frontend**: React 19, Next.js 16, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **APIs**: OpenAI Realtime, Twilio, Web Speech API
- **Real-time**: WebSocket, WebRTC
- **Deployment**: Vercel

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires Web Speech API support for speech recognition.

## Troubleshooting

**Microphone not working:**
- Check browser permissions
- Use HTTPS in production
- Verify browser supports Web Speech API

**OpenAI API errors:**
- Verify API key is correct
- Check API quota not exceeded
- Review rate limits

**Twilio calls not connecting:**
- Verify credentials in environment variables
- Check phone number format (+1...)
- Review Twilio console for errors

## Building Further

Continue building on [v0.app](https://v0.app/chat/bUR1UeuhVsK):

1. Make changes in the v0 editor
2. Click deploy from v0
3. Changes auto-sync to this repository
4. Vercel auto-deploys latest version

## Resources

- [OpenAI Realtime API Docs](https://platform.openai.com/docs)
- [Twilio Documentation](https://www.twilio.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [v0.app Editor](https://v0.app)

## License

MIT

## Support

For issues or questions:
1. Check [SETUP.md](./SETUP.md) for setup issues
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
3. Open a GitHub issue for bugs
\`\`\`
