const addBtn = document.getElementById("add-btn");
const closeAddModal = document.getElementById("close-add-modal");
const saveBtn = document.getElementById("save-btn");
const closeViewModal = document.getElementById("close-view-modal");
const darkLightMode = document.getElementById("dark-light-toggle");

const searchBtn = document.getElementById("search-btn");
const navMiddle = document.querySelector(".nav-middle");
const inputClose = document.getElementById("input-close");

const addModal = document.querySelector(".add-modal");
const viewModal = document.querySelector(".view-modal");

const aside = document.getElementById("aside");
const inputCategory = document.getElementById("category");

const inputTitle = document.getElementById("input-title");
const inputBody = document.getElementById("input-body");
const viewTitle = document.getElementById("view-title");
const viewBody = document.getElementById("view-body");
const viewDate = document.getElementById("view-date");
const searchInput = document.getElementById("search-input");

const editModal = document.querySelector(".edit-modal");
const editTitle = document.getElementById("edit-title");
const editBody = document.getElementById("edit-body");
const editSaveBtn = document.getElementById("edit-save-btn");
const closeEditModal = document.getElementById("close-edit-modal");
const editCategory = document.getElementById("edit-category");

const noteCountAll = document.getElementById("note-count-all");
const noteCountPinned = document.getElementById("note-count-pinned");
const noteCountWork = document.getElementById("note-count-work");
const noteCountPersonal = document.getElementById("note-count-personal");

const filterMenu = document.querySelector(".filter-menu");
const menuClose = document.getElementById("menu-close");

const mainContainer = document.querySelector(".main-container");

let notes2 = [];
let currentEditId = null;
let currentFilter = "All";
let preActiveBtn = null;

function saveNotesToStorage() {
    localStorage.setItem("notes2", JSON.stringify(notes2));
}

function loadNotesFromStorage() {
    const stored = localStorage.getItem("notes2");

    if (stored) {
        notes2 = JSON.parse(stored);
    }

    const allBtn = document.querySelector('[data-filter = "All"]');
    if (allBtn) {
        allBtn.focus();
        updateBtnColor(allBtn);
    }

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
    renderNotes();
}

function addNote(title, body) {
    notes2.push({
        id: Date.now(),
        title,
        body,
        category: inputCategory.value,
        date: new Date().toLocaleString(),
    });
}

function updateNoteColor(category) {
    if (category === "Pinned") return "#00A896";
    else if (category === "Work") return "#00adc4ff";
    else if (category === "Personal") return "#05668D";
    else return "default";
}

function updateTextColor(category) {
    if (category === "Personal") return "#cfcfcfff";
    else return "#000000";
}

function updateBtnColor(activeBtn) {
    if (preActiveBtn) {
        preActiveBtn.style.background = "var(--filter-btn-bg-color)";
    }

    if (currentFilter === "All")
        activeBtn.style.background =
            "linear-gradient(to left, #00adc4ff, #00a896, #05668d)";
    else if (currentFilter === "Pinned") activeBtn.style.background = "#00a896";
    else if (currentFilter === "Work") activeBtn.style.background = "#00adc4ff";
    else if (currentFilter === "Personal")
        activeBtn.style.background = "#05668d";

    preActiveBtn = activeBtn;
}

function deleteNote(id) {
    notes2 = notes2.filter((note) => note.id !== id);
    saveNotesToStorage();
    renderNotes();
}

function viewNoteModal(note) {
    viewTitle.textContent = note.title;
    viewBody.textContent = note.body;
    viewDate.textContent = note.date;
    viewModal.classList.remove("hidden");
}

function openEditModal(noteId) {
    const note = notes2.find((note) => note.id === noteId);

    if (note) {
        editTitle.value = note.title;
        editBody.value = note.body;
        editCategory.value = note.category;

        currentEditId = noteId;

        editModal.classList.remove("hidden");
    }
}

