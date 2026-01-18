"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, Github, MessageSquare } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  const [duration, setDuration] = useState([1000]);
  const [delay, setDelay] = useState([0]);
  const [iteration, setIteration] = useState([1]);
  const [translateX, setTranslateX] = useState([0]);
  const [translateY, setTranslateY] = useState([0]);
  const [rotate, setRotate] = useState([0]);
  const [scale, setScale] = useState([100]);
  const [copied, setCopied] = useState(false);

  // Generate animation keyframes CSS
  const generateKeyframes = () => {
    const translateXValue = translateX[0];
    const translateYValue = translateY[0];
    const rotateValue = rotate[0];
    const scaleValue = scale[0] / 100;

    return `@keyframes custom-animation {
  0% {
    transform: translate(0px, 0px) rotate(0deg) scale(1);
  }
  100% {
    transform: translate(${translateXValue}px, ${translateYValue}px) rotate(${rotateValue}deg) scale(${scaleValue});
  }
}`;
  };

  // Generate Tailwind config extension
  const generateTailwindConfig = () => {
    const translateXValue = translateX[0];
    const translateYValue = translateY[0];
    const rotateValue = rotate[0];
    const scaleValue = scale[0] / 100;
    const iterationValue = iteration[0] === 0 ? 'infinite' : iteration[0];

    return `module.exports = {
  theme: {
    extend: {
      keyframes: {
        'custom-animation': {
          '0%': {
            transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
          },
          '100%': {
            transform: 'translate(${translateXValue}px, ${translateYValue}px) rotate(${rotateValue}deg) scale(${scaleValue})',
          },
        },
      },
      animation: {
        'custom-animation': 'custom-animation ${duration[0]}ms ease-in-out ${delay[0]}ms ${iterationValue}',
      },
    },
  },
}`;
  };

  // Generate CSS classes
  const generateCSSClasses = () => {
    const durationClass = `duration-[${duration[0]}ms]`;
    const delayClass = `delay-[${delay[0]}ms]`;
    const iterationClass = iteration[0] === 0 ? 'animate-infinite' : `animate-[${iteration[0]}]`;
    
    return `className="animate-custom-animation ${durationClass} ${delayClass} ${iterationClass}"`;
  };

  // Copy code to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate inline styles for preview
  const previewStyle: React.CSSProperties = {
    animation: `custom-animation ${duration[0]}ms ease-in-out ${delay[0]}ms ${iteration[0] === 0 ? 'infinite' : iteration[0]}`,
    transform: `translate(${translateX[0]}px, ${translateY[0]}px) rotate(${rotate[0]}deg) scale(${scale[0] / 100})`,
  };

  // Inject keyframes into document
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = generateKeyframes();
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [translateX, translateY, rotate, scale]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tailwind CSS Custom Animation Generator
              </h1>
              <p className="text-muted-foreground mt-2">
                Create beautiful custom animations with live preview and export ready-to-use code
              </p>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="flex items-center gap-2"
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View on GitHub"
                >
                  <Github className="h-4 w-4" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="flex items-center gap-2"
              >
                <a
                  href="mailto:feedback@tailwind-animate.com?subject=Feedback%20for%20Tailwind%20Animate"
                  aria-label="Send feedback"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Feedback</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Box */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>See your animation in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center overflow-hidden">
                <div
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-lg"
                  style={previewStyle}
                />
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Animation Controls</CardTitle>
              <CardDescription>Adjust the animation parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Duration */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Duration</label>
                  <span className="text-sm text-muted-foreground">{duration[0]}ms</span>
                </div>
                <Slider
                  value={duration}
                  onValueChange={setDuration}
                  min={100}
                  max={5000}
                  step={100}
                />
              </div>

              {/* Delay */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Delay</label>
                  <span className="text-sm text-muted-foreground">{delay[0]}ms</span>
                </div>
                <Slider
                  value={delay}
                  onValueChange={setDelay}
                  min={0}
                  max={2000}
                  step={100}
                />
              </div>

              {/* Iteration */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Iteration</label>
                  <span className="text-sm text-muted-foreground">
                    {iteration[0] === 0 ? 'Infinite' : iteration[0]}
                  </span>
                </div>
                <Slider
                  value={iteration}
                  onValueChange={setIteration}
                  min={0}
                  max={10}
                  step={1}
                />
              </div>

              {/* Transform: Translate X */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Translate X</label>
                  <span className="text-sm text-muted-foreground">{translateX[0]}px</span>
                </div>
                <Slider
                  value={translateX}
                  onValueChange={setTranslateX}
                  min={-200}
                  max={200}
                  step={5}
                />
              </div>

              {/* Transform: Translate Y */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Translate Y</label>
                  <span className="text-sm text-muted-foreground">{translateY[0]}px</span>
                </div>
                <Slider
                  value={translateY}
                  onValueChange={setTranslateY}
                  min={-200}
                  max={200}
                  step={5}
                />
              </div>

              {/* Transform: Rotate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Rotate</label>
                  <span className="text-sm text-muted-foreground">{rotate[0]}°</span>
                </div>
                <Slider
                  value={rotate}
                  onValueChange={setRotate}
                  min={-360}
                  max={360}
                  step={5}
                />
              </div>

              {/* Transform: Scale */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Scale</label>
                  <span className="text-sm text-muted-foreground">{scale[0]}%</span>
                </div>
                <Slider
                  value={scale}
                  onValueChange={setScale}
                  min={50}
                  max={200}
                  step={5}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Code Output Section */}
        <div className="mt-8 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Code</CardTitle>
              <CardDescription>Copy the code below to use in your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tailwind Config */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold">tailwind.config.js Extension</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generateTailwindConfig())}
                  >
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
                  <code>{generateTailwindConfig()}</code>
                </pre>
              </div>

              {/* CSS Keyframes */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold">CSS Keyframes</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generateKeyframes())}
                  >
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
                  <code>{generateKeyframes()}</code>
                </pre>
              </div>

              {/* CSS Classes */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold">CSS Classes</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generateCSSClasses())}
                  >
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
                  <code>{generateCSSClasses()}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How-to Guide Section */}
        <section className="mt-12 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">How to Use Custom Animations in Tailwind CSS</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <article className="space-y-6 text-slate-700 dark:text-slate-300">
                <p className="text-lg leading-relaxed">
                  Creating custom animations in Tailwind CSS can elevate your web projects with smooth, professional transitions and effects. This comprehensive guide will walk you through everything you need to know about implementing custom animations using Tailwind CSS, from basic setup to advanced techniques.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                  Understanding Tailwind CSS Animations
                </h2>
                <p className="leading-relaxed">
                  Tailwind CSS comes with several built-in animations, but sometimes you need custom animations that perfectly match your design vision. Custom animations in Tailwind are created using CSS keyframes, which define the animation's behavior at different points in time. The framework allows you to extend the default theme with your own animation definitions, giving you complete control over timing, easing, and transformations.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                  Setting Up Your Tailwind Configuration
                </h2>
                <p className="leading-relaxed">
                  To create custom animations, you'll need to modify your <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">tailwind.config.js</code> file. This file is where you extend Tailwind's default theme with your custom keyframes and animation utilities. Start by locating your configuration file in the root of your project. If you don't have one, create it using the Tailwind CLI or manually.
                </p>
                <p className="leading-relaxed">
                  The configuration structure follows a specific pattern: you define keyframes in the <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">theme.extend.keyframes</code> section, and then reference those keyframes in the <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">theme.extend.animation</code> section. This separation allows you to reuse keyframes across multiple animations with different timing and easing functions.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                  Creating Keyframes
                </h2>
                <p className="leading-relaxed">
                  Keyframes are the foundation of CSS animations. They define what happens at specific points during the animation timeline, typically expressed as percentages (0% to 100%) or using the keywords "from" and "to" for simple two-state animations. In Tailwind, you define keyframes as objects where each key represents a point in the animation, and the value contains the CSS properties to apply at that point.
                </p>
                <p className="leading-relaxed">
                  For example, a fade-in animation might start at 0% opacity and end at 100% opacity. A slide animation might begin with a translateX value of -100% and end at 0%. The beauty of keyframes is their flexibility—you can define as many intermediate steps as needed, creating complex, multi-stage animations that bring your UI to life.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                  Configuring Animation Properties
                </h2>
                <p className="leading-relaxed">
                  Once you've defined your keyframes, you need to configure the animation properties. These include duration (how long the animation takes), delay (when it starts), iteration count (how many times it repeats), direction (normal or reverse), fill mode (what happens before and after), and timing function (easing). Tailwind allows you to specify these properties in a shorthand format within your animation definition.
                </p>
                <p className="leading-relaxed">
                  Duration is typically specified in milliseconds or seconds. Common values range from 100ms for quick micro-interactions to several seconds for dramatic entrances. Delay is useful for creating staggered animations where multiple elements animate in sequence. The iteration count can be a number or "infinite" for continuous animations. Timing functions control the acceleration and deceleration, with options like "ease-in-out," "ease-in," "ease-out," or custom cubic-bezier functions.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                  Transform Properties Explained
                </h2>
                <p className="leading-relaxed">
                  Transform properties are powerful tools for creating movement and visual effects. The translate functions move elements along the X and Y axes, measured in pixels, percentages, or other CSS units. Positive X values move right, negative move left. Positive Y values move down, negative move up. These are perfect for slide-in effects, hover states, and parallax scrolling elements.
                </p>
                <p className="leading-relaxed">
                  Rotation transforms elements around a point, specified in degrees. Positive values rotate clockwise, negative counterclockwise. You can rotate full circles (360 degrees) or partial turns. Scale transforms resize elements, with 1 being the original size, values greater than 1 enlarging, and values less than 1 shrinking. Combining multiple transforms in a single animation creates complex, dynamic effects that can make your interface feel more interactive and polished.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                  Applying Animations to Elements
                </h2>
                <p className="leading-relaxed">
                  After configuring your animations in the Tailwind config, you apply them using utility classes. The basic pattern is <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">animate-[animation-name]</code>, where "animation-name" matches what you defined in your config. You can combine this with duration utilities like <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">duration-300</code>, delay utilities, and iteration utilities.
                </p>
                <p className="leading-relaxed">
                  For more control, Tailwind supports arbitrary values using square brackets. This allows you to specify exact values without pre-defining them in your config. For example, <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">animate-[custom-animation_1s_ease-in-out_0.5s_infinite]</code> applies a custom animation with specific timing directly in your HTML. This flexibility is particularly useful during development when you're experimenting with different values.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                  Best Practices for Performance
                </h2>
                <p className="leading-relaxed">
                  Performance is crucial when implementing animations. Use transform and opacity properties whenever possible, as these are GPU-accelerated and don't trigger expensive layout recalculations. Avoid animating properties like width, height, top, or left, which cause reflows and repaints. The browser can optimize transform and opacity animations by compositing them on separate layers.
                </p>
                <p className="leading-relaxed">
                  Keep animation durations reasonable—typically between 200ms and 500ms for most interactions. Longer animations can feel sluggish, while very short ones might be imperceptible. Consider your users' preferences by respecting the <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">prefers-reduced-motion</code> media query, which allows users with motion sensitivity to opt out of animations. Tailwind provides utilities for this, ensuring your animations are accessible to everyone.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                  Common Animation Patterns
                </h2>
                <p className="leading-relaxed">
                  Several animation patterns have become standard in modern web design. Fade-in animations are perfect for content that appears on scroll or after page load. Slide animations work well for navigation menus, modals, and card reveals. Bounce and pulse effects draw attention to important elements. Scale animations create satisfying hover states and button interactions.
                </p>
                <p className="leading-relaxed">
                  Staggered animations, where multiple elements animate in sequence with slight delays, create a polished, professional feel. This is commonly used in lists, grids, and card layouts. You can achieve this by applying different delay values to sibling elements, either manually or programmatically. The result is a choreographed sequence that guides the user's eye and creates visual hierarchy.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                  Troubleshooting Common Issues
                </h2>
                <p className="leading-relaxed">
                  If your animations aren't working, check several common issues. Ensure your Tailwind config is properly formatted and the build process is including your custom animations. Verify that you're using the correct class names and that Tailwind is processing your files. Sometimes, purging can remove animation classes if they're not detected in your templates—configure your content paths correctly to prevent this.
                </p>
                <p className="leading-relaxed">
                  Browser compatibility is generally excellent for CSS animations, but test across different browsers and devices. Some older browsers may not support certain transform properties or animation features. Use progressive enhancement—ensure your content is accessible without animations, then layer on the visual enhancements. This approach ensures a good experience for all users regardless of their browser capabilities.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
                  Advanced Techniques
                </h2>
                <p className="leading-relaxed">
                  Once you're comfortable with basic animations, explore advanced techniques. Use CSS variables (custom properties) to make animations dynamic and controllable via JavaScript. Combine multiple animations using comma-separated values. Create animation sequences by chaining keyframes or using animation-delay strategically. Use the animation-fill-mode property to control how elements appear before and after animation.
                </p>
                <p className="leading-relaxed">
                  For complex interactions, consider using JavaScript to trigger animations based on scroll position, user interaction, or state changes. Libraries like Framer Motion or GSAP can complement Tailwind animations for more sophisticated effects. However, for most use cases, Tailwind's built-in animation system combined with custom keyframes provides all the power you need to create engaging, performant animations that enhance your user experience.
                </p>
              </article>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="mt-12 mb-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about Tailwind CSS custom animations</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">
                      How to add custom keyframes in Tailwind?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 dark:text-slate-300">
                      <p className="leading-relaxed mb-3">
                        To add custom keyframes in Tailwind CSS, you need to extend your <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">tailwind.config.js</code> file. In the <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">theme.extend.keyframes</code> section, define your keyframes as objects where each key represents a point in the animation timeline (typically 0% to 100%).
                      </p>
                      <p className="leading-relaxed mb-3">
                        For example:
                      </p>
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs mb-3">
                        <code>{`module.exports = {
  theme: {
    extend: {
      keyframes: {
        'custom-animation': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
}`}</code>
                      </pre>
                      <p className="leading-relaxed">
                        Then, reference these keyframes in the <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">theme.extend.animation</code> section to create reusable animation utilities.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left">
                      What is the default duration in Tailwind?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 dark:text-slate-300">
                      <p className="leading-relaxed mb-3">
                        Tailwind CSS doesn't set a default duration for animations. However, when you define animations in your config, you specify the duration as part of the animation shorthand property. The default duration utilities in Tailwind range from <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">duration-75</code> (75ms) to <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">duration-1000</code> (1000ms).
                      </p>
                      <p className="leading-relaxed mb-3">
                        Common duration values include:
                      </p>
                      <ul className="list-disc list-inside space-y-1 mb-3 text-sm">
                        <li><code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">duration-150</code> - 150ms (quick micro-interactions)</li>
                        <li><code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">duration-300</code> - 300ms (standard transitions)</li>
                        <li><code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">duration-500</code> - 500ms (moderate animations)</li>
                        <li><code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">duration-1000</code> - 1000ms (slow, dramatic animations)</li>
                      </ul>
                      <p className="leading-relaxed">
                        For custom animations, you can specify any duration value directly in your animation definition, such as <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">'custom-animation': 'custom-keyframe 1s ease-in-out'</code>.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left">
                      How do I loop a Tailwind animation infinitely?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 dark:text-slate-300">
                      <p className="leading-relaxed mb-3">
                        To loop a Tailwind animation infinitely, you can set the iteration count to "infinite" in your animation definition. In your <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">tailwind.config.js</code>, add <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">infinite</code> as the last value in your animation shorthand.
                      </p>
                      <p className="leading-relaxed mb-3">
                        Example:
                      </p>
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs mb-3">
                        <code>{`animation: {
  'spin-slow': 'spin 3s linear infinite',
  'bounce-infinite': 'bounce 1s ease-in-out infinite',
}`}</code>
                      </pre>
                      <p className="leading-relaxed">
                        You can also use arbitrary values directly in your HTML: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">animate-[spin_3s_linear_infinite]</code>. Alternatively, use the iteration count utility classes or set iteration to 0 in this generator tool to create infinite animations.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left">
                      Can I use custom easing functions in Tailwind animations?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 dark:text-slate-300">
                      <p className="leading-relaxed mb-3">
                        Yes! Tailwind CSS supports custom easing functions in animations. You can use standard CSS easing keywords like <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">ease-in</code>, <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">ease-out</code>, <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">ease-in-out</code>, <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">linear</code>, or custom cubic-bezier functions.
                      </p>
                      <p className="leading-relaxed mb-3">
                        In your animation definition:
                      </p>
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs mb-3">
                        <code>{`animation: {
  'custom-ease': 'custom-keyframe 1s cubic-bezier(0.4, 0, 0.2, 1)',
}`}</code>
                      </pre>
                      <p className="leading-relaxed">
                        You can also extend Tailwind's easing theme in your config to create reusable custom easing functions that work across your entire project, making it easier to maintain consistent animation timing throughout your application.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left">
                      How do I combine multiple transforms in a Tailwind animation?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 dark:text-slate-300">
                      <p className="leading-relaxed mb-3">
                        You can combine multiple CSS transform properties in a single animation by including them all in your keyframe definition. Tailwind allows you to specify translate, rotate, scale, and skew transforms together.
                      </p>
                      <p className="leading-relaxed mb-3">
                        Example combining multiple transforms:
                      </p>
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs mb-3">
                        <code>{`keyframes: {
  'slide-rotate': {
    '0%': {
      transform: 'translateX(-100px) rotate(0deg) scale(1)',
    },
    '100%': {
      transform: 'translateX(0) rotate(360deg) scale(1.2)',
    },
  },
}`}</code>
                      </pre>
                      <p className="leading-relaxed">
                        This tool's generator allows you to adjust translate X/Y, rotate, and scale simultaneously, and you can copy the generated keyframes directly into your Tailwind config. The transforms are applied in the order they appear in the transform property.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-left">
                      Are Tailwind custom animations compatible with React and Next.js?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 dark:text-slate-300">
                      <p className="leading-relaxed mb-3">
                        Absolutely! Tailwind CSS custom animations work seamlessly with React and Next.js. Since Tailwind CSS is framework-agnostic and compiles to regular CSS, your custom animations will work in any React component or Next.js page.
                      </p>
                      <p className="leading-relaxed mb-3">
                        In Next.js, simply configure your <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">tailwind.config.js</code> in the root directory and your custom animations will be available throughout your application. You can use them directly in JSX className attributes.
                      </p>
                      <p className="leading-relaxed">
                        Example in a React component: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">&lt;div className="animate-custom-animation"&gt;Content&lt;/div&gt;</code>. The animations compile during the build process and work exactly like standard Tailwind utility classes.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 Tailwind CSS Custom Animation Generator. Built with Next.js 14 and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
