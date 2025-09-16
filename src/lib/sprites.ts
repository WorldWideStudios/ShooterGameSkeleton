/**
 * Sprite coordinate constants for the player character facing right.
 *
 * @author GitHub Copilot
 */
export const PLAYER_RIGHT = {
  /** Top-left x, y coordinates of the sprite in the sheet */
  topLeft: [3, 37],
  /** Bottom-right x, y coordinates of the sprite in the sheet */
  bottomRight: [83, 144],
  /** Path to the spritesheet image */
  imagePath: "assets/jules.png",
};

/**
 * Sprite coordinate constants for the player character facing left.
 * This mirrors PLAYER_RIGHT horizontally.
 *
 * @author GitHub Copilot
 */
export const PLAYER_LEFT = {
  topLeft: [3, 37],
  bottomRight: [83, 144],
  imagePath: "assets/jules.png",
  mirrored: true, // Used to indicate this should be mirrored in rendering logic
};

/**
 * Mirrors a Phaser sprite horizontally by setting scaleX to -1.
 * Usage: Call this on the sprite instance if its config has `mirrored: true`.
 * @param sprite - The Phaser.GameObjects.Sprite instance
 * @author GitHub Copilot
 */
/**
 * Mirrors a Phaser sprite or image horizontally by setting scaleX to -1.
 * Accepts both Sprite and Image types.
 * @param sprite - The Phaser.GameObjects.Sprite or Image instance
 * @author GitHub Copilot
 */
export function mirror(
  sprite: Phaser.GameObjects.Sprite | Phaser.GameObjects.Image
): void {
  sprite.setScale(-1, 1);
}
