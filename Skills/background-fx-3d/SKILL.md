---
name: background-fx-3d
description: WebGL 3D backgrounds, dynamic canvas particle systems, Vanta.js effects, Three.js scenes, and tsParticles canvas configurations. Use when adding interactive 3D particle fields, fluid webgl shaders, waves, fog, or dynamic canvas backgrounds to web apps.
---

# 3D & Canvas Background Effects

This skill provides implementation patterns for WebGL backgrounds, 3D particle fields, **Three.js**, **Vanta.js**, and **tsParticles**.

---

## Technical Stack & Dependencies

```bash
# Three.js & React Three Fiber
npm install three @react-three/fiber @react-three/drei

# tsParticles
npm install @tsparticles/react @tsparticles/slim

# Vanta.js (requires three.js)
npm install vanta
```

---

## 1. Interactive Three.js Particle Field (`@react-three/fiber`)

```tsx
'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleCloud({ count = 2000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta * 0.05;
      pointsRef.current.rotation.y += delta * 0.07;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#a855f7"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

export function BackgroundCanvas3D() {
  return (
    <div className="fixed inset-0 -z-10 bg-zinc-950 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleCloud count={2500} />
      </Canvas>
    </div>
  );
}
```

---

## 2. tsParticles Interactive Grid Configuration

```tsx
'use client';

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export function InteractiveParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 -z-10 pointer-events-none"
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.5 } },
          },
        },
        particles: {
          color: { value: '#ffffff' },
          links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.15, width: 1 },
          move: { enable: true, speed: 1.2 },
          number: { value: 60 },
          opacity: { value: 0.3 },
          size: { value: { min: 1, max: 3 } },
        },
      }}
    />
  );
}
```

---

## 3. Vanta.js WebGL Waves Effect Integration

```tsx
'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
// @ts-ignore
import WAVES from 'vanta/dist/vanta.waves.min';

export function VantaWavesBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let vantaEffect: any = null;
    if (vantaRef.current) {
      vantaEffect = WAVES({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x0f172a,
        shininess: 35.0,
        waveHeight: 15.0,
        waveSpeed: 0.75,
        zoom: 0.65,
      });
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}
```

---

## Best Practices

1. **Clean up WebGL contexts**: Always destroy Vanta effects or cancel `requestAnimationFrame` loops on component unmount to avoid WebGL context leaks (`TOO_MANY_GL_CONTEXTS`).
2. **Performance**: Keep particle counts under 3,000 for mobile GPUs. Disable pointer interactivity on low-power devices.
3. **Layering**: Ensure 3D canvas elements use `fixed inset-0 -z-10 pointer-events-none` so interactive HTML elements remain clickable.
