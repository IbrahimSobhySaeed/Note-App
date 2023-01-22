const addBox=document.querySelector(".add-box"),
popUpBox=document.querySelector(".popup-box"),
colseTag=document.querySelector("header i"),
addBtn = popUpBox.querySelector("button"),
titleTag = popUpBox.querySelector("input"),
descTag = popUpBox.querySelector("textarea"),
popUpTitle=popUpBox.querySelector("header p");


let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

let isUpdate=false , UpdateId;

const notes=  JSON.parse(localStorage.getItem("notes") || "[]");


addBox.addEventListener("click",()=>{
    titleTag.focus();
    popUpBox.classList.add("show");
    addBtn.innerText="Add Note";
    popUpTitle.innerText="Add new Note";
   
});


colseTag.addEventListener("click",()=>{
    isUpdate=false;
    titleTag.value="";
    descTag.value="";
    popUpBox.classList.remove("show");
  
});



function showNotes(){
    //remove all previous notes before adding new 
    document.querySelectorAll(".note").forEach(note=> note.remove());

    notes.forEach((note, index)=> {
        let liTag =
        `<li class="note">
               <div class="details">
                   <p>${note.title}</p>
                    <span>${note.description}</span>
               </div>
                   <div class="bottom-content">
                       <span>${note.data}</span>
                           <div class="settings">
                               <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                   <ul class="menu">
                                        <li onclick="updateNote( ${index},'${note.title}','${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                                       <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                                   </ul>
                           </div>
                </div>
         </li>`;
      addBox.insertAdjacentHTML("afterend",liTag);

        
    });
   
}
 showNotes();




addBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    let title=titleTag.value;
    let description=descTag.value;


    if(title || description){
        let data=new Date(),
        day=data.getDay(),
        month=months[data.getMonth()],
        year=data.getFullYear();

       let noteInfo={
        title:title,
        description:description,
        data:`${month} ,${day} ${year}`
       };
    //    console.log(noteInfo);
    if(!isUpdate){
        notes.push(noteInfo);
    }else
    {
        isUpdate=false
        notes[UpdateId]=noteInfo; // updated spacisic note
    }
    localStorage.setItem("notes",JSON.stringify(notes));
    colseTag.click();

        
        
    }

    showNotes();
   

});




function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click" ,e=>{
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    })
};


function deleteNote(noteId){

let confirmDel=confirm("are you want to delete thid note ??");
if(!confirmDel) return;
notes.splice(noteId,1);
localStorage.setItem("notes",JSON.stringify(notes));
showNotes();
}

function updateNote(noteId ,title, desc){
    isUpdate=true;
    UpdateId=noteId;
    addBox.click();
    titleTag.value=title;
    descTag.value=desc;
    popUpTitle.innerText="Updata a Note";
    addBtn.innerText="Updata Note";
}


