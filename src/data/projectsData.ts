// ── Somfy images ──────────────────────────────────────────────────────────
import somfyScreen01 from '../img/Somfy Screens/somfy-screen-01.png'
import somfyScreen02 from '../img/Somfy Screens/somfy-screen-02.png'
import somfyScreen03 from '../img/Somfy Screens/somfy-screen-03.png'
import somfyScreen04 from '../img/Somfy Screens/somfy-screen-04.png'
import somfyScreen05 from '../img/Somfy Screens/somfy-screen-05.png'
import somfyScreen06 from '../img/Somfy Screens/somfy-screen-06.png'

// ── 360Learning images ─────────────────────────────────────────────────────
import screen360_01 from '../img/360Learning/360-screen-01.png'
import screen360_02 from '../img/360Learning/360-screen-02.png'
import screen360_03 from '../img/360Learning/360-screen-03.png'
import screen360_04 from '../img/360Learning/360-screen-04.png'
import screen360_05 from '../img/360Learning/360-screen-05.png'
import screen360_06 from '../img/360Learning/360-screen-06.png'

// ── Vibe images ────────────────────────────────────────────────────────────
import vibeScreen01 from '../img/Vibe Screens/vibe-screen-01.png'
import vibeScreen02 from '../img/Vibe Screens/vibe-screen-02.png'
import vibeScreen03 from '../img/Vibe Screens/vibe-screen-03.png'
import vibeScreen04 from '../img/Vibe Screens/vibe-screen-04.png'
import vibeScreen05 from '../img/Vibe Screens/vibe-screen-05.png'
import vibeScreen06 from '../img/Vibe Screens/vibe-screen-06.png'
import vibeCampaignsVideo from '../img/Vibe Screens/vibe_campaigns.mp4'

// ── Zestia images ─────────────────────────────────────────────────────────
import zestiaScreen01 from '../img/Zestia Screens/zestia-screen-01.png'
import zestiaScreen02 from '../img/Zestia Screens/zestia-screen-02.png'
import zestiaScreen03 from '../img/Zestia Screens/zestia-screen-03.png'

// ── AXA images ─────────────────────────────────────────────────────────────
import axaScreen01 from '../img/AXA/axa-screen-01.png'
import axaScreen02 from '../img/AXA/axa-screen-02.png'
import axaScreen03 from '../img/AXA/axa-screen-03.png'
import axaScreen04 from '../img/AXA/axa-screen-04.png'
import axaScreen05 from '../img/AXA/axa-screen-05.png'

export type ProjectAccent = 'amber' | 'sky' | 'violet' | 'orange' | 'rose'

export interface ProjectSection {
  title: string
  body: string[]
  images?: string[]
  video?: string
}

export interface ProjectData {
  slug: string
  company: string
  tag: string
  title: string
  description: string
  year: string
  tags: string[]
  outcome: string
  accent: ProjectAccent
  index: string
  coverImage?: string
  // Detail page
  category: string
  period: string
  intro: string[]
  detailTags: string[]
  sections: ProjectSection[]
  nextProject?: string
}

