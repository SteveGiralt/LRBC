# Claude AI Developer Guide for LRBC Website

## Project Overview
This is the Lone Rock Bible Church website built with Astro, React, TypeScript, Tailwind CSS, and deployed on Vercel.

## Critical Resources
**Before making any changes, review:**
- [`.claude-lessons-learned.md`](.claude-lessons-learned.md) - Critical mistakes to avoid and deployment best practices

## Project Structure
- `/src/pages/` - Astro pages (routes)
- `/src/components/` - Reusable components (Astro and React)
- `/src/layouts/` - Page layout components
- `/api/` - Python serverless functions for Google Calendar API
- `/lib/` - Python library code for calendar handling

## Key Components
- **EventCard** (React) - Displays upcoming church events from Google Calendar API
- **StructuredData** (Astro) - SEO structured data (JSON-LD)
- **Hero** (Astro) - Main page hero section
- **ContentCard** (Astro) - Reusable content cards with images

## API Integration
The site uses Python serverless functions to fetch events from Google Calendar:
- `/api/main-calendar/` - Main church calendar
- `/api/youth-calendar/` - Youth group calendar

These are proxied in development via `astro.config.mjs` vite server proxy.

## Deployment
- **Platform:** Vercel
- **Branch Strategy:**
  - `master` - Production (auto-deploys to lonerockbiblechurch.com)
  - `seo-changes` - SEO improvements branch
  - Create feature branches for experimental work

## Common Tasks

### Running Locally
```bash
npm run dev          # Development server (usually port 4321)
npm run build        # Production build
npm run preview      # Preview production build
```

### Testing Checklist
Before deploying any changes:
- [ ] Test locally with `npm run dev`
- [ ] Build for production with `npm run build`
- [ ] Check browser console for errors
- [ ] Verify EventCard loads calendar events
- [ ] Ensure CSS loads correctly
- [ ] Test interactive components

### Making Changes
1. Create a feature branch from appropriate base branch
2. Make changes and test locally
3. Build and verify production build
4. Commit with descriptive messages
5. Push and verify on Vercel preview deployment
6. Merge to master only after verifying preview works

## Important Don'ts (from lessons learned)
❌ **Never** add global Content-Type headers in vercel.json
❌ **Never** use `is:inline` on scripts unless absolutely necessary
❌ **Never** change semantic HTML (h1, header, nav) to divs
❌ **Never** push to master without testing locally first
❌ **Never** remove imports that seem unused without testing

## Environment Variables (Vercel)
The following are configured in Vercel for the Python API functions:
- `MAIN_CALENDAR_PROJECT_ID`
- `MAIN_CALENDAR_PRIVATE_KEY_ID`
- `MAIN_CALENDAR_PRIVATE_KEY`
- `MAIN_CALENDAR_CLIENT_EMAIL`
- `MAIN_CALENDAR_CLIENT_ID`
- `MAIN_CALENDAR_CLIENT_X509_CERT_URL`
- (Similar variables for youth calendar)

## Known Issues to Monitor
- Render-blocking resources (Google Fonts) - potential future optimization
- Site uses both `lonerockbiblechurch.com` and `www.lonerockbiblechurch.com` with redirect

## Recovery Strategy
If production breaks:
1. Create a branch to save current state: `git branch broken-state`
2. Reset master to last known good commit
3. Force push to restore production: `git push --force-with-lease origin master`
4. Debug on the branch while production is stable
5. Apply fixes carefully with full testing

## Contact
For questions about the codebase, refer to the commit history or the lessons learned document.
