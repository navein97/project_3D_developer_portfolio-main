import { Html, useProgress } from "@react-three/drei";

// This component displays a loading icon/animation and a percentage indicator while your 3D assets are loading.
const CanvasLoader = () => {
  const { progress } = useProgress(); // Get loading progress
  return (
    <Html
      as='div' // Create a regular div to contain the loader
      center
      style={{  // Styling to center the loader
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Likely your loading animation */}
      <span className='canvas-loader'></span> 
      <p
        style={{
          fontSize: 14,
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}% {/* Display percentage loaded */}
      </p>
    </Html>
  );
};

export default CanvasLoader;
