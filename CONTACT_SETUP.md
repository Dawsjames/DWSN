# Contact Form Setup

This project includes a working contact form that sends emails via Gmail SMTP.

## Setup Instructions

### 1. Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google Account Settings](https://myaccount.google.com/security)
3. Under "Signing in to Google", click "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password (spaces will be removed automatically)

### 2. Environment Variables

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your credentials:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   CONTACT_RECEIVER=your-email@gmail.com  # optional, defaults to GMAIL_USER
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Test Locally

```bash
npm run dev
```

Visit `/contact` page and test the form.

## Vercel Deployment

### 1. Environment Variables in Vercel

In your Vercel project dashboard:

1. Go to Settings → Environment Variables
2. Add these variables:
   - `GMAIL_USER`: your-email@gmail.com
   - `GMAIL_APP_PASSWORD`: your-16-character-app-password
   - `CONTACT_RECEIVER`: your-email@gmail.com (optional)

### 2. Deploy

```bash
# Via Vercel CLI
vercel --prod

# Or via GitHub integration (recommended)
# Push to main branch and Vercel will auto-deploy
```

## Testing

- **Local**: Form should send emails when running `npm run dev`
- **Production**: Test the deployed form to ensure emails arrive
- **Debugging**: Check Vercel Function logs if emails aren't sending

## Security Notes

- Never commit `.env.local` or real credentials to Git
- Use App Passwords (not your main Gmail password)
- Consider rate limiting in production to prevent spam
- Validate input server-side (already implemented)

## Troubleshooting

- **"Authentication failed"**: Check App Password is correct
- **"Network error"**: Verify environment variables are set in Vercel
- **Emails not received**: Check spam folder, verify GMAIL_USER email
