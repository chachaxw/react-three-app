import React, { FunctionComponent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from 'react-three-fiber';
import lerp from 'lerp';
import { AnimationMixer, Group, Mesh as MeshType, MeshStandardMaterial } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface BGLTF extends GLTF {
  nodes: {
    [key: string]: MeshType;
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
  const group1 = useRef<THREE.Group>();
  const gltf = useLoader<BGLTF>(GLTFLoader, url);
  const aspect = size.width / viewport.width;
  const { scene, animations } = gltf;
  // const [mixer] = useState(() => new AnimationMixer(scene));

  // useEffect(() => {
  //   if (group.current) {
  //     mixer.clipAction(animations[0], group.current).play();
  //   }
  // }, []);
  useFrame((state: any, delta: number) => {
    if (group.current) {
      // group.current.rotation.y += Math.sin((delta * 0.5) / 2) * Math.cos((delta * 0.5) / 2) * 1.5;
      group.current.position.x = lerp(group.current.position.x, mouse.current[0] / aspect / 10, 0.1);
      group.current.rotation.x = lerp(group.current.rotation.x, 0 + mouse.current[1] / aspect / 50, 0.1);
    }
  });

  console.log('场景数据', gltf);

  return (
    // <group ref={group} scale={[0.1, 0.1, 0.1]}>
    //   <scene>
    //     {Object.entries(nodes).map((node: [string, MeshType]) =>
    //       node[0].startsWith('Plane') ? (
    //         <mesh
    //           name={node[0]}
    //           key={node[1].uuid}
    //           scale={node[1].scale}
    //           layers={node[1].layers}
    //           matrix={node[1].matrix}
    //           rotation={node[1].rotation}
    //           geometry={node[1].geometry}
    //           material={node[1].material}
    //           position={node[1].position}
    //           quaternion={node[1].quaternion}
    //           castShadow={node[1].castShadow}
    //           receiveShadow={node[1].receiveShadow}
    //           morphTargetDictionary={node[1].morphTargetDictionary}
    //           morphTargetInfluences={node[1].morphTargetInfluences}
    //         />
    //       ) : null
    //     )}
    //     {/* {gltf.__$.map((item: any, index: number) => (
    //         <mesh
    //           key={index}
    //           name={item.name}
    //           scale={item.scale}
    //           position={item.position}
    //           rotation={item.rotation}
    //           castShadow={item.castShadow}
    //           quaternion={item.quaternion}
    //           receiveShadow={item.receiveShadow}
    //         >
    //           <bufferGeometry attach="geometry" {...item.geometry} />
    //           <meshStandardMaterial attach="material" {...item.material} />
    //         </mesh>
    //       ))} */}
    //     <mesh>
    //       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
    //       {Object.entries(materials).map((material: [string, MeshStandardMaterial]) => (
    //         <meshStandardMaterial key={material[0]} attach="material" {...material[1]} />
    //       ))}
    //     </mesh>
    //   </scene>
    // </group>
    <primitive ref={group} object={scene} scale={[0.12, 0.12, 0.12]} />
  );
};

export default Asset;
