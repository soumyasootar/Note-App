const addBtn = document.querySelector("#addnote");
const main = document.querySelector("main");
addBtn.addEventListener("click", function () {
  addNote();
});







//-----------------SAVENOTES-----------------------------
const saveNotes = () => {
  const notes = document.querySelectorAll(".notes textarea");
  const data = [];
  let obj = { heading: "", body: "", colour: "white" };
  notes.forEach((element, i) => {
    if (i % 2 == 0) {
      obj = { ...obj, heading: element.value };
    } else {
      obj = { ...obj, body: element.value, colour: "white" };
      data.push(obj);
      obj = {};
    }
  });
  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
};

const addNote = (obj = { heading: "", body: "", colour: "white" }) => {
  const note = document.createElement("div");
  note.classList.add("notes");
  note.innerHTML = `<div class="heading">
    <textarea placeholder="Heading..." onblur="saveNotes()">${obj.heading}</textarea>
    <div class="menu-nav">
      <div class="dropdown-container" tabindex="-1">
        <div class="three-dots"></div>
        <div class="dropdown">
        <div id="savenote">Save</div>
        <hr>
        <div id="deletenote">Delete</div>
        <hr>
          <div>Change</div>
        </div>
      </div>
    </div>
  </div>
  <div class="note-body">
    <textarea placeholder="Body..." onblur="saveNotes()">${obj.body}</textarea>
  </div>`;

  //-------------------Delete Note-----------------------------------------
  note.querySelector("#deletenote").addEventListener("click", function () {
    note.remove();
    saveNotes();
  });

  //save note
  //   note.querySelector("#savenote").addEventListener("click", function () {
  //     saveNotes();
  //   });
  main.appendChild(note);

  //if user added new note it should be saved
  saveNotes();
};


//-----------------display notes after refreshing or adding ------------------------
function Display() {
  const notes = JSON.parse(localStorage.getItem("notes"));
  console.log("notes: ", notes);
  if (notes === null) {
    addNote();
  } else {
    notes.forEach((e) => {
      addNote(e);
    });
  }
}
Display();
