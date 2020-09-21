import React, { FunctionComponent, useCallback, useRef, Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { ControlsProvider, Controls } from 'react-three-gui';

import './App.css';
import { Asset, Mesh, OrbitControl, Stars } from './components';

const App: FunctionComponent<any> = (props) => {
  const mouse = useRef<[number, number]>([0, 0]);
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2];
  }, []);

  return (
    <div className="App">
      <ControlsProvider>
        <Canvas style={{ height: '100vh' }} onMouseMove={onMouseMove}>
          <ambientLight intensity={1} />
          <pointLight intensity={20} position={[10, 10, 10]} color="#200f20" />
          <Suspense fallback={<Mesh />}>
            <Asset mouse={mouse} url="models/dragon_glass/scene.gltf" />
          </Suspense>
          <Stars count={1000} />
          <fog attach="fog" args={['#090b1f', 0, 25]} />
          <OrbitControl
            autoRotate
            enableZoom
            enableDamping
            rotateSpeed={1}
            minDistance={1}
            enablePan={false}
            maxDistance={20}
            dampingFactor={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
        <Controls />
      </ControlsProvider>
    </div>
  );
};

export default App;
