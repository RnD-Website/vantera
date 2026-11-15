import type { ImageKey } from './images'

export const brand = {
  name: 'VANTERA',
  tagline: 'Powering the Future of Finance.',
  statement:
    'VANTERA delivers innovative financial technology solutions that help banks, financial institutions, and businesses build smarter, faster, and more connected financial experiences.',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Products', href: '#products' },
  { label: 'Partners', href: '#partners' },
  { label: 'Careers', href: '#careers' },
]

export const hero = {
  label: 'Financial Technology, Reimagined.',
  title: ['Building the Next', 'Generation of', 'Financial', 'Experiences.'],
  description:
    'Empowering financial institutions with intelligent banking technology, seamless payment infrastructure, and connected digital solutions.',
  primaryCta: { label: 'Explore Solutions', href: '#solutions' },
  secondaryCta: { label: 'Contact Our Team', href: '#contact' },
}

export const partners = {
  label: 'Trusted Technology. Stronger Partnerships.',
  title: 'Technology That Moves Financial Institutions Forward.',
  // Fictional placeholder identities — not real institutions.
  logos: [
    { name: 'Norvane', mark: 'hex' },
    { name: 'Halcyra Bank', mark: 'arc' },
    { name: 'Quillstone', mark: 'stack' },
    { name: 'Bravura Trust', mark: 'diamond' },
    { name: 'Altessa CU', mark: 'ring' },
    { name: 'Corvanta', mark: 'chevron' },
    { name: 'Kestrell Capital', mark: 'wing' },
    { name: 'Vellmont', mark: 'grid' },
  ] as const,
}

export const about = {
  label: 'Who We Are',
  title: 'Connecting Financial Technology With Real-World Possibilities.',
  kicker: 'Seamless by design.',
  kickerSub: 'Infrastructure, payments, and digital systems — working as one.',
  description:
    'At VANTERA, we believe the future of finance depends on technology that works seamlessly. We bring together intelligent infrastructure, modern payment experiences, and reliable digital systems to help financial institutions evolve.',
  cta: { label: 'Discover Our Story', href: '#about' },
  secondaryCta: { label: 'Why VANTERA', href: '#why' },
  showcase: {
    image: 'aboutShowcase' as ImageKey,
    title: 'Payment Terminals',
    text: 'Secure and seamless payment acceptance for businesses of every size.',
    cta: 'View Product Details',
  },
}

export type SolutionIcon = 'banking' | 'payments' | 'atm' | 'software' | 'security' | 'infrastructure'

export const solutions = {
  label: 'What We Deliver',
  title: 'Complete Technology Solutions for Modern Finance.',
  description:
    'From self-service hardware to the software and infrastructure behind every transaction — one connected stack built for institutions that never stop.',
  cta: { label: 'Explore Solutions', href: '#products' },
  items: [
    {
      title: 'Digital Banking Solutions',
      icon: 'banking' as SolutionIcon,
      text: 'Modern digital channels that let institutions deliver intuitive, secure banking across web and mobile.',
    },
    {
      title: 'Payment Processing',
      icon: 'payments' as SolutionIcon,
      text: 'Fast, dependable processing for card, contactless, and digital payments across every channel.',
    },
    {
      title: 'ATM & Self-Service Technology',
      icon: 'atm' as SolutionIcon,
      text: 'Self-service hardware and software that extend banking beyond the branch, around the clock.',
    },
    {
      title: 'Financial Software',
      icon: 'software' as SolutionIcon,
      text: 'Purpose-built applications that streamline operations, monitoring, and customer experiences.',
    },
    {
      title: 'Payment Security',
      icon: 'security' as SolutionIcon,
      text: 'Layered protection for transactions and data, designed into every terminal and every system.',
    },
    {
      title: 'Banking Infrastructure',
      icon: 'infrastructure' as SolutionIcon,
      text: 'Resilient core infrastructure that connects channels, devices, and partners into one network.',
    },
  ],
}

