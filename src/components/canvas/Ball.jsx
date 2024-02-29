import React, { Suspense } from "react"; //Suspense - Handles loading
import { Canvas } from "@react-three/fiber";
import {
  Decal, //Used to project images (textures) onto other 3D objects.
  Float, //Adds a floating/bobbing effect to objects.
  OrbitControls, //Use mouse to control
  Preload,
  useTexture, //Helper hook to load textures.
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  //Loads the image texture specified in the imgUrl prop.
  const [decal] = useTexture([props.imgUrl]); 

  return (
    // float speed, rotation and float intensity
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      {/* Basic scene lighting */}
      <ambientLight intensity={0.25} /> 
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        {/* Creates a sphere-like shape */}
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb' //base color of the ball
          // Prevents z-fighting issues (overlapping mesh surfaces)
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading //Gives the ball a more faceted/low-poly appearance.
        />
        {/*Projects the loaded image onto the ball's surface*/}
        <Decal 
        // Control the decal's placement on the ball.
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

// Passes an icon prop down to the Ball component, likely to specify the image for the decal.
const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
