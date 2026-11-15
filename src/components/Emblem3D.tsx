import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/** Slowly rotating, extruded VANTERA "V" emblem rendered with three.js. */
export default function Emblem3D({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = ref.current!
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    host.appendChild(renderer.domElement)
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
    camera.position.set(0, 0, 9)

    // V silhouette (same proportions as the logo mark)
    const s = new THREE.Shape()
    s.moveTo(-1.3, 1.15)
    s.lineTo(-0.45, 1.15)
    s.lineTo(0, -0.15)
    s.lineTo(0.45, 1.15)
    s.lineTo(1.3, 1.15)
    s.lineTo(0.42, -1.2)
    s.lineTo(-0.42, -1.2)
    s.closePath()
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.55,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.08,
      bevelSegments: 6,
      curveSegments: 4,
    })
    geo.center()

    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#2D1F17'),
      metalness: 0.65,
      roughness: 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
      sheen: 0.4,
      sheenColor: new THREE.Color('#FFB067'),
    })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    scene.add(new THREE.AmbientLight('#ffd9c2', 0.5))
    const key = new THREE.DirectionalLight('#ffffff', 2.2)
    key.position.set(3, 4, 5)
    scene.add(key)
    const rimA = new THREE.PointLight('#F2611D', 40, 20)
    rimA.position.set(-4, 1, 2)
    scene.add(rimA)
    const rimB = new THREE.PointLight('#FFB067', 30, 20)
    rimB.position.set(4, -2, -2)
    scene.add(rimB)

    const resize = () => {
      const { width, height } = host.getBoundingClientRect()
      renderer.setSize(width, height, false)
      camera.aspect = width / Math.max(1, height)
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(host)

    let lastY = window.scrollY
    let spin = 0
    const onScroll = () => {
      spin += (window.scrollY - lastY) * 0.0025
      lastY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    let raf = 0
    let last = performance.now()
    const t0 = last
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      const now = performance.now()
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const elapsed = (now - t0) / 1000
      spin *= 0.92
      mesh.rotation.y += dt * 0.45 + spin * 0.15
      mesh.rotation.x = Math.sin(elapsed * 0.4) * 0.12
      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      host.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={ref} className={className} aria-hidden="true" />
}
