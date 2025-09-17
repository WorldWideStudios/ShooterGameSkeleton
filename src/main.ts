/**
 * Entry point for MetroidVania POC
 * Initializes Phaser and draws a centered red circle on a black canvas.
 * @author GitHub Copilot
 */
import Phaser from "phaser";

import { Projectile } from "./helpers/projectile";

/**
 * BallScene draws a centered red circle on a black canvas using Phaser.
 * @author GitHub Copilot
 */
class BallScene extends Phaser.Scene {
  /**
   * Reference to the player actor instance.
   */
  player: any = null; // Will be set to Player after dynamic import
  // List of active projectiles
  projectiles: Projectile[] = [];
  // Graphics layer used to draw simple primitives like projectiles
  projectilesGraphics: Phaser.GameObjects.Graphics | null = null;
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

      // Create a graphics layer for projectiles
      this.projectilesGraphics = this.add.graphics();

      // Listen for player shoot events
      this.events.on("player-shoot", (payload: any) => {
        // Decide projectile velocity based on player's state
        const speed = 6; // pixels per frame baseline at 60fps
        let vx = 0;
        let vy = 0;
        if (payload.onGround) {
          // horizontal shot in facing direction
          vx = payload.facing === "right" ? speed : -speed;
          vy = 0;
        } else {
          // upward shot while mid-air
          vx = 0;
          vy = -speed; // negative y moves up
        }

        // The player's container origin is top-left; offset to approximate gun position
        // Use a conservative offset to position the projectile near the player's center.
        const px = payload.x + 16; // approximate half-width
        const py = payload.y + 16; // approximate half-height

        const proj = new Projectile(px, py, vx, vy);
        this.projectiles.push(proj);
      });
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

    // Update projectiles
    if (this.projectiles.length > 0) {
      // Clear previous frame drawings
      if (this.projectilesGraphics) {
        this.projectilesGraphics.clear();
      }

      // Update each projectile and draw
      for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const p = this.projectiles[i];
        p.update(delta);
        // Remove if outside camera world bounds (use scene dimensions as conservative bounds)
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;
        if (
          p.x < -50 ||
          p.x > this.cameras.main.worldView.right + 50 ||
          p.y < -50 ||
          p.y > this.cameras.main.worldView.bottom + 50
        ) {
          this.projectiles.splice(i, 1);
          continue;
        }
        // Draw
        this.projectilesGraphics?.save();
        p.draw(this.projectilesGraphics!);
        this.projectilesGraphics?.restore();
      }
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
