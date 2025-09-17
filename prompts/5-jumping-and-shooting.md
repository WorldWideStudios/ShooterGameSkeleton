Building off of movement, lets add jumping with the up arrow and shooting with space.

TODO:

- extend the player actor to jump when pressing the up arrow key
  - Jump should raise and fall smoothly over multiple frames
  - Jump height should be 1.5x the players height
  - Allow a double jump (max 2 jumps before landing)
  - Reset jump count when the player lands
- Ensure the player always lands on a ground level (the bottom of the canvas)
  - The player cannot fall below this ground
- Extend the player actor so that pressing SPACE spawns a red ball projectile
  - The ball should be a visible object
  - If the player is standing, it travels horizontally in the facing direction
  - If the player is mid-jump, it travels upward
  - Each press spawns a new ball; multiple presses = multiple projectiles
  - Balls should move continuously until they leave the screen

Acceptance Criteria:

1. The player can jump and double jump with UP, landing reliably on the ground
2. The player can shoot red balls with SPACE
3. Ball direction depends on whether the player is standing or jumping
4. Multiple balls can exist at once and move independently
