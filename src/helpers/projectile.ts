import Phaser from "phaser";

/**
 * Simple projectile class represented as a red circle.
 * Projectiles are simple objects (not Phaser Sprites) and are drawn using the scene's graphics.
 */
export class Projectile {
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;
  public radius: number = 6;
  public color: number = 0xff0000; // red

  constructor(x: number, y: number, vx: number, vy: number) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  /**
   * Update position by velocity scaled by delta (ms -> frames assumed 60fps baseline).
   * @param delta - ms since last update
   */
  update(delta: number) {
    // Convert delta (ms) to a simple frame-scale factor. Keep movement smooth across frame rates.
    const dt = delta / 16.6667; // ~60fps baseline
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  /**
   * Draw the projectile using a Phaser Graphics instance.
   * @param g - Phaser Graphics
   */
  draw(g: Phaser.GameObjects.Graphics) {
    g.fillStyle(this.color, 1);
    g.fillCircle(this.x, this.y, this.radius);
  }
}
