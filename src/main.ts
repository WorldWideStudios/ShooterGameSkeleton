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
   * Preload assets for the scene.
   * Loads the player sprite image.
   */
  preload(): void {
    this.load.image('assets/jules.png', 'assets/jules.png');
  }

  /**
   * Called once when the scene is created.
   * Adds the player sprite in the center of the canvas.
   */
  create(): void {
    // Get center coordinates from main camera
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    // Add the player actor at the center
    // Import Player class
    // @ts-ignore
    import('./helpers/player').then(({ Player }) => {
      new Player(this, centerX, centerY);
    });
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
