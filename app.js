const addBtn = document.querySelector("#addnote");
const main = document.querySelector("main");
addBtn.addEventListener("click", function () {
  addNote();
});

//-----------------SAVENOTES-----------------------------
const saveNotes = () => {
  const notes = document.querySelectorAll(".notes textarea");
  const data = [];
  let obj = { heading: "", body: "", colour: "#FFFFFF" };
  let j=0
  notes.forEach((element, i) => {
    // console.log("element111: ", element.style.backgroundColor=="rgb(255, 255, 255)"?"t":"f");

    if (i % 2 == 0) {
      obj = { ...obj, heading: element.value ,colour:element.style.backgroundColor=='rgb(255, 255, 255)"'?"#FAF1DB":"#FFFFFF" };
    } else {
      obj = { ...obj, body: element.value, colour:element.style.backgroundColor=='rgb(255, 255, 255)"'?"#FAF1DB":"#FFFFFF" ,index:j };
      j++;
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

const addNote = (obj = { heading: "", body: "", colour: "#FFFFFF" }) => {
  const note = document.createElement("div");
  note.style.backgroundColor=obj.colour
  note.classList.add("notes");
  note.innerHTML = `<div class="heading">
    <textarea placeholder="Heading..." style="background-color: ${obj.colour};" onblur="saveNotes()">${obj.heading}</textarea>
    <div class="menu-nav">
      <div class="dropdown-container" tabindex="-1">
        <div class="three-dots"></div>
        <div class="dropdown">
        <div id="savenote">Save</div>
        <hr>
        <div id="deletenote">Delete</div>
        <hr>
          <div id="changecolour">Important</div>
        </div>
      </div>
    </div>
  </div>
  <div class="note-body">
    <textarea placeholder="Body..." style="background-color: ${obj.colour};" onblur="saveNotes()">${obj.body}</textarea>
  </div>`;

  //-------------------Delete Note-----------------------------------------
  note.querySelector("#deletenote").addEventListener("click", function () {
    note.remove();
    saveNotes();
  });

  note.querySelector("#changecolour").addEventListener("click", function () {
    changecolour(obj)
  });

  //save note
  //   note.querySelector("#savenote").addEventListener("click", function () {
  //     saveNotes();
  //   });
  main.appendChild(note);

  //if user added new note it should be saved
  saveNotes();
};
// ------------------CHANGE COLOUR-------------------
function changecolour(obj){
  console.log("obj: ", obj);
  let notes = JSON.parse(localStorage.getItem("notes"));

  notes.map((ele,i)=>{
    if(i==obj.index){
      ele.colour="#FAF1DB"
    }
  })
  console.log("colournotes: ", notes);
  localStorage.setItem("notes", JSON.stringify(notes));
  window.location.reload()
}

function Displayaftercolourchange(){
  main.innerHTML=""
}

//-----------------display notes after refreshing or adding ------------------------
function Display() {
  const notes = JSON.parse(localStorage.getItem("notes"));
  // console.log("notes: ", notes);
  if (notes === null) {
    addNote();
  } else {
    notes.forEach((e) => {
      addNote(e);
    });
  }
}
Display();
