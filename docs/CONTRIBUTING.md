# Contribution Guidelines

## General design principles
* Strive for realism, to a reasonable extent at least.
  * If you need to nerf/buff some game element X which has the effects A and B on the game:
    <ul type="decimal" markdown="1">
      <li>  Prefer brainstorming other effects X would/could realistically have which would balance it.
        <ul><li> If this is a viable option, also leave a comment in the code explaining why this effect must be modified, and what the original/realistic value was.</li></ul>
      </li>
      <li>  If that's not viable, prefer removing A or B
         <ul><li>If this is a viable option, also leave a comment in the code explaining why X cannot have this effect.</li></ul>
      </li>
    </ul>
  * Everything should have realistic effects(if possible), but the **extent** of the effect
* Gameplay should never need to devolve into rabid clicking, aka <*click-click-click-click-click*>.
* Strategical/meaningful choices are nice, but not all decisions need to be difficult.
* Choices where choosing one option locks you out of the other options are often/usually bad.

### Complexity
* Early complexity is bad.
* Later complexity is good.
* A slow increase of complexity is good.
* A fast increase of complexity is bad.
