import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useEnvironmentContext } from "../hooks";
import { createScene } from "@/entities/environment/system/createScene";

export default function EnvironmentCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const alreadyInitializedRef = useRef(false);
  const { baseTreeRef, grassRef, setIsReady, exp } = useEnvironmentContext();

  useEffect(() => {
    if (alreadyInitializedRef.current) return;
    alreadyInitializedRef.current = true;

    let renderer: THREE.WebGLRenderer | null = null;
    let observer: ResizeObserver | null = null;

    const setup = async () => {
      const container = mountRef.current;
      if (!container) return;

      const {
        scene,
        camera,
        controls,
        baseTree,
        environment,
        renderer: createdRenderer,
      } = await createScene(container, exp);

      baseTreeRef.current = baseTree;
      grassRef.current = environment.getGrass();
      setIsReady(true);

      renderer = createdRenderer;

      const clock = new THREE.Clock();

      const animate = () => {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        environment.update(t);
        baseTree.update(t);
        controls.update();
        renderer!.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer!.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      observer = new ResizeObserver(handleResize);
      observer.observe(container);
    };

    setup();

    return () => {
      if (observer && mountRef.current) observer.disconnect();
      if (renderer && mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [baseTreeRef, grassRef, setIsReady]);

  return <div ref={mountRef} className="w-full max-w-limit min-h-screen" />;
}