export const accentStyles: Record<ProjectAccent, {
  hoverBg: string
  hoverBorder: string
  numColor: string
  tagBg: string
  tagText: string
  arrowHoverBg: string
  arrowHoverBorder: string
  pillBg: string
  pillText: string
  sectionNum: string
  leftBorder: string
  accentHex: string
  cardRgb: string
}> = {
  amber: {
    hoverBg: 'hover:bg-amber-950/40',
    hoverBorder: 'hover:border-amber-500/30',
    numColor: 'text-[#FAB800]',
    tagBg: 'bg-amber-900/30',
    tagText: 'text-[#FAB800]',
    arrowHoverBg: 'group-hover:bg-[#FAB800]',
    arrowHoverBorder: 'group-hover:border-[#FAB800]',
    pillBg: 'bg-amber-900/30',
    pillText: 'text-[#FAB800]',
    sectionNum: 'text-[#FAB800]',
    leftBorder: 'border-l-[#FAB800]',
    accentHex: '#FAB800',
    cardRgb: '250, 184, 0',
  },
  sky: {
    hoverBg: 'hover:bg-blue-950/40',
    hoverBorder: 'hover:border-blue-500/30',
    numColor: 'text-[#2567F4]',
    tagBg: 'bg-blue-950/30',
    tagText: 'text-[#2567F4]',
    arrowHoverBg: 'group-hover:bg-[#2567F4]',
    arrowHoverBorder: 'group-hover:border-[#2567F4]',
    pillBg: 'bg-blue-950/30',
    pillText: 'text-[#2567F4]',
    sectionNum: 'text-[#2567F4]',
    leftBorder: 'border-l-[#2567F4]',
    accentHex: '#2567F4',
    cardRgb: '37, 103, 244',
  },
  violet: {
    hoverBg: 'hover:bg-teal-950/40',
    hoverBorder: 'hover:border-teal-500/30',
    numColor: 'text-[#C87C2F]',
    tagBg: 'bg-teal-950/30',
    tagText: 'text-[#C87C2F]',
    arrowHoverBg: 'group-hover:bg-[#C87C2F]',
    arrowHoverBorder: 'group-hover:border-[#C87C2F]',
    pillBg: 'bg-teal-950/30',
    pillText: 'text-[#C87C2F]',
    sectionNum: 'text-[#C87C2F]',
    leftBorder: 'border-l-[#C87C2F]',
    accentHex: '#C87C2F',
    cardRgb: '0, 46, 53',
  },
  orange: {
    hoverBg: 'hover:bg-indigo-950/40',
    hoverBorder: 'hover:border-indigo-500/30',
    numColor: 'text-[#3B28CC]',
    tagBg: 'bg-indigo-950/30',
    tagText: 'text-[#3B28CC]',
    arrowHoverBg: 'group-hover:bg-[#3B28CC]',
    arrowHoverBorder: 'group-hover:border-[#3B28CC]',
    pillBg: 'bg-indigo-950/30',
    pillText: 'text-[#3B28CC]',
    sectionNum: 'text-[#3B28CC]',
    leftBorder: 'border-l-[#3B28CC]',
    accentHex: '#3B28CC',
    cardRgb: '59, 40, 204',
  },
  rose: {
    hoverBg: 'hover:bg-blue-950/40',
    hoverBorder: 'hover:border-blue-900/30',
    numColor: 'text-[#FF1721]',
    tagBg: 'bg-blue-950/30',
    tagText: 'text-[#FF1721]',
    arrowHoverBg: 'group-hover:bg-[#FF1721]',
    arrowHoverBorder: 'group-hover:border-[#FF1721]',
    pillBg: 'bg-blue-950/30',
    pillText: 'text-[#FF1721]',
    sectionNum: 'text-[#FF1721]',
    leftBorder: 'border-l-[#FF1721]',
    accentHex: '#FF1721',
    cardRgb: '0, 0, 143',
  },
}

