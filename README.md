# Tailwind CSS Custom Animation Generator

A high-performance, SEO-friendly web tool built with Next.js 14 (App Router) and Tailwind CSS for generating custom CSS animations with a visual preview.

## Features

- 🎨 **Visual Preview Box** - See your animations in real-time
- 🎛️ **Interactive Controls** - Adjust duration, delay, iteration, and transform properties (Translate, Rotate, Scale)
- 📋 **Copy Code** - One-click copy for Tailwind config, CSS keyframes, and CSS classes
- 🔍 **SEO Optimized** - Comprehensive metadata and semantic HTML
- 📚 **How-to Guide** - 800-word comprehensive guide on using custom animations in Tailwind CSS
- 🎨 **Modern UI** - Built with Shadcn/UI components and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with SEO metadata
│   ├── page.tsx         # Main animation generator page
│   └── globals.css      # Global styles and Tailwind directives
├── components/
│   └── ui/              # Shadcn/UI components
│       ├── button.tsx
│       ├── card.tsx
│       └── slider.tsx
├── lib/
│   └── utils.ts         # Utility functions
├── tailwind.config.ts   # Tailwind configuration
└── package.json
```

## Usage

1. Use the sliders to adjust animation parameters:
   - **Duration**: How long the animation takes (100ms - 5000ms)
   - **Delay**: When the animation starts (0ms - 2000ms)
   - **Iteration**: How many times it repeats (0 = infinite)
   - **Translate X/Y**: Horizontal and vertical movement
   - **Rotate**: Rotation in degrees
   - **Scale**: Size transformation (50% - 200%)

2. Watch the preview box update in real-time

3. Click "Copy" buttons to copy the generated code:
   - Tailwind config extension
   - CSS keyframes
   - CSS classes

4. Paste the code into your project

## Built With

- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn/UI](https://ui.shadcn.com/) - Re-usable components
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## License

MIT
