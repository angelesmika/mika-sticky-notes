// ANGELES, Ma. Mikaela A.
// CS 192 C2 Lab 2
// main.js

// GLOBAL VARIABLES
const deleteAllBtn = document.getElementById("disabled-delete");
const notesBoard = document.getElementById("notes-board");
let currentNotes = 0;
let totalNotes = 0;

// UPDATING TOTAL NOTES IN LOCAL STORAGE
function updateTotalNotesStorage() {
	window.localStorage.setItem("totalNotes", totalNotes);
}

// ADDING A NEW NOTE
function addNote(index, isNew) {
	let newNote = document.createElement("div");
	newNote.setAttribute("id", "note" + index);
	newNote.setAttribute("class", "note");

	// &#39; = HTML code for single quotes HASJDHASJKD
	// im sorry i had to pass a string and the quotes were making my mind explode
	newNote.innerHTML = '<div class="note-container">'
	+		'<button id="delete" onclick="deleteNote(note' + index + ', &#39;' + index + '&#39;)" class="delete-btn"><i class="far fa-times-circle"></i></button>'
	+		'<input type="text" onkeyup="updateStorage(&#39;title' + index + '&#39;)" id="title' + index + '" class="note-title" placeholder="Enter note title here"></textarea>'
	+		'<textarea onkeyup="updateStorage(&#39;content' + index + '&#39;)" id="content' + index + '" class="note-content" placeholder="Enter note here"></textarea>'
	+'</div>'

	notesBoard.appendChild(newNote);
	deleteAllBtn.removeAttribute("disabled");

	if (isNew == true) {
		window.localStorage.setItem("title" + index, "");
		window.localStorage.setItem("content" + index, "");
	}

	totalNotes++;
	currentNotes++;
	
	updateTotalNotesStorage();
}

// RETRIEVING STICKY NOTES FROM LOCAL STORAGE UPON LOAD
if (window.localStorage.length > 0) {
        totalNotes = window.localStorage.getItem("totalNotes");

	for (let i = 0; i <= totalNotes; i++) {
		let storedTitle = window.localStorage.getItem("title" + String(i));
		let storedContent = window.localStorage.getItem("content" + String(i))
		if (storedTitle != null && storedContent != null) {
			addNote(i, false);
			document.getElementById("title" + String(i)).value = storedTitle;
			document.getElementById("content" + String(i)).value = storedContent;
                        deleteAllBtn.removeAttribute("disabled");
		}
	}
}

// DELETE ALL NOTES
function deleteAllNotes() {
	notesBoard.innerHTML = "";
	document.getElementById("actions").value = "none";
	deleteAllBtn.setAttribute("disabled", "disabled");
	currentNotes = 0;
	totalNotes = 0;

	updateTotalNotesStorage();
	window.localStorage.clear();
}

// EXECUTE BUTTON
function doAction() {
	const selected = document.getElementById("actions").value;

	// add notes
	if (selected == "add") {
		addNote(totalNotes, true);
	}

	// delete all notes
	else if (selected == "delete-all") {
		deleteAllNotes();
	}
}

// LOCK EDITING
function lockEditing() {
	const lockButton = document.getElementById("lock");
	const textAreas = document.querySelectorAll("textarea");
	const titles = document.querySelectorAll("input");
	const dropdown = document.getElementById("actions");
	const goBtn = document.getElementById("go");
	const deleteBtn = document.getElementsByClassName("delete-btn");

	// locked = true
	if (lockButton.innerHTML == "Lock editing") {
		lockButton.innerHTML = "Unlock editing";
		dropdown.setAttribute("disabled", "disabled");
		goBtn.setAttribute("disabled", "disabled");

		for (let node of textAreas) {
			node.setAttribute("disabled", "disabled");
		}

		for (let node of titles) {
			node.setAttribute("disabled", "disabled");
		}

		for (let node of deleteBtn) {
			node.style.visibility = "hidden";
		}
	}

	// locked = false
	else {
		lockButton.innerHTML = "Lock editing";
		dropdown.removeAttribute("disabled");
		goBtn.removeAttribute("disabled");

		for (let node of textAreas) {
			node.removeAttribute("disabled");
		}

		for (let node of titles) {
			node.removeAttribute("disabled");
		}

		for (let node of deleteBtn) {
			node.style.visibility = "visible";
		}
	}
}

// DELETING INDIVIDUAL NOTES
function deleteNote(id, index) {
	id.remove();
	currentNotes--;

	window.localStorage.removeItem(id.getAttribute("id"));
	window.localStorage.removeItem("title" + index);
	window.localStorage.removeItem("content" + index);

	if (currentNotes == 0) {
		deleteAllBtn.setAttribute("disabled", "disabled");
		totalNotes = 0;
		window.localStorage.clear();
                return;
	}

	updateTotalNotesStorage();
}

// UPDATING LOCAL STORAGE WHEN EDITING NOTES
function updateStorage(id) {
	window.localStorage.setItem(id, document.getElementById(id).value);
}
