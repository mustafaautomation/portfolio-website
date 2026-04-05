"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function Sphere() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = clock.getElapsedTime() * 0.15;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.2;
    // React to mouse
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, pointer.x * 0.5, 0.05);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, pointer.y * 0.3, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={mesh} scale={2.2}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#00E599"
          emissive="#00E599"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={1.5}
          transparent
          opacity={0.85}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#00E599" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function HeroSphere() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00E599" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#ffffff" />
        <Sphere />
        <Particles />
      </Canvas>
    </div>
  );
}
