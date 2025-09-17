import Phaser from "phaser";
import { PLAYER_RIGHT, PLAYER_LEFT, mirror } from "../lib/sprites";
import { extractSprite } from "./extractSprite";

/**
 * Player actor class for the main character.
 * Uses PLAYER_RIGHT sprite coordinates and image.
 * @author GitHub Copilot
 */
export class Player extends Phaser.GameObjects.Container {
  // Expose common GameObject properties so TypeScript accepts direct access
  public x!: number;
  public y!: number;
  public scene!: Phaser.Scene;
  // Container.add exists on Phaser.Container; use definite assignment to satisfy TS
  public add!: (...children: any[]) => this;
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
   * Current vertical velocity (pixels per frame).
   */
  private velocityY: number = 0;
  /**
   * Gravity applied each frame (pixels per frame^2).
   */
  private readonly gravity: number = 0.6;
  /**
   * Whether the player is currently on the ground.
   */
  private onGround: boolean = false;
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

    // Position player at requested x and align to ground so initial position is bottom of canvas
    const sceneHeight = (scene.game.config.height as number) || 400;
    const worldBottom = this.worldBounds
      ? this.worldBounds.bottom
      : sceneHeight;
    const spriteHeight = this.sprite.displayHeight || this.sprite.height || 32;
    const maxY = worldBottom - spriteHeight;
    // If provided y is below maxY (higher on screen), keep it; otherwise snap to ground
    this.y = Math.min(y, maxY);
    if (this.y >= maxY) {
      this.onGround = true;
      this.velocityY = 0;
    }

    // Setup keyboard input for left/right
    // Feature detection for keyboard input
    if (scene.input && scene.input.keyboard) {
      const cursors = scene.input.keyboard.createCursorKeys();
      // Handle keydown for movement and jumping
      scene.input.keyboard.on("keydown", (event: KeyboardEvent) => {
        if (event.code === "ArrowLeft" || event.code === "KeyA") {
          this.setDirection("left");
          this.velocityX = -this.maxSpeed;
        } else if (event.code === "ArrowRight" || event.code === "KeyD") {
          this.setDirection("right");
          this.velocityX = this.maxSpeed;
        } else if (event.code === "ArrowUp" || event.code === "KeyW") {
          // Jump only if currently on the ground
          if (this.onGround) {
            // Compute jump velocity required to reach target height (1.5 * player height)
            const height =
              this.sprite.displayHeight || this.sprite.height || 32;
            const target = 1.5 * height;
            // Using v = sqrt(2 * g * h) but our gravity is per-frame; compute accordingly
            this.velocityY = -Math.sqrt(2 * this.gravity * target);
            this.onGround = false;
          }
        } else if (event.code === "Space") {
          // Emit a shoot event on the scene so the scene can spawn a projectile
          // Provide current player world position and state via payload
          const payload = {
            x: this.x,
            y: this.y,
            facing: this.direction,
            onGround: this.onGround,
          };
          // Use Phaser's event emitter available on the scene
          (this.scene.events as Phaser.Events.EventEmitter).emit(
            "player-shoot",
            payload
          );
        }
      });
      // Handle keyup to stop horizontal movement
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
    // Apply vertical physics
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    // Clamp to world bounds if set (horizontal)
    if (this.worldBounds) {
      this.x = Phaser.Math.Clamp(
        this.x,
        this.worldBounds.left,
        this.worldBounds.right
      );
      // Ground is bottom of the visible camera (scene.game.config.height) or worldBounds bottom
      const sceneHeight = (this.scene.game.config.height as number) || 400;
      const groundY = this.worldBounds ? this.worldBounds.bottom : sceneHeight;
      // Since sprite origin is 0,0 in extractSprite, player container's y represents top; adjust by sprite height
      const spriteHeight =
        this.sprite.displayHeight || this.sprite.height || 32;
      const maxY = groundY - spriteHeight;
      if (this.y >= maxY) {
        this.y = maxY;
        this.velocityY = 0;
        this.onGround = true;
      }
    }
  }
}
