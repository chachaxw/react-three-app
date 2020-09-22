import { ReactThreeFiber } from 'react-three-fiber';
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
      mapControls: ReactThreeFiber.Object3DNode<MapControls, typeof MapControls>;
    }
  }
}
