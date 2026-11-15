// Downloads every Unsplash image used on the site into /public/images.
// Usage: npm run images:local   (then set USE_LOCAL = true in src/data/images.ts)
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'

const src = await readFile(new URL('../src/data/images.ts', import.meta.url), 'utf8')
const entries = [...src.matchAll(/^\s+(\w+):\s*'(photo-[\w-]+)'/gm)].map((m) => [m[1], m[2]])
const out = path.resolve('public/images')
await mkdir(out, { recursive: true })

for (const [key, id] of entries) {
  const url = `https://images.unsplash.com/${id}?auto=format&fm=jpg&fit=crop&w=2000&q=80`
  const res = await fetch(url)
  if (!res.ok) {
    console.error(`✗ ${key} (${res.status})`)
    continue
  }
  await writeFile(path.join(out, `${key}.jpg`), Buffer.from(await res.arrayBuffer()))
  console.log(`✓ ${key}`)
}
console.log(`\nSaved ${entries.length} images to public/images. Set USE_LOCAL = true in src/data/images.ts.`)
