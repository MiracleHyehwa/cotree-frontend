export class Branch {
  constructor(
    private startX: number,
    private startY: number,
    private endX: number,
    private endY: number,
    private lineWidth: number,
    private color: string
  ) {
    this.gapX = (endX - startX) / this.frame;
    this.gapY = (endY - startY) / this.frame;
    this.currentX = startX;
    this.currentY = startY;
    this.color = this.getColorFromLineWidth(lineWidth);
  }

  private frame = 5;
  private cntFrame = 0;
  private gapX: number;
  private gapY: number;
  private currentX: number;
  private currentY: number;

  private getColorFromLineWidth(lineWidth: number): string {
    const baseHue = 30;
    const saturation = 60;
    const lightness = Math.max(20, 60 - lineWidth * 2);
    return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
  }

  draw(ctx: CanvasRenderingContext2D): boolean {
    if (this.cntFrame === this.frame) return true;

    ctx.beginPath();
    this.currentX += this.gapX;
    this.currentY += this.gapY;

    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.currentX, this.currentY);

    ctx.lineWidth =
      this.lineWidth < 3
        ? 0.5
        : this.lineWidth < 7
        ? this.lineWidth * 0.7
        : this.lineWidth < 10
        ? this.lineWidth * 0.9
        : this.lineWidth;

    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();

    this.cntFrame++;
    return false;
  }

  getEndPoint() {
    return { x: this.endX, y: this.endY };
  }
}
