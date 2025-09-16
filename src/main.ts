/**
 * Entry point for MetroidVania POC
 * Initializes Phaser and draws a centered red circle on a black canvas.
 * @author GitHub Copilot
 */
import Phaser from "phaser";

/**
 * BallScene draws a centered red circle on a black canvas using Phaser.
 * @author GitHub Copilot
 */
class BallScene extends Phaser.Scene {
  constructor() {
    super("BallScene");
  }

  /**
   * Called once when the scene is created.
   * Draws a red circle in the center of the canvas.
   */
  create(): void {
    // Get center coordinates from main camera
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    // Draw a red circle in the center
    this.add.circle(centerX, centerY, 50, 0xff0000);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 600,
  height: 400,
  backgroundColor: "#000",
  parent: "game-root",
  scene: BallScene,
};

// Initialize Phaser game
new Phaser.Game(config);
