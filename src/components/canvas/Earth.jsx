import React, { Suspense } from "react"; //The core React library for building user interfaces.
//Suspense - Handles asynchronous loading.
import { Canvas } from "@react-three/fiber"; //React renderer for Three.js.
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"; //Utilities and components specifically tailored to make Three.js easier to use within React.

import CanvasLoader from "../Loader"; //custom component to display a loading indicator.

// This component is responsible for loading and rendering your 3D Earth model.
const Earth = () => { 
  const earth = useGLTF("./planet/scene.gltf"); //A hook from @react-three/drei to load GLTF format models (common 3D model format). It loads the scene.gltf file located in your ./planet folder.

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} /> //primitive - to add 3d object, scale, position, rotation
  );
};

// This component sets up the Three.js scene, camera controls, and manages the loading state.
const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand' //for optimization
      dpr={[1, 2]} //Device pixel ratio for crisp rendering on different displays.
      gl={{ preserveDrawingBuffer: true }} //Needed if you want to capture screenshots of the scene.
      //Sets up the camera (perspective, position, etc.)
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      {/* showing CanvasLoader while the model loads. */}
      <Suspense fallback={<CanvasLoader />}>
        {/* Adds mouse/touch controls for rotating the scene around the Earth. */}
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth /> 

        <Preload all /> 
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
