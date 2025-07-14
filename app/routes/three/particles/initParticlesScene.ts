import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function initParticlesScene(container: HTMLDivElement): () => void {
  // Remove any existing canvas (safety net in case cleanup was skipped)
  const existingCanvas = container.querySelector('canvas');
  if (existingCanvas) {
    container.removeChild(existingCanvas);
  }

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Texture Loader
  const textureLoader = new THREE.TextureLoader();
  const mask = textureLoader.load('/masks/magic_05.png');

  // Geometry
  const particlesGeometry = new THREE.BufferGeometry();
  const count = 2000;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random();
  }

  particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Material
  const particlesMaterial = new THREE.PointsMaterial({
    map: mask,
  });

  // particlesMaterial.color = new THREE.Color('red');
  particlesMaterial.size = 0.2;
  particlesMaterial.vertexColors = true;
  particlesMaterial.sizeAttenuation = true;
  particlesMaterial.transparent = true;
  particlesMaterial.alphaMap = mask;
  particlesMaterial.depthWrite = false;
  particlesMaterial.blending = THREE.AdditiveBlending;

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  camera.position.z = 2;

  // Orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Animation loop
  let animationId: number;
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    particles.rotation.y += 0.002;
    particles.rotation.x += 0.001;
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

  // Initial resize in case layout changes post-render
  handleResize();

  // Cleanup function
  return () => {
    cancelAnimationFrame(animationId);
    renderer.dispose();
    if (renderer.domElement && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
}
