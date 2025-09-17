Building off of movement, lets add jumping with the up arrow.

TODO:

- extend the player actor to jump when pressing the up arrow key
  - Jump should raise and fall smoothly over multiple frames
  - Jump height should be 1.5x the players height
  - Allow a double jump (max 2 jumps before landing)
  - Reset jump count when the player lands
- Ensure the player always lands on a ground level (the bottom of the canvas)
  - The player cannot fall below this ground

Acceptance Criteria:

1. The player can jump and double jump with UP, landing reliably on the ground
