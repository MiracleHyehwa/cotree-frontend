import { Branch } from "./branch";

const TREE_COLOR = "#8B5A2B";
const LEAF_COLORS = ["#74c947", "#7ed957", "#60b939"];

interface TreeOptions {
  branchLengthScale: number;
  branchWidthScale: number;
}

export class Tree {
  private branches: Branch[][] = [];
  private leaves: { x: number; y: number }[] = [];

  private cntDepth = 0;
  private animation: number | null = null;
  private color: string;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private posX: number,
    private posY: number,
    private depth: number,
    private options: TreeOptions
  ) {
    this.color = TREE_COLOR;
    this.init();
  }

  private init() {
    for (let i = 0; i < this.depth; i++) {
      this.branches.push([]);
    }

    this.createBranch(this.posX, this.posY, -90, 0);
    this.draw();
  }

  private createBranch(x: number, y: number, angle: number, depth: number) {
    if (depth === this.depth) {
      this.leaves.push({ x, y });
      return;
    }

    const baseLen = depth === 0 ? this.random(10, 13) : this.random(0, 11);
    const scaledLen = baseLen * this.options.branchLengthScale;

    const endX = x + this.cos(angle) * scaledLen * (this.depth - depth);
    const endY = y + this.sin(angle) * scaledLen * (this.depth - depth);

    const lineWidth = (this.depth - depth) * this.options.branchWidthScale;

    this.branches[depth].push(new Branch(x, y, endX, endY, lineWidth, this.color));

    this.createBranch(endX, endY, angle - this.random(15, 23), depth + 1);
    this.createBranch(endX, endY, angle + this.random(15, 23), depth + 1);
  }

  private draw = () => {
    if (this.cntDepth === this.depth) {
      if (this.animation !== null) cancelAnimationFrame(this.animation);
      return;
    }

    let pass = true;
    for (const branch of this.branches[this.cntDepth]) {
      pass = branch.draw(this.ctx);

      if (this.cntDepth === this.depth - 1 && pass) {
        const { x, y } = branch.getEndPoint();
        this.drawLeaf(x, y);
      }
    }

    if (pass) {
      this.cntDepth++;
    }

    this.animation = requestAnimationFrame(this.draw);
  };

  private drawLeaf(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.random(3, 5), 0, Math.PI * 2);
    this.ctx.fillStyle = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
    this.ctx.fill();
    this.ctx.closePath();
  }

  private cos(angle: number) {
    return Math.cos((angle * Math.PI) / 180);
  }

  private sin(angle: number) {
    return Math.sin((angle * Math.PI) / 180);
  }

  private random(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  destroy() {
    if (this.animation !== null) {
      cancelAnimationFrame(this.animation);
      this.animation = null;
    }
  }
}
