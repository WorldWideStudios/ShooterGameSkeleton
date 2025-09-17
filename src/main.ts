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
  /**
   * Reference to the player actor instance.
   */
  player: any = null; // Will be set to Player after dynamic import
  constructor() {
    super("BallScene");
  }

  /**
   * Preload assets for the scene.
   * Loads the player sprite and background image.
   */
  preload(): void {
    this.load.image("assets/jules.png", "assets/jules.png");
    this.load.image("background", "assets/background.png");
  }

  /**
   * Called once when the scene is created.
   * Sets up world bounds, background, player, and camera.
   */
  create(): void {
    // Define world size (3x width, 6x height)
    const worldWidth = this.cameras.main.width * 3;
    const worldHeight = this.cameras.main.height * 6;
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.physics?.world?.setBounds(0, 0, worldWidth, worldHeight);

    // Tile background image to fill world
    const bgTex = this.textures.get("background");
    if (bgTex && bgTex.getSourceImage()) {
      const bgWidth = bgTex.getSourceImage().width;
      const bgHeight = bgTex.getSourceImage().height;
      for (let x = 0; x < worldWidth; x += bgWidth) {
        for (let y = 0; y < worldHeight; y += bgHeight) {
          this.add
            .image(x + bgWidth / 2, y + bgHeight / 2, "background")
            .setOrigin(0.5, 0.5);
        }
      }
    }

    // Center player in world
    const startX = this.cameras.main.width / 2;
    const startY = this.cameras.main.height / 2;
    // Import Player class
    import("./helpers/player").then(({ Player }) => {
      /**
       * Create player and set world bounds for movement
       */
      const player = new Player(this, startX, startY);
      player.worldBounds = new Phaser.Geom.Rectangle(
        0,
        0,
        worldWidth,
        worldHeight
      );

      // Camera follows player, clamped to world bounds
      this.cameras.main.startFollow(player, true, 0.1, 0.1);
      this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

      // Store player for update loop
      this.player = player;
    });
  }

  /**
   * Update loop for scene. Moves player and camera.
   * @param time - Current time
   * @param delta - Time since last update
   */
  update(time: number, delta: number): void {
    // Update player position if loaded
    if (this.player && typeof this.player.update === "function") {
      this.player.update(time, delta);
    }
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
