import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { textureLoad } from 'three/tsl';

export function initTextScene(container: HTMLDivElement): () => void {
  // Remove any existing canvas
  const existingCanvas = container.querySelector('canvas');
  if (existingCanvas) {
    container.removeChild(existingCanvas);
  }

  // Scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Texture loader
  const textureLoader = new THREE.TextureLoader();
  const matcapTexture = textureLoader.load('/matcaps/matcap.png');

  // Font loader
  let textMesh: THREE.Mesh;
  const fontLoader = new FontLoader();
  fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry("Fede's Lab", {
      font: font,
      size: 0.5,
      depth: 0.2,
      curveSegments: 6,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4,
    });

    const textMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
    });
    textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textGeometry.center(); // optional, centers text geometry
    scene.add(textMesh);
  });

  const clock = new THREE.Clock();

  // Animate
  let animationId: number;
  const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    animationId = requestAnimationFrame(animate);
    if (textMesh) {
      textMesh.rotation.y = Math.sin(elapsedTime) * 0.4;
    }
    controls.update(); // Required for damping
    renderer.render(scene, camera);
  };
  animate();

  // Resize handler
  const handleResize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
  window.addEventListener('resize', handleResize);
  handleResize();

  // Cleanup
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', handleResize);
    controls.dispose();
    renderer.dispose();
    if (renderer.domElement && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
}
