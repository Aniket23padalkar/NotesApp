const addBtn = document.getElementById("add-btn");
const closeAddModal = document.getElementById("close-add-modal");
const saveBtn = document.getElementById("save-btn");
const closeViewModal = document.getElementById("close-view-modal");
const aside = document.getElementById("aside");
const darkLightBtn = document.getElementById("dark-light-toggle");

const filterMenu = document.querySelector(".filter-menu");
const menuClose = document.getElementById("menu-close");
const searchBtn = document.getElementById("search-btn");
const navMiddle = document.querySelector(".nav-middle");
const inputClose = document.getElementById("input-close");

const addModal = document.querySelector(".add-modal");
const searchInput = document.getElementById("search-input");

const viewModal = document.querySelector(".view-modal");
const viewTitle = document.getElementById("view-title");
const viewBody = document.getElementById("view-body");
const viewDate = document.getElementById("view-date");

const inputTitle = document.getElementById("input-title");
const inputBody = document.getElementById("input-body");
const inputCategory = document.getElementById("category");

const noteCountAll = document.getElementById("note-count-all");
const noteCountPinned = document.getElementById("note-count-pinned");
const noteCountWork = document.getElementById("note-count-work");
const noteCountPersonal = document.getElementById("note-count-personal");

const mainContainer = document.querySelector(".main-container");

let notes = [];
let noteEditId = null;
let currentFilter = "All";
let preActiveBtn = null;

function saveNotesToStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotesFromStorage() {
    const stored = localStorage.getItem("notes");
    const saveTheme = localStorage.getItem("theme");

    if (stored) {
        notes = JSON.parse(stored);
    }

    if (saveTheme === "dark") {
        document.body.classList.add("dark-mode");
        darkLightBtn.querySelector("i").classList.replace("fa-moon", "fa-sun");
    }

    const allBtn = document.querySelector('[data-filter = "All"]');
    if (allBtn) {
        allBtn.focus();
        updateBtnColor(allBtn);
    }

    renderNotes();
}

function addNote(title, body) {
    notes.push({
        id: Date.now(),
        title,
        body,
        category: inputCategory.value,
        date: new Date().toLocaleString(),
    });
}

function updateBtnColor(activeBtn) {
    if (preActiveBtn) {
        preActiveBtn.style.background = "var(--filter-btn-bg-color)";
    }

    if (currentFilter === "All") {
        activeBtn.style.background =
            "linear-gradient(to left, #00adc4ff, #00a896, #05668d)";
    } else if (currentFilter === "Pinned") {
        activeBtn.style.background = "#00a896";
    } else if (currentFilter === "Work") {
        activeBtn.style.background = "#00adc4ff";
    } else if (currentFilter === "Personal") {
        activeBtn.style.background = "#05668d";
    }

    preActiveBtn = activeBtn;
}

function updateNoteColor(category) {
    if (category === "Pinned") return "#00A896";
    else if (category === "Work") return "#00adc4ff";
    else if (category === "Personal") return "#05668D";
    else return "default";
}

function updateHeaderColor(category) {
    if (category === "Personal") return "#cccccc";
    else return "#000000ee";
}

function deleteNote(id) {
    notes = notes.filter((note) => note.id !== id);
    saveNotesToStorage();
    renderNotes();
}

function openModal(mode, note = null) {
    if (mode === "edit" && note) {
        noteEditId = note.id;
        inputTitle.value = note.title;
        inputBody.value = note.body;
        inputCategory.value = note.category;
    } else {
        noteEditId = null;
        inputTitle.value = "";
        inputBody.value = "";
        inputCategory.value = "Work";
    }

    addModal.classList.remove("hidden");
}

function updateNote(id, title, body) {
    const note = notes.find((n) => n.id === id);

    if (note) {
        note.title = title;
        note.body = body;
        note.category = inputCategory.value;
        note.date = new Date().toLocaleString();
    }
}

function viewNoteModal(note) {
    viewTitle.textContent = note.title;
    viewBody.textContent = note.body;
    viewDate.textContent = note.date;
    viewModal.classList.remove("hidden");
}

function renderNotes() {
    mainContainer.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();
    let filteredNotes = [];

    if (currentFilter === "All") {
        filteredNotes = notes;
    } else {
        filteredNotes = notes.filter((note) => note.category === currentFilter);
    }

    const finalNotes = filteredNotes.filter(
        (note) =>
            note.title.toLowerCase().includes(searchText) ||
            note.body.toLowerCase().includes(searchText)
    );

    finalNotes.forEach((note) => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");
        noteCard.style.background = updateNoteColor(note.category);

        const noteHeader = document.createElement("div");
        noteHeader.innerHTML = `<h3>${note.title}</h3>`;
        noteHeader.classList.add("note-header");
        noteHeader.style.color = updateHeaderColor(note.category);

        const notePara = document.createElement("div");
        notePara.innerHTML = `<p>${note.body}</p>`;
        notePara.classList.add("note-para");

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
            openModal("edit", note);
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
        noteCard.appendChild(noteHeader);
        noteCard.appendChild(notePara);
        noteCard.appendChild(noteDate);
        noteCard.appendChild(noteActions);

        noteCard.addEventListener("click", () => viewNoteModal(note));
        mainContainer.appendChild(noteCard);
    });

    noteCountAll.textContent = notes.length;
    noteCountPinned.textContent = notes.filter(
        (note) => note.category === "Pinned"
    ).length;
    noteCountWork.textContent = notes.filter(
        (note) => note.category === "Work"
    ).length;
    noteCountPersonal.textContent = notes.filter(
        (note) => note.category === "Personal"
    ).length;
}

saveBtn.addEventListener("click", () => {
    const title = inputTitle.value.trim();
    const body = inputBody.value.trim();

    if (!title || !body) {
        alert("Title and body can not be empty");
        return;
    } else if (noteEditId) {
        updateNote(noteEditId, title, body);
    } else {
        addNote(title, body);
    }

    renderNotes();
    saveNotesToStorage();

    inputTitle.value = "";
    inputBody.value = "";
    addModal.classList.add("hidden");
});

addBtn.addEventListener("click", () => {
    noteEditId = null;
    inputTitle.value = "";
    inputBody.value = "";
    addModal.classList.remove("hidden");
});

closeAddModal.addEventListener("click", () => {
    addModal.classList.add("hidden");
});

closeViewModal.addEventListener("click", () => {
    viewModal.classList.add("hidden");
});

aside.addEventListener("click", (e) => {
    const filterbtn = e.target.closest(".filter-btn");

    if (filterbtn) {
        currentFilter = filterbtn.dataset.filter;
        renderNotes(currentFilter);
        updateBtnColor(filterbtn);
    }
});

searchInput.addEventListener("input", () => {
    renderNotes();
});

darkLightBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const theme = document.body.classList.contains("dark-mode")
        ? "dark"
        : "light";

    localStorage.setItem("theme", theme);

    const icon = darkLightBtn.querySelector("i");

    if (document.body.classList.contains("dark-mode")) {
        icon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "dark");
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "light");
    }
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

inputClose.addEventListener("click", () => {
    navMiddle.classList.remove("active");
    searchInput.classList.remove("active");
    inputClose.style.display = "none";
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

loadNotesFromStorage();
