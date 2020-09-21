import React, { FunctionComponent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from 'react-three-fiber';
import { AnimationMixer, Mesh, MeshStandardMaterial } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { lerp } from '../utils/utils';

interface BGLTF extends GLTF {
  nodes: {
    [key: string]: Mesh;
  };
  materials: {
    [key: string]: MeshStandardMaterial;
  };
  __$: any[];
}

interface Props {
  url: string;
  mouse: MutableRefObject<[number, number]>;
}

const Asset: FunctionComponent<Props> = (props) => {
  const { url, mouse } = props;
  const { size, viewport } = useThree();
  const group = useRef<THREE.Group>();
  const gltf = useLoader<BGLTF>(GLTFLoader, url);
  const aspect = size.width / viewport.width;
  const { scene, animations } = gltf;
  const [mixer] = useState(() => new AnimationMixer(scene));

  useEffect(() => {
    if (group.current && animations.length) {
      mixer.clipAction(animations[0], group.current).play();
    }
  }, []);
  useFrame((state: any, delta: number) => {
    if (group.current) {
      group.current.position.x = lerp(group.current.position.x, mouse.current[0] / aspect / 10, 0.1);
      group.current.rotation.x = lerp(group.current.rotation.x, 0 + mouse.current[1] / aspect / 50, 0.1);
    }
  });

  console.log('场景数据', gltf);

  return <primitive ref={group} object={scene} scale={[0.12, 0.12, 0.12]} />;
};

export default Asset;
