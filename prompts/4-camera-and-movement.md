The player currently changes sprite when pressing left or right. Update this so movement is smooth and uses Phaser 3 physics.

TODO:

- Enable Arcade physics for the player
- On left/right input, set player.body.velocity.x to a fixed speed (e.g. -200 for left, +200 for right)
- On no input, set velocity.x back to 0 so the player stops
- Camera should still follow the player within the larger world bounds (3 canvases wide, 6 tall)

Acceptance criteria:

1. Holding left/right moves the player smoothly at a constant speed
2. Releasing the key stops the player
3. Camera still follows and world bounds are enforced
