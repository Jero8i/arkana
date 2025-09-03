# Email Server

Node.js email server for photography contact form using Gmail SMTP.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=your-gmail@gmail.com
EMAIL_TO=recipient@domain.com
```

3. Run server:
```bash
node server.js
```

## Gmail App Password

Generate an App Password in Google Account settings:
Security → 2-Step Verification → App passwords