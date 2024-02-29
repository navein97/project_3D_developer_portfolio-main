import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei"; //styling point clouds in Three.js.
import * as random from "maath/random/dist/maath-random.esm"; //External library to generate random values (used to position stars).

const Stars = (props) => {
  //Creates a reference to attach to the rendered stars object.
  const ref = useRef();
  //Generates 5000 random 3D coordinates within a sphere (radius 1.2) when the component mounts.
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));

  // This hook executes code every rendered frame in Three.js.
  useFrame((state, delta) => {
    // Rotates the stars slowly around the x/y axis, with the speed influenced by the delta (time since last frame).
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* positions: The calculated sphere coordinates.
          stride: Specifies taking X, Y, Z values in groups of 3 from the position array.
          frustrumCulled: Optimizes rendering (points off-camera aren't processed). */}
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial 
        // The look of the stars
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    // Positions the stars in the background (z-index: -1).
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      {/* Sets up the scene with a camera positioned to view the stars. */}
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* Handles loading while the stars might be generating. */}
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
