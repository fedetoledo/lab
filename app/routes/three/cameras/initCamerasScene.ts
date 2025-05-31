import * as THREE from 'three';

export function initCamerasScene(container: HTMLDivElement): () => void {
  const existingCanvas = container.querySelector('canvas');
  if (existingCanvas) container.removeChild(existingCanvas);

  const scene = new THREE.Scene();

  // Two cubes for visual comparison
  const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0xff5555 })
  );
  cube1.position.z = -5.2;

  const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0x5555ff })
  );
  cube2.position.z = 5.2;

  scene.add(cube1, cube2);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(2, 4, 3);
  scene.add(light);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setScissorTest(true);
  renderer.autoClear = false;
  container.appendChild(renderer.domElement);

  // Left: Perspective camera
  const perspectiveCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  perspectiveCamera.position.set(0, 2, 8);
  perspectiveCamera.lookAt(0, 0, 0);

  // Right: Orthographic camera
  const orthoSize = 2;
  const orthographicCamera = new THREE.OrthographicCamera(
    -orthoSize,
    orthoSize,
    orthoSize,
    -orthoSize,
    0.1,
    1000
  );
  orthographicCamera.position.set(0, 2, 8);
  orthographicCamera.lookAt(0, 0, 0);

  // Resize logic
  const resize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);

    perspectiveCamera.aspect = width / 2 / height;
    perspectiveCamera.updateProjectionMatrix();

    const aspect = width / 2 / height;
    orthographicCamera.left = -orthoSize * aspect;
    orthographicCamera.right = orthoSize * aspect;
    orthographicCamera.top = orthoSize;
    orthographicCamera.bottom = -orthoSize;
    orthographicCamera.updateProjectionMatrix();
  };
  window.addEventListener('resize', resize);
  resize();

  let animationId = 0;
  const animate = () => {
    animationId = requestAnimationFrame(animate);

    // Rotate cubes
    cube1.rotation.y += 0.01;
    cube2.rotation.y += 0.01;

    const w = container.clientWidth;
    const h = container.clientHeight;

    renderer.clear();

    // Left (Perspective)
    renderer.setViewport(0, 0, w / 2, h);
    renderer.setScissor(0, 0, w / 2, h);
    renderer.render(scene, perspectiveCamera);

    // Right (Orthographic)
    renderer.setViewport(w / 2, 0, w / 2, h);
    renderer.setScissor(w / 2, 0, w / 2, h);
    renderer.render(scene, orthographicCamera);
  };
  animate();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
    [cube1, cube2].forEach((cube) => {
      cube.geometry.dispose();
      (cube.material as THREE.Material).dispose();
    });
    renderer.dispose();
    if (renderer.domElement && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
}
