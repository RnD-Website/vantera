import { useEffect, useRef } from 'react'

type Props = {
  className?: string
  /** base background color (rgb 0-1) */
  base?: [number, number, number]
  /** primary glow */
  glowA?: [number, number, number]
  /** secondary glow */
  glowB?: [number, number, number]
  intensity?: number
  /** follow the pointer with the main glow */
  interactive?: boolean
}

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`

const FRAG = `precision highp float;
uniform vec2 r;uniform float t;uniform vec2 m;uniform vec3 base;uniform vec3 ga;uniform vec3 gb;uniform float k;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.02;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r;vec2 asp=vec2(r.x/r.y,1.);
  vec2 q=uv*asp;
  float w=fbm(q*1.6+vec2(t*.05,-t*.04));
  vec2 c1=vec2(.72+.08*sin(t*.21),.42+.1*cos(t*.17))*asp;
  c1=mix(c1,m*asp,.35);
  vec2 c2=vec2(.22+.1*cos(t*.13),.85+.06*sin(t*.19))*asp;
  float d1=length(q-c1+w*.18);float d2=length(q-c2-w*.14);
  float g1=smoothstep(.95,.0,d1);float g2=smoothstep(.75,.0,d2);
  vec3 col=base;
  col=mix(col,ga,g1*.9*k);
  col=mix(col,gb,g2*.55*k);
  col+=ga*pow(g1,3.)*.25*k;
  float vig=smoothstep(1.35,.25,length((uv-.5)*asp));
  col*=mix(.7,1.,vig);
  float g=h(gl_FragCoord.xy+fract(t*7.)*100.)-.5;
  col+=g*.085;
  gl_FragColor=vec4(col,1.);
}`

/** Animated grainy gradient (WebGL) — the atmospheric backdrop used in the hero & dark panels. */
export function GrainGradient({
  className = '',
  base = [0.08, 0.05, 0.04],
  glowA = [0.95, 0.38, 0.11],
  glowB = [0.46, 0.17, 0.52],
  intensity = 1,
  interactive = true,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false })
    const rgb = (c: number[]) => c.map((v) => Math.round(v * 255)).join(',')
    const fallback = `radial-gradient(60% 70% at 70% 40%, rgba(${rgb(glowA)},.55), transparent 70%), radial-gradient(50% 50% at 20% 90%, rgba(${rgb(glowB)},.3), transparent 70%), rgb(${rgb(base)})`
    if (!gl) {
      canvas.style.background = fallback
      return
    }
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.style.background = fallback
      canvas.width = canvas.height = 1
      return
    }
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = (n: string) => gl.getUniformLocation(prog, n)
    const uR = u('r'), uT = u('t'), uM = u('m')
    gl.uniform3fv(u('base'), base)
    gl.uniform3fv(u('ga'), glowA)
    gl.uniform3fv(u('gb'), glowB)
    const uK = u('k')

    const dpr = Math.min(window.devicePixelRatio, 1.5) * 0.6 // render under-res: grain + blur hide it, perf stays high
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      // portrait screens: the glow covers more of the frame, so tone it down
      gl.uniform1f(uK, intensity * (width / Math.max(1, height) < 1 ? 0.55 : 1))
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const mouse = { x: 0.7, y: 0.45, tx: 0.7, ty: 0.45 }
    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect()
      mouse.tx = (e.clientX - b.left) / b.width
      mouse.ty = 1 - (e.clientY - b.top) / b.height
    }
    if (interactive) window.addEventListener('pointermove', onMove, { passive: true })

    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)

    let frame = 0
    const start = performance.now()
    const loop = () => {
      frame = requestAnimationFrame(loop)
      if (!visible) return
      mouse.x += (mouse.tx - mouse.x) * 0.04
      mouse.y += (mouse.ty - mouse.y) * 0.04
      gl.uniform2f(uR, canvas.width, canvas.height)
      gl.uniform1f(uT, (performance.now() - start) / 1000)
      gl.uniform2f(uM, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    loop()

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden="true" />
}
