import Phaser from 'phaser';
import { PLAYER_RIGHT } from '../lib/sprites';

/**
 * Extracts a sprite from a spritesheet using Phaser's built-in methods.
 *
 * @param scene - The Phaser scene instance
 * @param imagePath - Path to the spritesheet image
 * @param topLeft - [x, y] coordinates for the top-left of the sprite
 * @param bottomRight - [x, y] coordinates for the bottom-right of the sprite
 * @returns The Phaser GameObject representing the extracted sprite
 * @throws If the image cannot be loaded or coordinates are invalid
 * @author GitHub Copilot
 */
export function extractSprite(
  scene: Phaser.Scene,
  imagePath: string,
  topLeft: [number, number],
  bottomRight: [number, number]
): Phaser.GameObjects.Image {
  // Calculate width and height from coordinates
  const width = bottomRight[0] - topLeft[0];
  const height = bottomRight[1] - topLeft[1];

  /**
   * Ensure the image is loaded before using. This should be done in the scene's preload method:
   * scene.load.image(key, imagePath);
   * Here, we assume the image is already loaded and available in the texture manager.
   */
  if (!scene.textures.exists(imagePath)) {
    throw new Error(`Texture ${imagePath} not loaded. Please load it in the scene's preload method.`);
  }

  // Add the image to the scene at the correct position and crop to the sprite region
  const sprite = scene.add.image(0, 0, imagePath);
  sprite.setCrop(topLeft[0], topLeft[1], width, height);
  sprite.setOrigin(0, 0);
  return sprite;
}
