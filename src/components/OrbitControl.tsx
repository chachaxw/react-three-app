import React, { FunctionComponent, useRef } from 'react';
import { useFrame, useThree, extend } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Makes these prototypes available as "native" jsx-string elements
extend({ OrbitControls });

const OrbitControl: FunctionComponent<any> = (props) => {
  const { gl, camera } = useThree();
  const ref = useRef<OrbitControls>();

  useFrame(() => ref.current?.update());

  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};

export default OrbitControl;
