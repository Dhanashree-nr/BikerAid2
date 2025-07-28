# BikerAid - Emergency Response System for Bikers

## Overview

BikerAid is a modern web application that provides an emergency response system designed specifically for motorcycle riders. The application allows bikers to register their emergency information and receive a unique QR code that can be printed and attached to their helmets. In case of an accident, first responders can scan the QR code to instantly access critical medical information, potentially saving lives through faster, more informed emergency care.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)

✓ Updated founder information with real social media links and contact details
✓ Removed placeholder testimonials to show only authentic user feedback  
✓ Added testimonial submission page for real user stories
✓ Implemented real-time registered biker count display
✓ Enhanced navigation with "Share Story" link for testimonials
✓ Updated footer with founder's actual social media profiles

### Migration to Replit (January 2025)
✓ Successfully migrated from Replit agent to standard Replit environment
✓ Set up PostgreSQL database with proper connection and schema
✓ Fixed file upload size limits for profile pictures (increased to 50MB)
✓ Added user login system for existing bikers to access their accounts
✓ Created dashboard page for users to view and update their information
✓ Integrated QR code viewing and downloading in user dashboard
✓ Enhanced navigation with login and registration options
✓ All core functionality working: registration, profile viewing, testimonials

### User Authentication System (January 2025)
✓ Implemented secure user authentication with email/password system
✓ Fixed critical security issue - login now requires both email AND password verification
✓ Added authentication requirement for biker registration
✓ Created proper login flow that redirects to user dashboard after authentication
✓ Fixed QR code profile viewing with separate endpoint for emergency access
✓ Updated navigation to guide users through signup → registration flow
✓ Enhanced security by requiring account creation before emergency info registration
✓ Updated home page "Register Now" button to redirect to login page for proper user flow

## System Architecture

### Full-Stack Architecture
The application follows a monorepo structure with a clear separation between client-side and server-side code:

- **Frontend**: React-based single-page application built with Vite
- **Backend**: Express.js REST API server
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with Shadcn/ui component library
- **Deployment**: Designed for Replit hosting with development and production configurations

### Directory Structure
```
├── client/           # Frontend React application
├── server/           # Backend Express API
├── shared/           # Shared schema and types
├── migrations/       # Database migration files
└── attached_assets/  # Project requirements and assets
```

## Key Components

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Wouter** for lightweight client-side routing
- **React Query (TanStack Query)** for server state management
- **React Hook Form** with Zod validation for form handling
- **Shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling

### Backend Architecture
- **Express.js** REST API with TypeScript
- **Drizzle ORM** for database operations with PostgreSQL
- **In-memory storage** with interface design for easy database migration
- **RESTful endpoints** for bikers, testimonials, and profile viewing

### Database Schema
The application uses three main tables:
- **users**: Basic user authentication (prepared for future use)
- **bikers**: Complete biker profiles with medical information
- **testimonials**: User testimonials and reviews

### Key Features
1. **Biker Registration**: Comprehensive form for medical and contact information
2. **QR Code Generation**: Automatic QR code creation linking to emergency profile
3. **Emergency Profile Viewer**: Mobile-optimized display of critical information
4. **Testimonials System**: Real stories showcasing the system's effectiveness

## Data Flow

### Registration Flow
1. User fills out comprehensive registration form
2. Backend validates data using Zod schemas
3. System generates unique QR code URL
4. Biker profile is stored in database
5. QR code is displayed for download and printing

### Emergency Access Flow
1. First responder scans QR code on helmet
2. QR code redirects to emergency profile page
3. Critical medical information is displayed instantly
4. Emergency contacts are accessible with click-to-call functionality

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **zod**: Runtime type validation
- **qrcode**: QR code generation
- **wouter**: Lightweight routing

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant handling
- **lucide-react**: Icon library

## Deployment Strategy

### Development Environment
- **Vite** for fast development server and hot module replacement
- **TSX** for running TypeScript server code in development
- **Concurrent development** of frontend and backend with proxy configuration

### Production Build
- **Vite build** for optimized frontend bundle
- **ESBuild** for server-side TypeScript compilation
- **Static file serving** from Express for production deployment

### Environment Configuration
- **Replit-optimized** with specialized plugins and error handling
- **Environment variables** for database connection and deployment URLs
- **CORS and security** configurations for production deployment

### Database Strategy
- **Drizzle migrations** for schema management
- **PostgreSQL** as the primary database with connection pooling
- **Development flexibility** with in-memory storage fallback for testing

The application is designed to be easily deployable on Replit while maintaining the flexibility to migrate to other hosting platforms. The modular architecture allows for easy scaling and feature additions as the platform grows.