import type { Node } from "@react-three/fiber";
import type { MeshBasicNodeMaterial } from "three/webgpu";

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshBasicNodeMaterial: Node<
      MeshBasicNodeMaterial,
      typeof MeshBasicNodeMaterial
    >;
  }
}
