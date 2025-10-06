# 🚀 Dafon CV App

> **Create your Perfect CV with AI** - Transform your professional experience into unique and personalized CVs using artificial intelligence.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16.3-2D3748)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)](https://tailwindcss.com/)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Configuration](#-configuration)
- [Magic Link Authentication](#-magic-link-authentication)
- [Protection Middleware](#-protection-middleware)
- [AI CV Generation](#-ai-cv-generation)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

**Dafon CV App** is a modern and intelligent application for creating professional CVs. Using artificial intelligence, the platform automatically adapts CV content for each specific job, maximizing the candidate's chances of success.

### Key Features

- 🤖 **Integrated AI**: Automatic generation of optimized content
- 🔐 **Secure Authentication**: Magic link system without passwords
- 🌍 **Multilingual**: Full support for Portuguese and English
- 📱 **Responsive**: Interface adaptable to all devices
- ⚡ **Performance**: Intelligent cache and advanced optimizations

## ✨ Features

### 🔑 Authentication System
- **Magic Link Authentication**: Passwordless login via email
- **Session Management**: Secure tokens with automatic expiration
- **Route Protection**: Intelligent middleware for restricted areas
- **Session Cache**: Optimized performance with in-memory cache

### 🤖 AI CV Generation
- **Multiple Sections**: Introduction, skills, education, courses
- **Smart Personalization**: Automatic adaptation for each job
- **Rigorous Validation**: Data validated with Zod
- **Intuitive Interface**: Guided forms by sections

### 🎨 Interface and UX
- **Modern Design**: Clean and professional interface
- **Accessible Components**: Based on Radix UI
- **Smooth Animations**: Transitions and visual feedback
- **Responsive Theme**: Automatic adaptation for mobile

## 🏗️ Architecture

### Technology Stack

```
Frontend: Next.js 15.5.2 + React 19.1.0 + TypeScript
Backend: Next.js API Routes + External Golang Backend
Database: MySQL + Prisma ORM
UI: Tailwind CSS + Radix UI
Auth: Custom System with Magic Links
i18n: next-intl (PT/EN)
Validation: Zod
Build: Turbopack
```

### Data Flow

```mermaid
graph TD
    A[Client] --> B[Next.js Frontend]
    B --> C[Auth Middleware]
    C --> D[API Routes]
    D --> E[Prisma ORM]
    E --> F[MySQL Database]
    D --> G[Golang AI Backend]
    G --> H[AI Services]
```

## 🛠️ Technologies

### Core
- **Next.js 15.5.2**: React framework with App Router
- **React 19.1.0**: User interface library
- **TypeScript 5.0**: Static typing
- **Turbopack**: High-performance build tool

### Backend & Database
- **Prisma 6.16.3**: Modern ORM for TypeScript
- **MySQL**: Relational database
- **Next.js API Routes**: Serverless endpoints

### UI & Styling
- **Tailwind CSS 4.0**: Utility-first CSS framework
- **Radix UI**: Accessible components
- **Lucide React**: Modern icons
- **Class Variance Authority**: Component variants

### Authentication & Security
- **Custom System**: Passwordless magic links
- **Zod**: Schema validation
- **Secure Cookies**: HttpOnly, SameSite, Secure

### Internationalization
- **next-intl**: Complete internationalization
- **PT/EN Support**: Contextual translations

## ⚙️ Configuration

### Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm/yarn/pnpm

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/dafon_cv"

# AI Backend
BACKEND_API_URL="https://your-golang-backend.com"
BACKEND_APIKEY="your-api-key"

# Authentication
SESSION_TOKEN_EXPIRATION_MINUTES=
MAGIC_LINK_TOKEN_EXPIRATION_MINUTES=
SESSION_CHECK_INTERVAL_MINUTES=
SESSION_COOKIE_NAME=

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secure-secret"

# Environment
NODE_ENV="development"
```

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/dafon-cv-app.git
cd dafon-cv-app

# Install dependencies
npm install

# Configure the database
npx prisma generate
npx prisma db push

# Run the project
npm run dev
```

## 🔐 Magic Link Authentication

### How It Works

The system uses **magic links** for passwordless authentication, providing greater security and better user experience.

#### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API Auth
    participant E as Email Service
    participant D as Database

    U->>F: Enters email
    F->>A: POST /api/auth/magic-link
    A->>D: Creates temporary session
    A->>E: Sends magic link
    E->>U: Email with link
    U->>A: Clicks link
    A->>D: Validates token
    A->>D: Creates permanent session
    A->>F: Redirects to dashboard
```

#### Technical Implementation

**1. Magic Link Generation**
```typescript
// app/api/auth/magic-link/route.ts
export async function POST(request: NextRequest) {
  const { email } = await request.json()
  
  // Generate unique token
  const token = randomBytes(32).toString('hex')
  
  // Create temporary session (30 min)
  await prisma.sessions.create({
    data: {
      token,
      user_id: user.id,
      expires_at: calculateExpirationDate(30)
    }
  })
  
  // Send email with magic link
  await sendMagicLinkEmail(email, token)
}
```

**2. Token Verification**
```typescript
// app/api/auth/magic-link/verify/route.ts
export async function GET(request: NextRequest) {
  const { token, email } = searchParams
  
  // Validate token and expiration
  const session = await prisma.sessions.findUnique({
    where: { token },
    include: { users: true }
  })
  
  if (isTokenExpired(session.expires_at)) {
    return redirect('/token-error?type=expired')
  }
  
  // Create permanent session
  const sessionToken = await createSessionToken(session.user_id)
  setCookie(sessionToken)
}
```

### Magic Link Advantages

- ✅ **No Passwords**: Eliminates leakage risks
- ✅ **Security**: Unique and temporary tokens
- ✅ **Simplified UX**: One-click login
- ✅ **Audit**: Complete access tracking

## 🛡️ Protection Middleware

### Implementation

The middleware protects sensitive routes by checking the existence and validity of session tokens.

```typescript
// middleware.ts
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Protected routes
  const protectedRoutes = ['/dashboard', '/profile', '/settings', '/generate-cv']
  const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route))
  
  if (isProtectedRoute) {
    const sessionToken = request.cookies.get(AUTH_CONFIG.SESSION_COOKIE_NAME)
    
    if (!sessionToken) {
      // Redirect to login
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
  
  // Apply internationalization
  return intlMiddleware(request)
}
```

### Session Cache

Intelligent in-memory cache system to optimize performance:

```typescript
// lib/session-cache.ts
class SessionCache {
  private cache = new Map<string, CachedSession>()
  private readonly TTL = 5 * 60 * 1000 // 5 minutes

  set(token: string, session: CachedSession) {
    this.cache.set(token, session)
    setTimeout(() => this.cache.delete(token), this.TTL)
  }

  get(token: string): CachedSession | null {
    const session = this.cache.get(token)
    return session?.expiresAt < new Date() ? null : session
  }
}
```

### Automatic Cleanup

```typescript
// lib/token-cleanup.ts
export async function cleanupExpiredTokens(): Promise<number> {
  const result = await prisma.sessions.deleteMany({
    where: { expires_at: { lt: new Date() } }
  })
  return result.count
}

// Automatic execution every 5 minutes
setInterval(cleanupExpiredTokens, 5 * 60 * 1000)
```

## 🤖 AI CV Generation

### AI Architecture

The system integrates with a specialized Golang backend for natural language processing to generate optimized content.

#### AI Endpoints

```typescript
// Endpoint structure
/api/generate-intro-ai     // Personal introduction generation
/api/generate-skill-ai     // Skills optimization
/api/generate-academic-ai  // Academic background description
/api/generate-courses-ai   // Course descriptions
/api/generate-task-ai      // Professional task descriptions
```

#### Implementation

```typescript
// app/api/generate-intro-ai/route.ts
export async function POST(request: NextRequest) {
  const { content } = await request.json()
  
  // Input validation
  if (!content?.trim()) {
    return NextResponse.json(
      { success: false, error: 'Content is required' },
      { status: 400 }
    )
  }
  
  // Call to Golang backend
  const response = await fetch(`${BACKEND_API_URL}/generate-intro-ai`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.BACKEND_APIKEY}`,
    },
    body: JSON.stringify({ content: content.trim() })
  })
  
  const data = await response.json()
  
  return NextResponse.json({
    success: true,
    data,
    message: 'Text processed successfully'
  })
}
```

### Generation Flow

```mermaid
graph LR
    A[User] --> B[Form]
    B --> C[Zod Validation]
    C --> D[API Route]
    D --> E[Golang Backend]
    E --> F[AI Model]
    F --> G[Optimized Content]
    G --> H[Frontend]
    H --> I[Preview]
```

### Data Validation

```typescript
// lib/validations.ts
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must have at least 2 characters')
    .max(100, 'Name must have at most 100 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Name must contain only letters and spaces'),
  email: z
    .string()
    .min(1, 'Email is required')
    .max(255, 'Email must have at most 255 characters')
    .pipe(z.email('Invalid email format'))
})
```

## 📁 Project Structure

```
dafon-cv-app/
├── app/                          # App Router (Next.js 13+)
│   ├── [locale]/                 # Internationalized routes
│   │   ├── auth/                 # Authentication pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── dashboard/            # Main dashboard
│   │   └── layout.tsx           # Root layout
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── magic-link/
│   │   │   ├── session/
│   │   │   └── logout/
│   │   ├── generate-*-ai/        # AI endpoints
│   │   └── save-cv/             # CV saving
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── auth/                    # Authentication components
│   ├── features/                # Feature components
│   ├── forms/                   # Forms
│   │   └── sections/            # Form sections
│   ├── layout/                  # Layout components
│   └── ui/                      # Base components (Radix UI)
├── hooks/                       # Custom hooks
├── lib/                         # Utilities and configurations
│   ├── auth-config.ts          # Authentication configurations
│   ├── database.ts             # Prisma configuration
│   ├── session-cache.ts        # Session cache
│   ├── token-cleanup.ts        # Token cleanup
│   ├── validations.ts          # Zod schemas
│   └── utils.ts                # General utilities
├── messages/                    # Translation files
│   ├── en.json                 # English
│   └── pt.json                 # Portuguese
├── prisma/                      # Database schema
│   └── schema.prisma           # Prisma models
├── types/                       # TypeScript definitions
└── middleware.ts               # Protection middleware
```

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Development server with Turbopack

# Build and Production
npm run build        # Optimized build for production
npm run start        # Production server

# Code Quality
npm run lint         # ESLint for code verification

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Sync schema with database
npx prisma studio    # Visual database interface
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configure environment variables
vercel env add DATABASE_URL
vercel env add BACKEND_API_URL
# ... other variables
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Production Variables

```env
NODE_ENV=production
DATABASE_URL=mysql://user:pass@host:3306/db
BACKEND_API_URL=https://api.dafon.com
NEXTAUTH_URL=https://cv.dafon.com
```

## 🤝 Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- **TypeScript**: Strict typing required
- **ESLint**: Follow project configuration
- **Commits**: Use conventional commits
- **Tests**: Add tests for new features

## 📄 License

This project is licensed under **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International** with additional terms.

**⚠️ IMPORTANT**: Before using this software, you MUST:
1. Notify the author via email: dafondeveloper@gmail.com
2. Wait for explicit written permission
3. Report usage as agreed

See the [LICENSE](license) file for more details.

---

**Developed with ❤️ by [Dafon](mailto:dafondeveloper@gmail.com)**
