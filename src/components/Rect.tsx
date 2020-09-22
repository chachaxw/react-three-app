import React, { FunctionComponent, MutableRefObject, useMemo, useRef } from 'react';
import { useLoader } from 'react-three-fiber';
import { DoubleSide, Texture, TextureLoader } from 'three';

interface Props {
  url: string;
  positionZ: number;
}

const Rect: FunctionComponent<Props> = (props) => {
  const { url, positionZ } = props;
  const texture = useLoader<Texture>(TextureLoader, url);

  return (
    <mesh castShadow receiveShadow rotation={[0, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <meshStandardMaterial attach="material" map={texture} side={DoubleSide} opacity={0.8} />
    </mesh>
  );
};

export default Rect;
