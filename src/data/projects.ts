export type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  year: string;
  url?: string;
  theme: 'lime' | 'violet' | 'orange' | 'blue';
};

export const projects: Project[] = [
  {
    number: '01',
    name: 'Sobha NXT',
    category: 'REAL ESTATE / WEB EXPERIENCE',
    description: 'A polished digital experience for a premium real estate project. Replace this summary with your exact contribution and verified project details.',
    stack: ['Astro', 'SCSS', 'JavaScript'],
    year: 'PROJECT',
    theme: 'lime',
  },
  {
    number: '02',
    name: 'Sobha Hartland',
    category: 'REAL ESTATE / WEBSITE',
    description: 'A responsive property-focused web experience with clear content hierarchy and carefully implemented page sections.',
    stack: ['Astro', 'SCSS', 'JavaScript'],
    year: 'PROJECT',
    theme: 'violet',
  },
  {
    number: '03',
    name: 'Hi-Life Builders',
    category: 'LANDING PAGE / CONSTRUCTION',
    description: 'A landing page concept focused on strong visual hierarchy, responsive layouts, and conversion-oriented content.',
    stack: ['HTML', 'SCSS', 'JavaScript'],
    year: 'PROJECT',
    theme: 'orange',
  },
  {
    number: '04',
    name: 'Acodez',
    category: 'WORDPRESS / THEME DEVELOPMENT',
    description: 'Frontend implementation and theme work. Update this card with the specific pages, components, and contributions you can publicly share.',
    stack: ['WordPress', 'ACF', 'PHP', 'SCSS'],
    year: 'PROJECT',
    theme: 'blue',
  },
];

export const skills = [
  { group: 'CORE FRONTEND', items: ['HTML5', 'CSS3', 'SCSS / Sass', 'JavaScript', 'jQuery', 'Responsive UI'] },
  { group: 'FRAMEWORKS & CMS', items: ['React', 'Next.js', 'Astro', 'WordPress', 'Advanced Custom Fields', 'PHP templates'] },
  { group: 'MOTION & INTERACTION', items: ['GSAP', 'ScrollTrigger', 'ScrollSmoother', 'Swiper.js', 'Slick', 'Masonry'] },
  { group: 'QUALITY & WORKFLOW', items: ['Git / GitHub', 'Accessibility fundamentals', 'SEO fundamentals', 'Image optimization', 'Core Web Vitals'] },
];

export const services = [
  { number: '01', title: 'Frontend development', detail: 'Turning design files into responsive, maintainable web experiences.' },
  { number: '02', title: 'Interactive UI & motion', detail: 'Adding purposeful animation and interactions without sacrificing usability.' },
  { number: '03', title: 'WordPress development', detail: 'Building flexible themes, templates, and ACF-powered page sections.' },
  { number: '04', title: 'Performance & polish', detail: 'Improving responsive behavior, loading, accessibility, and implementation quality.' },
];
