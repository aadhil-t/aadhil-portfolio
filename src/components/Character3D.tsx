import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type Character3DProps = {
  reducedMotion: boolean;
};

export default function Character3D({ reducedMotion }: Character3DProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      setWebglFailed(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.2, 8.2);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.className = 'character-canvas';
    host.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xdde8ff, 0x1b2414, 2.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xc6ff4a, 35, 15);
    rimLight.position.set(-3, 1.5, -2);
    scene.add(rimLight);
    const fillLight = new THREE.PointLight(0x8c9cff, 16, 12);
    fillLight.position.set(3, -2, 3);
    scene.add(fillLight);

    const character = new THREE.Group();
    scene.add(character);

    const matte = new THREE.MeshStandardMaterial({ color: 0x202421, roughness: 0.32, metalness: 0.55 });
    const lightMat = new THREE.MeshStandardMaterial({ color: 0xd9ded5, roughness: 0.25, metalness: 0.48 });
    const accent = new THREE.MeshStandardMaterial({ color: 0xc6ff4a, roughness: 0.24, metalness: 0.32, emissive: 0x334b08, emissiveIntensity: 0.8 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x080a09, roughness: 0.22, metalness: 0.65 });
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0xc6ff4a, emissive: 0xc6ff4a, emissiveIntensity: 3.4, roughness: 0.2 });

    const addMesh = (geometry: THREE.BufferGeometry, material: THREE.Material, position: [number, number, number], scale?: [number, number, number]) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      if (scale) mesh.scale.set(...scale);
      character.add(mesh);
      return mesh;
    };

    // Procedural stylized robot: all geometry is real 3D and rotates as one object.
    addMesh(new THREE.SphereGeometry(1, 40, 32), lightMat, [0, 0.85, 0], [0.82, 0.94, 0.72]);
    addMesh(new THREE.BoxGeometry(1.3, 0.16, 0.22), dark, [0, 0.85, 0.64], [1, 1, 1]);
    addMesh(new THREE.SphereGeometry(0.13, 24, 20), eyeMat, [-0.27, 0.88, 0.69], [1.1, 1.1, 0.42]);
    addMesh(new THREE.SphereGeometry(0.13, 24, 20), eyeMat, [0.27, 0.88, 0.69], [1.1, 1.1, 0.42]);
    addMesh(new THREE.BoxGeometry(0.3, 0.055, 0.08), accent, [0, 0.49, 0.65]);
    addMesh(new THREE.CylinderGeometry(0.22, 0.25, 0.38, 32), dark, [0, -0.13, 0]);
    addMesh(new THREE.BoxGeometry(1.5, 1.1, 0.68), matte, [0, -0.92, 0], [1, 1, 0.85]);
    addMesh(new THREE.BoxGeometry(0.85, 0.18, 0.12), accent, [0, -0.73, 0.32]);
    addMesh(new THREE.BoxGeometry(0.42, 0.28, 0.12), dark, [0, -1.08, 0.34]);
    addMesh(new THREE.SphereGeometry(0.095, 20, 16), eyeMat, [0, -1.08, 0.42]);
    // Shoulder joints and arms.
    addMesh(new THREE.SphereGeometry(0.25, 24, 20), lightMat, [-0.9, -0.48, 0], [1, 1, 0.9]);
    addMesh(new THREE.SphereGeometry(0.25, 24, 20), lightMat, [0.9, -0.48, 0], [1, 1, 0.9]);
    addMesh(new THREE.CapsuleGeometry(0.16, 0.62, 6, 14), matte, [-1.02, -0.98, 0], [1, 1, 1]);
    addMesh(new THREE.CapsuleGeometry(0.16, 0.62, 6, 14), matte, [1.02, -0.98, 0], [1, 1, 1]);
    addMesh(new THREE.BoxGeometry(0.36, 0.3, 0.32), accent, [-1.02, -1.42, 0.02]);
    addMesh(new THREE.BoxGeometry(0.36, 0.3, 0.32), accent, [1.02, -1.42, 0.02]);
    // Antenna.
    addMesh(new THREE.CylinderGeometry(0.035, 0.055, 0.34, 12), dark, [0, 1.85, 0]);
    addMesh(new THREE.SphereGeometry(0.105, 18, 16), accent, [0, 2.05, 0]);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(2.15, 64),
      new THREE.MeshBasicMaterial({ color: 0xc6ff4a, transparent: true, opacity: 0.055, side: THREE.DoubleSide }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.9;
    scene.add(ground);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.008, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0xc6ff4a, transparent: true, opacity: 0.48 }),
    );
    ring.rotation.x = Math.PI * 0.43;
    ring.rotation.y = -0.18;
    ring.position.y = -0.65;
    character.add(ring);

    let width = host.clientWidth || 500;
    let height = host.clientHeight || 520;
    const resize = () => {
      width = Math.max(host.clientWidth, 1);
      height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.position.z = width < 500 ? 9 : 8.2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let targetY = 0.28;
    let targetX = -0.04;
    let velocityY = 0;
    let pointerId: number | null = null;
    let lastInteraction = performance.now();
    const canvas = renderer.domElement;
    canvas.style.touchAction = 'pan-y';

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      pointerId = event.pointerId;
      lastX = event.clientX;
      lastY = event.clientY;
      lastInteraction = performance.now();
      canvas.setPointerCapture?.(event.pointerId);
      canvas.style.cursor = 'grabbing';
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging || pointerId !== event.pointerId) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      targetY += dx * 0.009;
      targetX = THREE.MathUtils.clamp(targetX + dy * 0.004, -0.28, 0.32);
      velocityY = dx * 0.0012;
      lastX = event.clientX;
      lastY = event.clientY;
      lastInteraction = performance.now();
    };
    const endDrag = (event: PointerEvent) => {
      if (pointerId !== event.pointerId) return;
      dragging = false;
      pointerId = null;
      canvas.style.cursor = 'grab';
      lastInteraction = performance.now();
    };
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
    canvas.addEventListener('lostpointercapture', endDrag);
    canvas.style.cursor = 'grab';

    let frame = 0;
    let animationId = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      if (!dragging && !reducedMotion && document.visibilityState === 'visible') {
        if (performance.now() - lastInteraction > 1800) {
          targetY += 0.0025;
        } else {
          targetY += velocityY;
          velocityY *= 0.94;
        }
      }
      character.rotation.y += (targetY - character.rotation.y) * 0.075;
      character.rotation.x += (targetX - character.rotation.x) * 0.075;
      if (!reducedMotion) {
        character.position.y = Math.sin(elapsed * 0.9) * 0.055;
        ring.rotation.z = elapsed * 0.08;
      }
      renderer.render(scene, camera);
      frame++;
    };
    animate();

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && animationId === 0) animate();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', endDrag);
      canvas.removeEventListener('pointercancel', endDrag);
      canvas.removeEventListener('lostpointercapture', endDrag);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
      void frame;
    };
  }, [reducedMotion]);

  return (
    <div className="character-wrap">
      {webglFailed ? (
        <div className="character-fallback" role="img" aria-label="Stylized robot illustration">
          <div className="fallback-robot"><span /><span /></div>
          <p>INTERACTIVE 3D EXPERIENCE</p>
        </div>
      ) : (
        <div ref={hostRef} className="character-host" aria-label="Interactive 3D robot. Drag horizontally to rotate it through 360 degrees." />
      )}
      <div className="orbit-label orbit-label--top">INTERACTIVE OBJECT <span>✳</span></div>
      <div className="orbit-label orbit-label--bottom"><span className="live-dot" /> DRAG TO ROTATE / 360°</div>
      <div className="character-index">FIG. 001 — AADHIL'S DIGITAL WORLD</div>
    </div>
  );
}
