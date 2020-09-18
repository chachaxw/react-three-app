import React, { FunctionComponent, useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { ControlsProvider, Controls, useControl } from 'react-three-gui';

import './App.css';

const Mesh: FunctionComponent<any> = (props) => {
  const mesh = useRef<any>();
  const rotationX = useControl('Rotation X', { type: 'number' });
  const rotationY = useControl('Rotation Y', { type: 'number' });

  useFrame(() => {
    // mesh.current.rotation.x = mesh.current.rotation.y += 0.02;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      receiveShadow
      scale={[1.5, 1.5, 1.5]}
      rotation-x={rotationX}
      rotation-y={rotationY}
      position={[0, 0, 0]}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="hotpink" />
    </mesh>
  );
};

function App(props: any) {
  return (
    <div className="App">
      <ControlsProvider>
        <Canvas style={{ height: '100vh' }} colorManagement>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Mesh />
        </Canvas>
        <Controls />
      </ControlsProvider>
    </div>
  );
}

export default App;
