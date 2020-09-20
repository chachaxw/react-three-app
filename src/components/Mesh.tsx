import React, { FunctionComponent, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { useControl } from 'react-three-gui';

const Mesh: FunctionComponent<any> = (props) => {
  const mesh = useRef<THREE.Mesh>();
  const rotationX = useControl('Rotation X', { type: 'number' });
  const rotationY = useControl('Rotation Y', { type: 'number' });
  const rotationZ = useControl('Rotation Z', { type: 'number' });

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = mesh.current.rotation.z += 0.02;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      receiveShadow
      scale={[0.5, 0.5, 0.5]}
      rotation-x={rotationX}
      rotation-y={rotationY}
      rotation-z={rotationZ}
      position={[0, 0, 0]}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="hotpink" />
    </mesh>
  );
};

export default Mesh;
