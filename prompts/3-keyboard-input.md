Building off of the basic player we have now, update them so that they have a mirrored sprite for facing left and when we press the left or
right button the sprite changes to match the direction.

TODO:

- Reuse the existing PLAYER_RIGHT sprite
- Create `mirror` function that accepts a phaser sprite and mirrors it horizontally
- Add new sprite PLAYER_LEFT that mirrors PLAYER_RIGHT in src/lib/sprites.ts
- Add support for pressing left/right keys
- Update the player actor to change sprite based on which key was last pressed

Acceptance Criteria:

1. When pressing the left/right keys you can visibly see the player switch directions
