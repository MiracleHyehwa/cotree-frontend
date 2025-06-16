import { useEffect, useRef } from "react";
import { Tree } from "./tree";
import { getTreeParametersFromExp } from "../lib";

interface TreeCanvasProps {
  exp: number;
}

export function TreeCanvas({ exp }: TreeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const treeRef = useRef<Tree | null>(null);

  useEffect(() => {
    const drawTree = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = (canvas.width = canvas.clientWidth);
      const height = (canvas.height = canvas.clientHeight);
      ctx.clearRect(0, 0, width, height);

      const x = width / 2;
      const y = height * 0.96;

      const baseHeight = 600;
      const scaleRatio = Math.min(height / baseHeight, 1.0);

      const { depth, branchLengthScale, branchWidthScale } = getTreeParametersFromExp(exp);
      if (treeRef.current) {
        treeRef.current.destroy?.();
      }

      treeRef.current = new Tree(ctx, x, y, depth, {
        branchLengthScale: branchLengthScale * scaleRatio,
        branchWidthScale,
      });
    };

    drawTree();
    window.addEventListener("resize", drawTree);

    return () => {
      window.removeEventListener("resize", drawTree);
      treeRef.current?.destroy?.();
    };
  }, [exp]);

  return (
    <div className="w-full max-w-limit aspect-[3/4] relative">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
