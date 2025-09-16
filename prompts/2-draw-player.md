Using the image (assets/jules.png) as a spritesheet, replace the red ball with the character facing right to start and add basic control so
the user can press left/right and the sprite changes to match the direction.

Acceptance criteria:

1. A sprite system where we can provide an image and slice sections of the image to match a given sprite. In this case we should be able to add the top left and bottom right pixel locations in code and it extract the sprite from the sheet for us (in the case the player facing right has a top left of 3, 37 and a bottom right of 83, 144)
2. Additionally, we should be able to mirror the sprite, so in this case we get the player facing right from the sheet, facing left will simply be a mirrored version of this sprite.
3. It should be trivial to go in and change the top left/bottom right location for these sprites, and there should be a single source of truth for this.
4. When viewing the canvas, if I hit left the players sprite updates to the left facing version, right returns to right.
5. No other changes, no movement or anything yet just updating the sprite
