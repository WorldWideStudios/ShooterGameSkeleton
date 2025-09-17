import Phaser from "phaser";
import { PLAYER_RIGHT, PLAYER_LEFT, mirror } from "../lib/sprites";
import { extractSprite } from "./extractSprite";

/**
 * Player actor class for the main character.
 * Uses PLAYER_RIGHT sprite coordinates and image.
 * @author GitHub Copilot
 */
export class Player extends Phaser.GameObjects.Container {
  /**
   * Creates the player actor and adds the sprite to the container.
   * @param scene - The Phaser scene instance
   * @param x - Initial x position
   * @param y - Initial y position
   */
  /**
   * Current facing direction of the player.
   */
  private direction: "right" | "left" = "right";
  /**
   * Player sprite image.
   */
  private sprite: Phaser.GameObjects.Image;
  /**
   * Current horizontal velocity (pixels per frame).
   */
  private velocityX: number = 0;
  /**
   * Maximum movement speed in pixels per frame.
   */
  private readonly maxSpeed: number = 4;
  /**
   * World bounds for clamping movement (set externally).
   */
  public worldBounds: Phaser.Geom.Rectangle | null = null;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    // Extract the player sprite and add to container
    this.sprite = extractSprite(
      scene,
      PLAYER_RIGHT.imagePath,
      PLAYER_RIGHT.topLeft as [number, number],
      PLAYER_RIGHT.bottomRight as [number, number]
    );
    this.add(this.sprite);
    scene.add.existing(this);

    // Setup keyboard input for left/right
    // Feature detection for keyboard input
    if (scene.input && scene.input.keyboard) {
      const cursors = scene.input.keyboard.createCursorKeys();
      // Handle keydown for movement
      scene.input.keyboard.on("keydown", (event: KeyboardEvent) => {
        if (event.code === "ArrowLeft" || event.code === "KeyA") {
          this.setDirection("left");
          this.velocityX = -this.maxSpeed;
        } else if (event.code === "ArrowRight" || event.code === "KeyD") {
          this.setDirection("right");
          this.velocityX = this.maxSpeed;
        }
      });
      // Handle keyup to stop movement
      scene.input.keyboard.on("keyup", (event: KeyboardEvent) => {
        if (
          event.code === "ArrowLeft" ||
          event.code === "KeyA" ||
          event.code === "ArrowRight" ||
          event.code === "KeyD"
        ) {
          this.velocityX = 0;
        }
      });
    } else {
      // Log error if keyboard input is not available
      console.error("Phaser keyboard input not available in this scene.");
    }
  }

  /**
   * Sets the direction and updates the sprite accordingly.
   * @param dir - "left" or "right"
   */
  setDirection(dir: "left" | "right") {
    if (this.direction === dir) return;
    this.direction = dir;
    if (dir === "left" && PLAYER_LEFT.mirrored) {
      // Mirror the sprite horizontally using the shared helper
      mirror(this.sprite);
    } else {
      // Reset to normal orientation
      this.sprite.setScale(1, 1);
    }
  }

  /**
   * Updates the player's position based on velocity and clamps to world bounds.
   * Should be called from the scene's update loop.
   * @param time - Current time
   * @param delta - Time since last update
   */
  update(time: number, delta: number) {
    // Move horizontally by velocity
    this.x += this.velocityX;
    // Clamp to world bounds if set
    if (this.worldBounds) {
      this.x = Phaser.Math.Clamp(
        this.x,
        this.worldBounds.left,
        this.worldBounds.right
      );
    }
  }
}
