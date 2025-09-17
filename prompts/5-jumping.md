Building off of movement, add jumping with the UP arrow.

TODO:

- Add vertical velocity and gravity variables to the player
- When UP is pressed:
  - If jump count < 2, set velocity to a negative value (jump up)
  - Increment jump count
- Each frame:
  - Apply gravity to velocity
  - Add velocity to player.y
  - If player.y + player.height >= groundLevel (bottom of canvas):
    - Snap player.y to groundLevel
    - Reset velocity to 0
    - Reset jump count
- Jump height should peak at ~1.5x the player's height

Acceptance Criteria:

1. Pressing UP makes the player rise and fall smoothly
2. Player can jump again in mid-air (max 2 jumps before landing)
3. Player always lands on ground and cannot fall through it
