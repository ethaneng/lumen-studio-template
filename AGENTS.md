# AGENTS.md - Development Guidelines

## Build/Test Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm run lint` - Run ESLint with Next.js strict config (flat config)
- `npm start` - Start production server
- `npm run generate-blur` - Generate blur data URLs for images
- No test framework configured yet

## Project Structure
- **Features-based**: `app/features/[feature]/components/` - organized by business domains
- **Shared**: `app/shared/` - reusable components, utils, types, hooks
- **Import paths**: Use relative imports within features, absolute for shared resources
- **Index files**: Export components through index.ts for clean imports

## Code Style Guidelines
- **TypeScript**: Strict mode enabled, use proper types from `shared/types`
- **Components**: Organize in feature folders, use React Server Components by default
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Fonts**: Cormorant Garamond for headings (`font-cormorant-garamond`), Lato for body text (`font-lato`)
- **Colors**: Use CSS variables (primary, foreground, etc.) or COLORS constants from `shared/utils/colors`
- **Icons**: Use lucide-react for consistent iconography
- **UI Components**: Use shadcn/ui components from `shared/components/ui`
- **Animation Libraries**: Use GSAP for animations, Lenis for smooth scrolling, Swiper for carousels
- **Constants**: Store in `shared/utils/constants.ts`, import via index files
- **Forms**: Console.log form data instead of sending emails
- **Responsive**: Design for desktop/tablet/mobile, consider scalability for CMS integration