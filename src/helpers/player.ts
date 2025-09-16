import Phaser from 'phaser';
import { PLAYER_RIGHT } from '../lib/sprites';
import { extractSprite } from './extractSprite';

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
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    // Extract the player sprite and add to container
    const sprite = extractSprite(
      scene,
      PLAYER_RIGHT.imagePath,
      PLAYER_RIGHT.topLeft as [number, number],
      PLAYER_RIGHT.bottomRight as [number, number]
    );
    this.add(sprite);
    scene.add.existing(this);
  }
}
