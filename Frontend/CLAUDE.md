# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Project Architecture

This is a **Next.js 15** application using the App Router architecture focused on AI-powered exam preparation for Rajasthan competitive exams.

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS v4 with custom design system
- **Fonts**: Geist (primary) and Google Fonts (Inter + Noto Sans Devanagari for Hindi)
- **Development**: Turbopack for fast development

### Application Structure
- **Main App**: Single-page landing site for "ClearYourExamWithAI"
- **Target Audience**: Rajasthan government exam candidates (RAS, Police, RTET, etc.)
- **Languages**: Bilingual support (English/Hindi)
- **Design**: Modern landing page with hero, features, exam sections, stats, and CTA

### Key Features Advertised
- AI-generated questions tailored to Rajasthan exam patterns
- Personalized study plans and adaptive learning
- Advanced analytics and performance tracking  
- Bilingual interface (Hindi/English)
- Mobile-first responsive design
- Support for multiple exam types (RAS, Police Constable, RTET, High Court LDC, etc.)

### Custom Design System
The application uses a custom CSS design system in `globals.css`:
- **Brand Colors**: Primary blue (#1E3A8A), warm teal, success green, etc.
- **Custom Components**: `.card`, `.btn` classes with hover effects
- **Typography**: Responsive utilities (`.text-display`, `.text-heading`)
- **Gradients**: `.gradient-bg` for brand styling

### File Structure
- `src/app/layout.tsx` - Root layout with font configuration
- `src/app/page.tsx` - Main landing page component
- `src/app/globals.css` - Custom design system and Tailwind imports
- TypeScript path mapping: `@/*` resolves to `./src/*`