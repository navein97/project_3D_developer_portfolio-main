import React, { Suspense, useEffect, useState } from "react";
// useEffect - Side effects (like setting up the media query listener).
// useState - manage the isMobile state.

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    // A container for grouping lights and the object.
    <mesh>
      {/* Below are the basic Three.js lighting setup */}
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />

      {/* Loads the GLTF model, applying properties based on the isMobile prop for responsive adjustments. */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  //Manages a state variable to track if the screen should be considered in a 'mobile' size.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Creates a media query for a maximum width of 500px
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Initializes isMobile based on initial screen size.
    setIsMobile(mediaQuery.matches);

    // A function to update isMobile when screen size changes across the threshold.
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Adds the event listener to the media query.
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Cleanup function to remove the listener when this component is unmounted (prevent memory leaks).
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
