import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';
import { AnimationMixer, Group, Mesh as MeshType, MeshStandardMaterial } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface BGLTF extends GLTF {
  nodes: {
    [key: string]: MeshType;
  };
  materials: {
    [key: string]: MeshStandardMaterial;
  };
}

interface Props {
  url: string;
}

const Asset: FunctionComponent<Props> = ({ url }: any) => {
  const group = useRef<THREE.Group>();
  const group1 = useRef<THREE.Group>();
  const gltf = useLoader<BGLTF>(GLTFLoader, url);
  const { scene, scenes, animations, materials, nodes } = gltf;
  // const [mixer] = useState(() => new AnimationMixer(nodes['MorphMainGroup']));

  // useEffect(() => {
  //   if (group.current) {
  //     mixer.clipAction(animations[0], group.current).play();
  //   }
  // }, []);
  useFrame((state: any, delta: number) => {
    if (group.current) {
      group.current.rotation.y += Math.sin((delta * 0.5) / 2) * Math.cos((delta * 0.5) / 2) * 1.5;
    }
  });

  console.log('场景数据', gltf);

  return (
    <>
      <group ref={group} scale={[0.1, 0.1, 0.1]}>
        <scene>
          {Object.entries(nodes).map((node: [string, MeshType]) => (
            <mesh
              name={node[0]}
              key={node[1].uuid}
              scale={node[1].scale}
              layers={node[1].layers}
              matrix={node[1].matrix}
              rotation={node[1].rotation}
              geometry={node[1].geometry}
              material={node[1].material}
              position={node[1].position}
              quaternion={node[1].quaternion}
              castShadow={node[1].castShadow}
              receiveShadow={node[1].receiveShadow}
              morphTargetDictionary={node[1].morphTargetDictionary}
              morphTargetInfluences={node[1].morphTargetInfluences}
            />
          ))}
          {Object.entries(materials).map((material: [string, MeshStandardMaterial]) => (
            <meshStandardMaterial key={material[0]} {...material[1]} />
          ))}
        </scene>
      </group>
      {/* {scenes.map((scene: Group) => (
        <group ref={group1} key={scene.uuid} {...scene} />
      ))} */}
    </>
  );
};

export default Asset;
