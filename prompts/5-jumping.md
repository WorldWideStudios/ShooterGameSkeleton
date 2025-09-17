Building off of movement, lets add jumping with the up arrow.

TODO:

- extend the player actor to jump when pressing the up arrow key
  - Jump should raise and fall smoothly over multiple frames
  - Jump height should be 1.5x the players height
- Ensure the player always lands on a ground level (the bottom of the canvas)
  - The player cannot fall below this ground

Acceptance Criteria:

1. The players initial position is at the bottom of the canvas
2. When pressing the up arrow key, the player sprite moves upward and then falls back down
3. When the player falls, they land on the ground and don't fall below the lowest screen.
