"use client";

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GONDOLA_COLORS = ["#FFB020", "#FF6B57", "#7C5CFC", "#F8F4EC"];

function Wheel() {
  const wheelGroup = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Points>(null);

  const spokes = 12;
  const radius = 2.6;

  const gondolas = useMemo(
    () =>
      Array.from({ length: spokes }).map((_, i) => {
        const angle = (i / spokes) * Math.PI * 2;
        return {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          color: GONDOLA_COLORS[i % GONDOLA_COLORS.length],
        };
      }),
    []
  );

  const starPositions = useMemo(() => {
    const count = 260;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14 + 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (wheelGroup.current) {
      wheelGroup.current.rotation.z += delta * 0.12;
    }
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#F8F4EC"
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <group position={[0, -0.3, 0]}>
        <group ref={wheelGroup}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.045, 16, 64]} />
            <meshStandardMaterial
              color="#FFB020"
              emissive="#FFB020"
              emissiveIntensity={0.5}
              metalness={0.4}
              roughness={0.3}
            />
          </mesh>

          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius * 0.55, 0.02, 12, 48]} />
            <meshStandardMaterial
              color="#7C5CFC"
              emissive="#7C5CFC"
              emissiveIntensity={0.4}
              transparent
              opacity={0.6}
            />
          </mesh>

          {gondolas.map((g, i) => (
            <group key={i} position={[g.x, g.y, 0]}>
              <mesh>
                <cylinderGeometry args={[0.012, 0.012, radius, 6]} />
                <meshBasicMaterial color="#F8F4EC" transparent opacity={0.25} />
              </mesh>
              <mesh position={[0, -0.22, 0]}>
                <boxGeometry args={[0.26, 0.22, 0.26]} />
                <meshStandardMaterial
                  color={g.color}
                  emissive={g.color}
                  emissiveIntensity={0.35}
                  roughness={0.4}
                />
              </mesh>
            </group>
          ))}

          <mesh>
            <sphereGeometry args={[0.16, 24, 24]} />
            <meshStandardMaterial
              color="#F8F4EC"
              emissive="#FFB020"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>

        <mesh rotation={[0, 0, Math.PI / 5.2]} position={[-radius * 0.55, -radius * 0.65, -0.1]}>
          <boxGeometry args={[3.6, 0.05, 0.05]} />
          <meshStandardMaterial color="#F8F4EC" transparent opacity={0.18} />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 5.2]} position={[radius * 0.55, -radius * 0.65, -0.1]}>
          <boxGeometry args={[3.6, 0.05, 0.05]} />
          <meshStandardMaterial color="#F8F4EC" transparent opacity={0.18} />
        </mesh>
      </group>
    </>
  );
}

export function FerrisWheelScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0.2, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#FF6B57" />
        <pointLight position={[-5, -2, 3]} intensity={0.8} color="#7C5CFC" />
        <Suspense fallback={null}>
          <Wheel />
        </Suspense>
      </Canvas>
    </div>
  );
}