export const products = {
  label: 'Our Technology',
  title: 'Powering Every Point of Financial Interaction.',
  items: [
    { no: '01', name: 'Smart ATMs', image: 'smartAtm' as ImageKey, text: 'Modern self-service banking systems designed for convenient financial access.' },
    { no: '02', name: 'Cash Recyclers', image: 'cashRecycler' as ImageKey, text: 'Intelligent cash management systems for efficient banking operations.' },
    { no: '03', name: 'Payment Terminals', image: 'paymentTerminal' as ImageKey, text: 'Secure and seamless payment acceptance for businesses.' },
    { no: '04', name: 'Self-Service Kiosks', image: 'kiosk' as ImageKey, text: 'Interactive banking technology that simplifies everyday transactions.' },
    { no: '05', name: 'Payment Switch', image: 'paymentSwitch' as ImageKey, text: 'Reliable transaction infrastructure connecting financial systems.' },
    { no: '06', name: 'Digital Banking Platform', image: 'digitalPlatform' as ImageKey, text: 'Connected digital solutions for modern financial services.' },
  ],
}

export const technology = {
  label: "Built for What's Next",
  title: 'Smarter Infrastructure. Stronger Financial Connections.',
  description:
    'We combine intelligent technology, secure infrastructure, and connected financial systems to help institutions deliver more reliable and efficient experiences.',
  cta: { label: 'Talk to an Expert', href: '#contact' },
}

export type HighlightIcon = 'reliable' | 'intelligent' | 'secure' | 'connected'

export const why = {
  label: 'The VANTERA Advantage',
  title: 'Technology You Can Build Your Future On.',
  highlights: [
    { title: 'Reliable Infrastructure', icon: 'reliable' as HighlightIcon, text: 'Systems engineered for continuity, so your channels stay available when customers need them.' },
    { title: 'Intelligent Technology', icon: 'intelligent' as HighlightIcon, text: 'Smart software and data-aware devices that help teams make faster, better decisions.' },
    { title: 'Secure Transactions', icon: 'secure' as HighlightIcon, text: 'Security considered at every layer — from the terminal to the network core.' },
    { title: 'Connected Experiences', icon: 'connected' as HighlightIcon, text: 'Hardware, software, and digital channels that work together as one experience.' },
  ],
}

export const careers = {
  label: 'Grow With Us',
  title: "Build What's Next in Financial Technology.",
  description:
    'Join a team driven by innovation, collaboration, and the opportunity to shape the future of financial technology.',
  cta: { label: 'Explore Careers', href: '#careers' },
  values: [
    {
      q: 'Innovation at the core',
      a: 'Work on hardware, software, and infrastructure that move money for real people every day — and help define what comes next.',
    },
    {
      q: 'Collaboration across disciplines',
      a: 'Engineers, designers, product specialists, and field teams build side by side, sharing ownership from concept to deployment.',
    },
    {
      q: 'Room to grow',
      a: 'Take on meaningful challenges, learn from experienced peers, and shape a career path that fits your ambitions.',
    },
    {
      q: 'Impact you can see',
      a: 'The systems you build power everyday financial moments — at the counter, at the ATM, and on the phone in every pocket.',
    },
  ],
}

export const contact = {
  title: "Let's Build the Future of Finance Together.",
  description:
    'Have a project in mind? Connect with VANTERA and discover how our technology solutions can support your next step.',
  cta: { label: 'Start a Conversation', href: 'mailto:hello@vantera.com' },
}

export const footer = {
  columns: [
    {
      title: 'Company',
      links: ['About Us', 'Partners', 'Careers', 'Newsroom', 'Contact'],
    },
    {
      title: 'Solutions',
      links: ['Digital Banking', 'Payment Processing', 'ATM & Self-Service', 'Financial Software', 'Payment Security', 'Banking Infrastructure'],
    },
    {
      title: 'Products',
      links: ['Smart ATMs', 'Cash Recyclers', 'Payment Terminals', 'Self-Service Kiosks', 'Payment Switch', 'Digital Banking Platform'],
    },
  ],
  // Placeholder contact details — replace with the real company information.
  contact: {
    email: 'hello@vantera.com',
    phone: '+1 (000) 000-0000',
    note: 'Serving financial institutions across the United States.',
  },
  legal: ['Privacy Policy', 'Terms & Conditions'],
}
