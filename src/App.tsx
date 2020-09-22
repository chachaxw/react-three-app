import React, { FunctionComponent, useCallback, useRef, Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { ControlsProvider, Controls } from 'react-three-gui';
import { Vector3 } from 'three';

import './App.css';
import { Mesh, Rect, OrbitControl } from './components';

const App: FunctionComponent<any> = (props) => {
  const aspect = window.innerWidth / window.innerHeight;
  const mouse = useRef<[number, number]>([0, 0]);
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2];
  }, []);

  return (
    <div className="App">
      <ControlsProvider>
        <Canvas
          style={{ height: '100vh' }}
          onMouseMove={onMouseMove}
          camera={{ position: [-600 * aspect, 600 * aspect, 600] }}
        >
          <ambientLight intensity={0.5} />
          <pointLight intensity={5} position={[10, 10, 10]} color="#171720" />
          <Suspense fallback={<Mesh />}>
            <Rect url="assets/images/12f.png" positionZ={0} />
            <Rect url="assets/images/11f.png" positionZ={0.2} />
            <Rect url="assets/images/13f.png" positionZ={0.4} />
          </Suspense>
          <fog attach="fog" args={['#090b1f', 0, 25]} />
          <axesHelper args={[5]} />
          <arrowHelper args={[new Vector3(1, 2, 0), new Vector3(0, 0, 0), 2, 0x00ff00]} />
          <gridHelper args={[10, 10]} />
          <OrbitControl
            enableZoom
            enableDamping
            rotateSpeed={1}
            minDistance={0.1}
            enablePan={false}
            maxDistance={20}
            dampingFactor={0.5}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
        <Controls />
      </ControlsProvider>
    </div>
  );
};

export default App;
