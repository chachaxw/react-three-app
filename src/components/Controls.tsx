import React, { FunctionComponent, useRef } from 'react';
import { useFrame, useThree, extend } from 'react-three-fiber';
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Makes these prototypes available as "native" jsx-string elements
extend({ OrbitControls, MapControls });

export const OrbitControl: FunctionComponent<any> = (props) => {
  const { gl, camera } = useThree();
  const ref = useRef<OrbitControls>();

  useFrame(() => ref.current?.update());

  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};

export const MapControl: FunctionComponent<any> = (props) => {
  const { gl, camera } = useThree();
  const ref = useRef<OrbitControls>();

  useFrame(() => ref.current?.update());

  return <mapControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};
