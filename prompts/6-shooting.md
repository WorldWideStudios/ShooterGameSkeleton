Lets extend our player again to add shooting similar to metroid or basic megaman style shooting.

TODO:

- Extend the player actor so that pressing SPACE spawns a red ball projectile
  - The ball should be a visible object
  - If the player is standing, it travels horizontally in the facing direction
  - If the player is mid-jump, it travels upward
  - Each press spawns a new ball; multiple presses = multiple projectiles
  - Balls should move continuously until they leave the screen

Acceptance Criteria:

2. The player can shoot red balls with SPACE
3. Ball direction depends on whether the player is standing or jumping
4. Multiple balls can exist at once and move independently
