# Sun AI Chat Bot - Deployment Guide

## Pre-Deployment Checklist

- [ ] All environment variables configured in `.env.local`
- [ ] OpenAI API key tested and verified
- [ ] Twilio credentials configured (optional)
- [ ] Admin password set securely
- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] UI responsive on mobile and desktop

## Environment Setup for Vercel

### 1. Connect Repository to Vercel

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
vercel
\`\`\`

### 2. Add Environment Variables in Vercel Dashboard

Go to **Settings > Environment Variables** and add:

**Production Variables:**
\`\`\`
OPENAI_API_KEY=sk_...
TWILIO_ACCOUNT_SID=AC_...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...
\`\`\`

**Public Variables:**
\`\`\`
NEXT_PUBLIC_APP_NAME=Sun AI Chat Bot
NEXT_PUBLIC_THEME_PRIMARY=#FF7A00
NEXT_PUBLIC_THEME_SECONDARY=#004D40
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
\`\`\`

### 3. Deploy

\`\`\`bash
# Push to GitHub and Vercel auto-deploys
git push origin main

# Or manual deploy
vercel --prod
\`\`\`

## Local Testing

### Test OpenAI Integration

\`\`\`bash
# Start dev server
npm run dev

# Visit dashboard
# http://localhost:3000/dashboard

# Test voice call
1. Click "Start Call" button
2. Speak into microphone
3. Verify transcript appears
4. Check AI response
\`\`\`

### Test Twilio Integration

\`\`\`bash
# Make test call to your Twilio number
# Phone number: process.env.TWILIO_PHONE_NUMBER

# Listen for greeting: "Welcome to Sun AI Chat Bot"
# Speak your inquiry
# Listen for AI-generated response
\`\`\`

### Test API Routes

\`\`\`bash
# Test voice API
curl -X POST http://localhost:3000/api/voice \
  -H "Content-Type: application/json" \
  -d '{"action":"init-session"}'

# Test config endpoint
curl http://localhost:3000/api/config
\`\`\`

### Test Admin Panel

1. Navigate to `http://localhost:3000/admin`
2. Enter admin password (default: "admin")
3. Test API key management
4. Review call logs
5. Adjust settings

## Security Verification Checklist

### Frontend
- [ ] No API keys visible in network inspector
- [ ] No sensitive data in localStorage (only auth status)
- [ ] All API calls go through backend routes
- [ ] CORS headers properly configured

### Backend
- [ ] API keys only in environment variables
- [ ] All external API calls authenticated
- [ ] Input validation on all endpoints
- [ ] Rate limiting configured
- [ ] Error messages don't expose sensitive info

### API Keys
- [ ] Keys rotate every 90 days
- [ ] Keys have appropriate scopes/permissions
- [ ] Old keys are deactivated
- [ ] Usage is monitored for anomalies

## Monitoring in Production

### Key Metrics to Track

1. **Call Volume**
   - Incoming calls per day
   - Outgoing calls per day
   - Average call duration

2. **Success Rates**
   - Successful call completion %
   - Failed call %
   - Average response time

3. **API Usage**
   - OpenAI API calls
   - Twilio minutes consumed
   - Cost tracking

4. **Errors**
   - 5xx server errors
   - API timeouts
   - Transcription failures

### Recommended Tools

- **Vercel Analytics** - Built-in performance monitoring
- **Sentry** - Error tracking
- **OpenAI Dashboard** - API usage monitoring
- **Twilio Console** - Call analytics
- **LogRocket** - Session replay for debugging

## Scaling Considerations

### Handling High Traffic

1. **API Rate Limiting**
   - Implement rate limiting per IP
   - Queue long-running requests

2. **Database Optimization**
   - Index call logs by timestamp
   - Archive old records
   - Use pagination

3. **Caching**
   - Cache AI responses for common queries
   - Cache user preferences
   - Use Redis for session management

4. **Load Balancing**
   - Use Vercel's auto-scaling
   - Implement request queuing
   - Monitor API response times

## Rollback Procedure

If deployment causes issues:

\`\`\`bash
# Revert to previous version
vercel rollback

# Or redeploy specific commit
git revert HEAD
git push origin main
\`\`\`

## Support and Monitoring Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **OpenAI API Status:** https://status.openai.com
- **Twilio Status:** https://status.twilio.com
- **GitHub Repo:** Your GitHub URL
\`\`\`
