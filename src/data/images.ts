/**
 * All imagery is sourced from Unsplash (free Unsplash License) and served from
 * the Unsplash CDN with on-the-fly sizing. Run `npm run images:local` to
 * download every image into /public/images and switch to local files
 * (set USE_LOCAL = true afterwards).
 */
const USE_LOCAL = false

const ids = {
  hero: 'photo-1790427147552-20975642a058', // glowing blue ATM kiosk, dark
  aboutShowcase: 'photo-1778790677564-0f9401aac4f7', // card payment at a coffee counter
  smartAtm: 'photo-1574288061782-da2d3f79a72e', // blue cash machine
  cashRecycler: 'photo-1682344059600-a869f15f3ace', // pair of cash machines
  paymentTerminal: 'photo-1556740720-776b84291f8e', // handheld card terminal
  kiosk: 'photo-1764795849694-34b3316b3de4', // interactive self-service display
  paymentSwitch: 'photo-1558494949-ef010cbdcc31', // network cabling
  digitalPlatform: 'photo-1783419036401-1c01c1039267', // mobile app in hand
  infrastructure: 'photo-1584169417032-d34e8d805e8b', // server aisle
  selfServiceHall: 'photo-1762818106013-74323d5fcc80', // row of self-service screens
  keypad: 'photo-1601597110547-78516f198ce4', // ATM keypad close-up
  contactless: 'photo-1556742521-9713bf272865', // phone at contactless terminal
  team: 'photo-1758691737124-05c5bffe46f0', // team around a laptop
  teamAlt: 'photo-1758873268695-1b55590e507a', // team at a screen
} as const

export type ImageKey = keyof typeof ids

export function img(key: ImageKey, width = 1600, quality = 78): string {
  if (USE_LOCAL) return `/images/${key}.jpg`
  return `https://images.unsplash.com/${ids[key]}?auto=format&fit=crop&w=${width}&q=${quality}`
}

export function srcSet(key: ImageKey, widths = [640, 1024, 1600, 2200]): string {
  if (USE_LOCAL) return ''
  return widths.map((w) => `${img(key, w)} ${w}w`).join(', ')
}

export const imageIds = ids