function renderNotes(currentFilter) {
    mainContainer.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();
    let filteredNotes = [];

    if (currentFilter === "Pinned") {
        filteredNotes = notes2.filter((note) => note.category === "Pinned");
    } else if (currentFilter === "Work") {
        filteredNotes = notes2.filter((note) => note.category === "Work");
    } else if (currentFilter === "Personal") {
        filteredNotes = notes2.filter((note) => note.category === "Personal");
    } else {
        filteredNotes = notes2;
    }

    if (searchText) {
        filteredNotes = filteredNotes.filter(
            (note) =>
                note.title.toLowerCase().includes(searchText) ||
                note.body.toLowerCase().includes(searchText)
        );
    }

    filteredNotes.forEach((note) => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");
        noteCard.style.background = updateNoteColor(note.category);

        const noteTextContainer = document.createElement("div");
        noteTextContainer.classList.add("note-text-container");

        const noteHeader = document.createElement("div");
        noteHeader.innerHTML = `<h3>${note.title}</h3>`;
        noteHeader.classList.add("note-header");
        noteHeader.style.color = updateTextColor(note.category);

        const notePara = document.createElement("div");
        notePara.innerHTML = `<p>${note.body}</p>`;
        notePara.classList.add("note-para");
        notePara.style.color = updateTextColor(note.category);

        const noteDate = document.createElement("small");
        noteDate.textContent = note.date;
        noteDate.classList.add("note-date");

        const noteActions = document.createElement("div");
        noteActions.classList.add("note-actions");

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        editBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            openEditModal(note.id);
        });

        const trashBtn = document.createElement("button");
        trashBtn.classList.add("trash-btn");
        trashBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        trashBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteNote(note.id);
        });

        noteActions.appendChild(editBtn);
        noteActions.appendChild(trashBtn);
        noteTextContainer.appendChild(noteHeader);
        noteTextContainer.appendChild(notePara);
        noteCard.appendChild(noteTextContainer);
        noteCard.appendChild(noteDate);
        noteCard.appendChild(noteActions);

        noteCard.addEventListener("click", () => viewNoteModal(note));
        mainContainer.appendChild(noteCard);
    });

    noteCountAll.textContent = notes2.length;

    noteCountPinned.textContent = notes2.filter(
        (note) => note.category === "Pinned"
    ).length;

    noteCountWork.textContent = notes2.filter(
        (note) => note.category === "Work"
    ).length;

    noteCountPersonal.textContent = notes2.filter(
        (note) => note.category === "Personal"
    ).length;
}

saveBtn.addEventListener("click", () => {
    const title = inputTitle.value.trim();
    const body = inputBody.value.trim();

    if (!title || !body) {
        alert("Input and body can not be empty");
    } else if (title && body) {
        addNote(title, body);
    }

    saveNotesToStorage();
    renderNotes();

    inputTitle.value = "";
    inputBody.value = "";
    addModal.classList.add("hidden");
});

editSaveBtn.addEventListener("click", () => {
    const noteId = notes2.find((note) => note.id === currentEditId);

    if (noteId) {
        noteId.title = editTitle.value.trim();
        noteId.body = editBody.value.trim();
        noteId.category = editCategory.value;
        noteId.date = new Date().toLocaleString();
        saveNotesToStorage();
        renderNotes();
    }

    editModal.classList.add("hidden");
});

aside.addEventListener("click", (e) => {
    const filterBtn = e.target.closest(".filter-btn");

    if (filterBtn) {
        currentFilter = filterBtn.dataset.filter;
        renderNotes(currentFilter);
        updateBtnColor(filterBtn);
    }
});

addBtn.addEventListener("click", () => {
    addModal.classList.remove("hidden");
});

closeAddModal.addEventListener("click", () => {
    addModal.classList.add("hidden");
});

closeViewModal.addEventListener("click", () => {
    viewModal.classList.add("hidden");
});

closeEditModal.addEventListener("click", () => {
    editModal.classList.add("hidden");
});

searchInput.addEventListener("input", () => {
    renderNotes();
});

filterMenu.addEventListener("click", () => {
    aside.style.display = "flex";
    const allBtn = document.querySelector('[data-filter = "All"]');
    if (allBtn) {
        allBtn.focus();
        updateBtnColor(allBtn);
    }
});

menuClose.addEventListener("click", () => {
    aside.style.display = "none";
});

darkLightMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const theme = document.body.classList.contains("dark-mode")
        ? "dark"
        : "light";

    localStorage.setItem("theme", theme);
});

searchBtn.addEventListener("click", () => {
    navMiddle.classList.toggle("active");
    searchInput.classList.toggle("active");

    if (navMiddle.classList.contains("active")) {
        inputClose.style.display = "block";
        searchInput.focus();
    } else {
        inputClose.style.display = "none";
    }
});

inputClose.addEventListener("click", () => {
    navMiddle.classList.remove("active");
    searchInput.classList.remove("active");
    inputClose.style.display = "none";
});

loadNotesFromStorage();
