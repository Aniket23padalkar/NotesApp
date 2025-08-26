# Detail Explanation

From my earlier projects, I learned the importance of proper class, ID, and semantic tag naming so I don’t get confused while selecting elements in JavaScript. I also realized that every important element should have a class or ID.

---

## HTML

-   Used semantic tags like `header`, `nav`, `main`, and `aside` to keep things clean and readable.
-   Built **three modals**:
    -   Add modal – to add a note
    -   Edit modal – to edit a note
    -   View modal – to just view a note
-   Used `aside` for filter buttons.

---

## CSS

-   Used **grid** for the main layout and **flexbox** for the header.
-   Saved all colors in variables to make a dark mode toggle easier (learned this the hard way in my old projects, so I decided to pick colors first this time instead of adding them later).
-   Inputs are fully responsive.
-   Honestly, this app looks **better on mobile**, especially the search input pop-out—it feels super polished.

---

## JavaScript

-   Started by adding event listeners to open and close modals.
-   Built note creation logic:

    -   Trimmed inputs, and if either field is empty, it shows an alert.
    -   Notes are saved to an array and stored in **localStorage** (stringified) so they’re still there after a refresh.
    -   `addNote()` pushes the note, saves it, and calls `renderNotes()`.
    -   Cleared input fields after saving so the modal opens empty next time.

-   Added a **view modal** to read notes and a **trash button** to delete them (used `stopPropagation()` to avoid breaking event listeners when clicking the trash icon).

-   For **editing**:

    -   `openEditModal()` pre-fills data using `note.id`.
    -   Saved changes update title, body, and date, then re-render everything.

-   **Filtering** was where I leveled up:

    -   Switched from adding listeners to each button with `forEach` to using **event delegation** on `aside`. Way cleaner.
    -   Stored the clicked filter in `currentFilter` (a global `let`), so I can reuse it.
    -   `renderNotes()` now loops over `filteredNotes`, not all notes, to only show what’s needed.
    -   Also updated note counts dynamically using `.length`.

-   Added `updateNoteColor()` to color notes based on category, and `updateBtnColor()` to show which filter is active.

-   **Dark mode** toggle just switches a class, and I saved the theme in storage so it remembers your choice.

-   On page load, the **All** button is auto-focused.
-   Built a small-screen search input toggle effect, which was a bit tricky but worth it.

---

## Final Thoughts

This project started out accidental but ended up teaching me a lot. I learned about event delegation, localStorage, dynamic rendering, and better planning before coding. JavaScript logic feels way cleaner now, and I’m glad I took the time to push this one.
