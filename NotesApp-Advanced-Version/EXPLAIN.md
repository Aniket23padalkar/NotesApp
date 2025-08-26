# Detail Explanation

## Description

Here my focus is to explain the updates because in the earlier version I already explained the basics in detail.

## Updates:

-   Single modal for adding and editing a note.
-   Filtering code is shorter and cleaner.
-   Dark-light mode toggle changes the icon inside the button.

## Explanation

### **Single Modal**

-   I thought the edit and add modals are similar, so why not just use the same modal for both adding and editing a note?
-   When I click edit, I made the add modal appear but with conditions.
-   First, I set a `currentEditId` variable to `null` at the top.
-   I created a function `openModal()`. I call it from the edit button's event listener with a **mode** (edit) and **note** as arguments, so it knows whether to show a blank modal (for add) or a filled one (for edit).
-   In `openModal()`:

    -   If mode is **edit** and a note is passed, first store the note’s ID in `currentEditId`, then fill the title, body, and category with the note’s data.
    -   Else, set `currentEditId` to `null`, clear the title and body, and set category to “work”.
    -   After applying the condition, open the add modal.

-   Now it’s time to **save or update the note**:

    -   There’s a single save button for both add and edit actions. In its event listener:
        -   If `currentEditId` exists, call `updateNote(currentEditId, title, body)`.
        -   Else, call `addNote(title, body)`.

-   In `updateNote()`:

    -   First find and match `currentEditId` with a note’s `id`.
    -   If a note is found, update its `title`, `body`, `category`, and `date/time` with the new values.
    -   Then close the modal.

-   For opening the add modal (with no data):
    -   In its event listener, set `currentEditId` to `null`, and clear the title and body.
    -   This ensures whenever I click **Add Note**, the modal opens blank.

---

### **Filtering Code**

-   Earlier, I wrote conditions for every specific filter.
-   Then I realized I could just get `filteredNotes` by matching `currentFilter` with `note.category`.
-   This made the code **shorter and more professional**.
-   I was getting too specific before — no need for that.

---

### **Dark Mode Toggle**

-   In the previous version, only dark mode was toggling. I improved this:
    -   If dark mode is active, a **sun icon** should appear.
    -   If light mode is active, a **moon icon** should appear.
-   Logic:

    -   If the `body` contains the `dark-mode` class:
        -   Replace the moon icon with the sun icon.
        -   Save the theme as **dark** in local storage.
    -   Else:
        -   Replace the sun icon with the moon icon.
        -   Save the theme as **light** in local storage.

-   I stored the theme in local storage and retrieved it in `loadNotesFromStorage()`.
-   Applied a condition: if the saved theme is dark, replace the moon with the sun.

---

## Final Thought

I got deeper into the logic with this version. I haven’t fully grasped everything about using a single modal for both add and edit yet, but with time and practice, I’ll get there.  
This was a **game-changing project** — I learned a lot, and it made me feel really happy and motivated.
