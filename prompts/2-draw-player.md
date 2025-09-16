Using the image (assets/jules.png) as a spritesheet, replace the red ball with the character facing right. Ensure to use standard practices
to grab the image with phaser, and be absolutely sure that it will display accurately.

Acceptance criteria:

1. A sprite system where we can provide an image and slice sections of the image to match a given sprite. In this case we should be able to add the top left and bottom right pixel locations in code and it extract the sprite from the sheet for us (in the case the player facing right has a top left of 3, 37 and a bottom right of 83, 144 where these represnt the x and y of the coordinate)
   - e.g. add a function `extractSprite(path: string, coordinates: number[][])` that accepts the image path and coordinates and returns a useable phaser object
   - Be absolutely sure to use use Phaser’s built-in scene.textures.addSpriteSheet and scene.add.image to extract and display the sprite region, rather than custom canvas logic.
2. Additionally, we should be able to mirror the sprite, so in this case we get the player facing right from the sheet, facing left will simply be a mirrored version of this sprite. In this case a function `mirror(sprite)` that mirrors the sprite from left to right and returns a new, useable, phaser object
3. It should be trivial to go in and change the top left/bottom right location for these sprites, and there should be a single source of truth for this, e.g. a file `src/lib/sprites.ts` with lines like:
   export const PLAYER_RIGHT = ...
   export const PLAYER_LEFT = mirror(PLAYER_RIGHT);
   ...
4. Make sure the player character is visible and not tiny
