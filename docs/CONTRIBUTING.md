

## PLEASE NOTE:
    The guidelines in this document are currently optional.
    As such, you may skip reading them if you want to.
    They may become obligatory in the future if deemed necessary.
&nbsp;
 
&nbsp;
 
&nbsp;
# Contribution Guidelines
## Design principles (Issues and Pull Requests)
### Theme: Realism
* Strive for realism, to a reasonable extent at least.
* If you need to nerf/buff some game element X which has the effects A and B on the game:
  <ul type="decimal" markdown="1">
    <li>  Prefer brainstorming other effects X would/could realistically have which would balance it.
      <ul><li> If this is a viable option,
      also leave a comment in the code explaining why this effect must be modified,
      and what the original/realistic value was.</li></ul>
    </li>
    <li>  If that's not viable, prefer removing A or B
      <ul><li>If this is a viable option, also leave a comment in the code explaining why X cannot have this effect.</li></ul>
    </li>
  </ul>
### Complexity
* Early complexity is bad.
* Later complexity is good.
* A slow increase of complexity is good.
* A fast increase of complexity is bad.
### General
* Gameplay should never need to devolve into rabid clicking, aka <*click-click-click-click-click*>.
* Strategical/meaningful choices are nice, but not all decisions need to be difficult.
* Choices where choosing one option locks you out of the other options are often/usually bad.
* If you're unsure about whether something fits, feel free to send it in and we'll have a look at it. You could also ask using an issue labeled *Question*.

## Coding Conventions (Pull Requests)
* A couple inconsistencies or mistakes in following these coding conventions are to be expected,
and you won't be judged for it, but we might change them or ask you to change them.
* Tabs for indentation(1 per level), spaces for alignment(as many as necessary).
* Indentation uses tabs, 1 per level
* Alignment uses spaces, as many as necessary. Avoid overdoing alignment, as makes changing the code more difficult.
* Readable code is better than clever code.
* Use `const` when possible, use `let` otherwise. Avoid `var` unless absolutely necessary.
* Place a space...
  * on both sides of binary operators:
    <details><summary>Examples</summary>
    <!--
        Try to not fiddle too much with this part,
        as there are some peculiar things going on.
        To give you a bit of an idea: Syntactically
        significant whitespace in HTML somehow???
        
        To sum it up: Here be dark and foul magic, so tread carefully,
        ye poor unfortunate souls who venture in these treacherous lands,
        lest ye lose soul and sanity in these cursed catacombs of code.
        
                                                                  Azarlak
    -->
    
    <p>
    
    <!--  Don't remove the empty line above this or everything breaks. -->
    ```javascript
    // Arithmetic
    A + B;   A * B;   A ** B;   A % B;
    A - B;   A / B;
    
    // Assignment
    A = B;   A += B;   A *= B;   A **= B;   A &= B;   A ^= B;   A <<= B;   A >>>= B;
             A -= B;   A /= B;              A |= B;   A %= B;   A >>= B;
    
    // Comparison
    A === B;   A == B;   A > B;   A >= B;
    A !== B;   A != B;   A < B;   A <= B;
    
    // Boolean
    A && B;
    A || B;
    
    // Bitwise
    A & B;   A << B;   A ^ B;
    A | B;   A >> B;   A >>> B;
    ```
    </p>
    </details>
  * on both sides of ternary operators:
    ```javascript
    A ? B : C;
    ```
* **Don't** place a space...
  * between a variable and a unary operator acting on it:
    ```javascript
    A++;   ++A;   !A;   +A;
    A--;   --A;   ~A;   -A;
    ```
