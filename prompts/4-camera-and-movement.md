The player currently changes sprite when pressing left or right. Extend this so the player moves inside a larger world, with the camera following them.

TODO:

- Extend movement so that holding left/right moves the player smoothly across the screen, not just one pixel per press.
- Releasing the key stops the player.
- Define world bounds: 3 _ canvas width (wide) and 6 _ canvas height (tall)
- Use Phaser 3 camera to follow the player as they approach the edges of the viewport
- Prevent moving beyond world boundaries (can’t go left of start, can’t go right past 3 canvases)
- Player should still be able to move back and forth within those limits

Acceptance criteria:

1. The player visibly moves left/right with arrow keys
2. Camera follows player inside a world larger than the viewport
3. Player cannot leave defined world bounds
