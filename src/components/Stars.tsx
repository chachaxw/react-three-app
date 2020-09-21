import React, { FunctionComponent, useMemo, useRef } from 'react';
import { useFrame } from 'react-three-fiber';

interface Props {
  count: number;
}

const Stars: FunctionComponent<Props> = (props) => {
  const { count } = props;
  const mesh = useRef<THREE.Mesh>();
  const positions = useMemo<Float32Array>(() => {
    let positions = [];

    for (let i = 0; i < count; i++) {
      positions.push((50 + Math.random() * 1000) * (Math.round(Math.random()) ? -1 : 1));
      positions.push((50 + Math.random() * 1000) * (Math.round(Math.random()) ? -1 : 1));
      positions.push((50 + Math.random() * 1000) * (Math.round(Math.random()) ? -1 : 1));
    }

    return new Float32Array(positions);
  }, [count]);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = mesh.current.rotation.z += 0.005;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" size={2} sizeAttenuation color="white" transparent opacity={0.8} fog={false} />
    </points>
  );
};

export default Stars;
