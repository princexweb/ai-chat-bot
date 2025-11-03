# Sun AI Chat Bot - Setup Guide

## Environment Variables

This application requires secure API keys for OpenAI and Twilio. **NEVER commit these keys to version control.**

### Required Configuration

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
# OpenAI Realtime API Key
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-key-here

# Twilio Configuration (Optional, for phone call support)
# Get from: https://www.twilio.com/console
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Public Configuration (safe to expose)
NEXT_PUBLIC_APP_NAME=Sun AI Chat Bot
NEXT_PUBLIC_THEME_PRIMARY=#FF7A00
NEXT_PUBLIC_THEME_SECONDARY=#004D40
\`\`\`

### Security Best Practices

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **API keys server-side only** - Frontend never accesses `OPENAI_API_KEY` or `TWILIO_AUTH_TOKEN`
3. **Use vercel secrets** - For production, add secrets via Vercel dashboard:
   \`\`\`bash
   vercel env add OPENAI_API_KEY
   vercel env add TWILIO_ACCOUNT_SID
   vercel env add TWILIO_AUTH_TOKEN
   \`\`\`
4. **Rotate keys regularly** - Change API keys every 90 days
5. **Monitor usage** - Check API dashboards for unusual activity

### Getting API Keys

#### OpenAI Realtime API
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy and paste into `OPENAI_API_KEY`

#### Twilio (Optional)
1. Go to https://www.twilio.com/console
2. Copy `Account SID` and `Auth Token`
3. Get your Twilio phone number
4. Configure in environment variables

## Running Locally

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
\`\`\`

## API Endpoints

### `/api/voice` (POST)
- Handles OpenAI Realtime API session initialization
- Never exposes API keys to frontend
- Returns secure session tokens for client-side connection

### `/api/twilio` (POST)
- Handles incoming Twilio calls
- Processes voice data securely
- Returns TwiML responses for call handling

### `/api/config` (GET)
- Check which services are available
- Safe to call from frontend (never returns keys)

## Deployment to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push
