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
  private direction: "right" | "left" = "right";
  private sprite: Phaser.GameObjects.Image;

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
      scene.input.keyboard.on("keydown", (event: KeyboardEvent) => {
        if (event.code === "ArrowLeft" || event.code === "KeyA") {
          this.setDirection("left");
        } else if (event.code === "ArrowRight" || event.code === "KeyD") {
          this.setDirection("right");
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
}