export const projects: ProjectData[] = [
  {
    slug: 'somfy',
    company: 'Somfy',
    tag: 'UX + Design System',
    title: 'Bringing one design language to every corner of the product.',
    description:
      "Redesigned core product flows for one of Europe's largest smart home companies. Built a scalable component library used by 6 product teams, cutting design-to-dev handoff time by 40%.",
    year: '2023',
    tags: ['Product Design', 'Design System', 'B2B'],
    outcome: '6 teams unified, 40% faster handoff',
    accent: 'amber',
    index: '01',
    coverImage: somfyScreen01,
    category: 'Smart Home & Building Automation',
    period: 'Nov 2022 – Present',
    intro: [
      'Somfy is a global leader in smart home and building automation, with a focus on products that make homes and buildings simpler, more comfortable, and more efficient.',
      'I have been working with Somfy as a freelance product designer for almost 3 years, across both B2B and B2C experiences. My focus has been on improving dashboards, refining key flows, and maintaining a scalable design system used across teams and products. It is an ongoing collaboration that grows with each new feature.',
    ],
    detailTags: ['Design System', 'Product Design', 'App Design', 'Web Design'],
    sections: [
      {
        title: 'Dashboard & Order Tracking',
        body: [
          'The first goal was to help professional clients see their business data more clearly and track orders without friction.',
          'I redesigned the activity dashboard with a clear view of yearly performance and order activity. Business insights became easier to access at a glance. The new order tracking flow simplified navigation for recurring users, leading to faster browsing and fewer support requests.',
        ],
        images: [somfyScreen01, somfyScreen02],
      },
      {
        title: 'Product Comparator',
        body: [
          'I designed a new product comparison experience with multi-selection and side-by-side evaluation.',
          'This helped installers make decisions with more confidence, while improving catalog navigation and overall product understanding.',
        ],
        images: [somfyScreen03, somfyScreen04],
      },
      {
        title: 'Homepage for Installers & Product Variants',
        body: [
          'The new homepage was designed to be useful from the first interaction, with key actions, quick access tools, and relevant data organized in a clear hierarchy.',
          "I also reworked the product variant tables to simplify technical data and reduce cognitive load. Both areas follow the new design system and scale cleanly across Somfy's full product range.",
        ],
        images: [somfyScreen05, somfyScreen06],
      },
    ],
    nextProject: 'zestia',
  },
  {
    slug: 'zestia',
    company: 'Zestia',
    tag: 'Real Estate SaaS',
    title: 'Designing a full MVP that covers every step of the property buying process.',
    description:
      'Worked directly with the CEO and CTO to design the full MVP from scratch: structure, user flows, and key experiences for brokers and buyers across property search, financing, and document management.',
    year: '2023',
    tags: ['Product Design', 'SaaS Design', 'MVP Design'],
    outcome: 'MVP ready for investors in 6 months',
    accent: 'violet',
    index: '02',
    coverImage: zestiaScreen01,
    category: 'Real Estate SaaS',
    period: '2023 (6 months)',
    intro: [
      'Zestia is a real estate SaaS that brings the full property buying journey into one place: search, financing, and brokerage services, all connected.',
      'I worked directly with the CEO and CTO as a freelance senior product designer, fully remote from Spain. Starting from zero, I designed the full MVP: information architecture, core user flows, and the visual system for each profile type. After 6 months, the product was ready for investor demos and pilot users.',
    ],
    detailTags: ['Design System', 'Product Design', 'SaaS Design', 'MVP Design'],
    sections: [
      {
        title: 'Dashboards & Analytics',
        body: [
          'I designed two dashboard views: one for individual franchise activity, one for multi-franchise global oversight.',
          'Each view was built around role-adaptive interfaces that surface the right data at the right moment. The goal was clear insights at a glance, with data visualisation that stays readable across different user levels.',
        ],
        images: [zestiaScreen01, zestiaScreen02],
      },
      {
        title: 'Core Flows',
        body: [
          'I designed the main MVP flows for property search, financing, and document management, with a focus on reducing friction and making collaboration between brokers and buyers feel natural.',
          'Each journey was mapped end to end, with close attention to the handoff points between profiles. The result was a coherent, scalable experience that made a complex process feel approachable from day one.',
        ],
        images: [zestiaScreen03],
      },
    ],
    nextProject: 'vibe',
  },
  {
    slug: 'vibe',
    company: 'Vibe',
    tag: 'Product Redesign',
    title: 'Rebuilding the core experience for a fast-growing ad-tech platform.',
    description:
      'Took ownership of core product flows, redesigned the campaign creation experience, and built a scalable design system to support the next growth phase. Shipped key features in short, focused sprints across 15 months.',
    year: '2023',
    tags: ['Product Design', 'Adtech', 'Design System'],
    outcome: '15 months, full product overhaul',
    accent: 'orange',
    index: '03',
    coverImage: vibeScreen03,
    category: 'Ad-tech',
    period: 'Jan 2022 – Mar 2023',
    intro: [
      'Vibe is the Google Ads of TV. Any marketer can plan, buy, and air TV ads on major channels in minutes.',
      "I worked with Vibe for 1.5 years as a freelance product designer, fully remote from Spain. The team was small, around 10 people split between Paris and the US. When I joined, an MVP was already in place, and my role was to bring fresh thinking, rework key flows, and build a solid design system for scalability. I shipped new features, improved the campaign creation experience, and helped shape the foundation for Vibe's next growth phase.",
    ],
    detailTags: ['Design System', 'Product Design', 'SaaS Design'],
    sections: [
      {
        title: 'Campaign Dashboard & Creation Flow',
        body: [
          'The first focus was redesigning the full campaign experience, from creation to tracking. We simplified the flow so users could build and manage campaigns faster, without losing clarity or control.',
          'The new dashboard gives a cleaner view of active campaigns and key metrics. Campaign creation was redesigned step by step, with simpler targeting, audience selection, and scheduling.',
        ],
        images: [vibeScreen03],
        video: vibeCampaignsVideo,
      },
      {
        title: 'Campaign Views & Analytics',
        body: [
          'With the creation flow stable, we moved to campaign management views and analytics. The goal was to help users review performance across multiple campaigns and act on insights without switching context.',
          'I designed table views with filters and custom sorting, and a new analytics dashboard built around clarity and comparison. Data should feel actionable, not overwhelming.',
        ],
        images: [vibeScreen01, vibeScreen02, vibeScreen04],
      },
      {
        title: 'User Management & Permissions',
        body: [
          'I also designed the flows for user management, team access, and billing. This made the product easier to scale across different organization types, from independent agencies to large brands.',
          'All components and behaviors were documented in Storybook for clean, consistent handoff.',
        ],
        images: [vibeScreen05, vibeScreen06],
      },
    ],
    nextProject: '360learning',
  },
  {
    slug: '360learning',
    company: '360Learning',
    tag: 'Platform Redesign',
    title: 'Making course creation faster and simpler for 1,700+ enterprise clients.',
    description:
      'Embedded with cross-functional teams to untangle complex authoring flows and bring learner insights to the surface. Reduced course creation time by 30% through strategic information architecture changes and a new component system.',
    year: '2022',
    tags: ['UX Research', 'Platform Design', 'SaaS'],
    outcome: '1,700+ clients, 30% faster course creation',
    accent: 'sky',
    index: '04',
    coverImage: screen360_01,
    category: 'LMS EdTech / Learning & Development',
    period: 'Dec 2018 – Jan 2022',
    intro: [
      '360Learning is a collaborative learning platform that helps companies build and share knowledge from the inside.',
      'I joined in December 2018 and worked there for over 3 years as a Product Designer in the Enterprise squad. Our squad had one PM and two developers, and I was part of a design team of eight, each owning a different product area. My main focus was designing and growing the enterprise suite, while also maintaining the shared design system across all squads.',
    ],
    detailTags: ['Product Design', 'Design System', 'Web Design', 'SaaS Design'],
    sections: [
      {
        title: 'Learning Needs',
        body: [
          'The first feature I worked on was Learning Needs, a key tool for knowledge sharing inside a company. It lets employees express what they want to learn and find colleagues with the right expertise.',
          'When someone submits a learning need, others can upvote it, join the conversation, and even volunteer to create a course in response. We designed the full experience: collecting requests, finding contributors, and managing collaboration through to course creation. The goal was to make internal learning feel more organic, social, and visible.',
        ],
        images: [screen360_01, screen360_02],
      },
      {
        title: 'Course Structure & Draft Management',
        body: [
          'Once a learning need is validated, the team starts building the course. This part of the experience is about planning, organizing, and assigning work before creation actually begins.',
          'We designed a clean interface to manage drafts, define structure and content, and clarify ownership at each step. It kept teams efficient and aligned right from the start.',
        ],
        images: [screen360_03, screen360_04],
      },
      {
        title: 'Design System',
        body: [
          'Alongside product work, I helped maintain the shared design system used across all squads at 360Learning. With a team of 8 designers, each owning a separate product area, a solid shared system was the only way to keep things consistent. Regular cross-squad syncs helped catch new patterns early and avoid fragmentation.',
          'The system covered everything from basic atoms to complex patterns like modals, forms, and data tables. I worked closely with developers to define handoff standards, write usage guidelines, and document edge cases. Keeping it healthy meant reviewing new requests constantly and making sure nothing got built twice.',
        ],
        images: [screen360_05, screen360_06],
      },
    ],
    nextProject: 'axa',
  },
  {
    slug: 'axa',
    company: 'AXA',
    tag: 'Design System',
    title: 'Bringing design consistency to two major product lines: insurance and banking.',
    description:
      'Worked as a consulting product designer through agency Monsieur Guiz for one year, six months with AXA Bank and six months with AXA Insurance. Focused on new features, design system components, and closing the gap between design and development.',
    year: '2018',
    tags: ['Design System', 'Product Design', 'App Design'],
    outcome: 'Insurance & banking, 2 product lines',
    accent: 'rose',
    index: '05',
    coverImage: axaScreen01,
    category: 'Insurance / Bank',
    period: 'Aug 2017 – Nov 2018',
    intro: [
      'AXA is one of the world\'s largest insurance and banking groups, operating across more than 50 countries.',
      'Through agency Monsieur Guiz, I worked as a consulting product designer for AXA for about one year: six months with AXA Bank and six months with AXA Insurance. My work covered new features, design system maintenance, and helping teams align design and development around a shared product language.',
    ],
    detailTags: ['Design System', 'Product Design', 'App Design', 'Illustrations'],
    sections: [
      {
        title: 'AXA Insurance & Bank Website',
        body: [
          'At AXA Insurance, I contributed to the website by designing new features and strengthening the design system foundations. The work covered layouts, navigation, and responsive guidelines to keep flexibility across products and devices.',
          'For AXA Bank, I designed responsive layouts and visuals for a website presenting the new mobile app, making features easy to understand while staying true to the brand.',
        ],
        images: [axaScreen01, axaScreen02],
      },
      {
        title: 'Design System',
        body: [
          'I also contributed to the shared AXA Design System, building components and defining spacing, constraints, and documentation for development teams.',
          'The priority was clarity and adaptability. Each component needed to work consistently across different teams and contexts without becoming rigid.',
        ],
        images: [axaScreen03, axaScreen04],
      },
      {
        title: 'Illustrations',
        body: [
          "Alongside the product work, I created a set of custom illustrations for AXA Bank's website and app.",
          'These visuals helped explain complex financial topics in a friendlier, more human way, making the product feel more accessible to everyday users.',
        ],
        images: [axaScreen05],
      },
    ],
    nextProject: undefined,
  },
]

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug)
}
