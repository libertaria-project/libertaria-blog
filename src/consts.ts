export const SITE_TITLE = 'Libertaria Dispatch';
export const SITE_DESCRIPTION = 'Musings about Politics & Tech in the Libertaria Federation through the lens of Exitarianism.';

// ── Canonical 20 tags ────────────────────────────────────────────────
// Tags in this list get /tags/{tag} pages.
// All other tags link to /blog/search/?q={tag}
export const CANONICAL_TAGS: { id: string; label: string; desc: string }[] = [
  { id: 'sovereignty',     label: 'Sovereignty',     desc: 'Self-determination, exit rights, and the architecture of individual autonomy.' },
  { id: 'ai',              label: 'AI',               desc: 'Artificial intelligence, machine cognition, and the capture risks of model governance.' },
  { id: 'exit',            label: 'Exit',             desc: 'The founding act: leaving the cage, building the alternative, never looking back.' },
  { id: 'geopolitics',     label: 'Geopolitics',      desc: 'Empire, fragmentation, and the exit lens applied to power, energy, and currency.' },
  { id: 'economics',        label: 'Economics',        desc: 'Political economy, production layers, monetary architecture, and the cost of coercion.' },
  { id: 'privacy',         label: 'Privacy',          desc: 'Surveillance, data sovereignty, and the right to exist without being observed.' },
  { id: 'manifesto',       label: 'Manifesto',        desc: 'Blade texts. High-voltage polemics. The rattling documents that draw the line.' },
  { id: 'open-problems',   label: 'Open Problems',    desc: 'Unsolved questions worth building around. The edge of what we know.' },
  { id: 'protocol',         label: 'Protocol',         desc: 'Technical rules, governance code, and the infrastructure of coordination.' },
  { id: 'crypto',           label: 'Crypto',           desc: 'Cryptocurrency, decentralized finance, and the monetary protocols of exit.' },
  { id: 'bitcoin',          label: 'Bitcoin',          desc: 'The first sovereign money. Hard money with no mother.' },
  { id: 'network-state',   label: 'Network State',    desc: 'Protocol-legible territory, digital nomadism, and the geography of exit.' },
  { id: 'identity',         label: 'Identity',         desc: 'Self-sovereign identity, reputation, and the question of who you are when no cage defines you.' },
  { id: 'governance',       label: 'Governance',       desc: 'Rules without rulers. The mechanisms that scale without becoming Leviathan.' },
  { id: 'reflection',       label: 'Reflection',        desc: 'Essays that step back. The greyzone between lens and action.' },
  { id: 'chapter',          label: 'Chapter',           desc: 'Operations, structure, and life inside a Libertaria Chapter.' },
  { id: 'platform-capture', label: 'Platform Capture',  desc: 'Big tech enclosure, API lock-in, and the mechanisms by which open networks become cages.' },
  { id: 'exitarianism',     label: 'Exitarianism',      desc: 'The lens. Leave Us Alone, applied to every domain — politics, tech, economics, faith.' },
  { id: 'fiction',          label: 'Fiction',            desc: 'Near-future sci-fi and carbon-and-silicon worldbuilding from the frontier.' },
  { id: 'pessimism',        label: 'Pessimism',         desc: 'Informed pessimism weaponized into architecture.清醒的悲观，明智的建设.' },
];

export const CANONICAL_TAG_IDS = new Set(CANONICAL_TAGS.map(t => t.id));

// ── Lane definitions ─────────────────────────────────────────────────
export const LANES = [
  {
    id: 'dispatches',
    label: 'Dispatches',
    desc: 'Trench reports from the parallel. Big tech enclosure, platform capture, chapter operations.',
    icon: '📡',
    color: '#ffd700',
    href: '/dispatches/',
  },
  {
    id: 'geopolitics',
    label: 'Geopolitics',
    desc: 'Empire, fragmentation, and the exit lens applied to power, energy, and currency.',
    icon: '🌐',
    color: '#ff1a1a',
    href: '/geopolitics/',
  },
  {
    id: 'stories',
    label: 'Stories',
    desc: 'Sci-fi, near-future fiction, and carbon-and-silicon worldbuilding from the frontier.',
    icon: '⚡',
    color: '#ffd700',
    href: '/stories/',
  },
  {
    id: 'civilization-faith',
    label: 'Civilization & Faith',
    desc: 'Ritual, stewardship, religion, and moral architecture through the Leave Us Alone lens.',
    icon: '🜏',
    color: '#ff1a1a',
    href: '/civilization-faith/',
  },
  {
    id: 'manifestos',
    label: 'Manifestos',
    desc: 'Blade texts. High-voltage polemics. The rattling manifests that draw the line.',
    icon: '⚔',
    color: '#ffd700',
    href: '/manifestos/',
  },
  {
    id: 'doctrine',
    label: 'Doctrine',
    desc: 'Applied Exitarianism in motion. Philosophy operationalized. The greyzone between lens and action.',
    icon: '⚖',
    color: '#ff1a1a',
    href: '/doctrine/',
  },
  {
    id: 'open-problems',
    label: 'Open Problems',
    desc: 'Unsolved questions worth building around. The edge of what we know and what we still must figure out.',
    icon: '◇',
    color: '#ffd700',
    href: '/open-problems/',
  },
];
