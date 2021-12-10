addItem = (e) => {
    e.preventDefault();
    let text = document.getElementById("todo-input")
    db.collection("todo-items").add({
        text: text.value,
        status:"active"
    })
    text.value = "";
}

const form = document.getElementById('submit-form');
form.addEventListener('submit', addItem);


//realtime
getItems = () => {
    db.collection("todo-items").onSnapshot((snapshot) => {
        console.log('snapshot', snapshot)
        let items = [];
        snapshot.docs.forEach((doc)=> {
            items.push({
                id:doc.id,
                ...doc.data()
            })
        })
        console.log(items);
        // generateItems(items)
        newElement(items)
    })
}

// generateItems = (items) => {
//     let itemsHTML = ""
//     items.forEach((item)=> {
//         itemsHTML += `
//         <div class="todo-item">
//             <div class="check">
//                 <div data-id="${item.id}" class="check-mark ${item.status == "completed" ? "checked": ""}">
//                     <img src="assets/icon-check.svg">
//                 </div>
//             </div>
//             <div data-id="${item.id}" class="todo-text ${item.status == "completed" ? "checked": ""}">
//                 ${item.text}
//             </div>
//             <div class="cancel" data-id="${item.id}" id="deleteBtn"><img src="https://img.icons8.com/ios/50/ffffff/cancel.png"/></div>
//         </div>
//         `
//     })
//     document.querySelector(".todo-items").innerHTML = itemsHTML;
//     createEventListeners()
// }

createEventListeners = () => {
    let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark")
    todoCheckMarks.forEach((checkMark) => {
        checkMark.addEventListener("click", () => {
            markCompleted(checkMark.dataset.id)
        })
    })
}

markCompleted = (id) => {
    let item = db.collection("todo-items").doc(id);

    item.get().then((doc) => {
        if(doc.exists) {
            let status = doc.data().status;
            if(status == "active"){
                item.update({
                    status:"completed"
                })
            } else if (status == "completed"){
                item.update({
                    status:"active"
                })
            }
        }
    })
}

getItems();

let deleteBtn = document.getElementById("deleteBtn");

if(deleteBtn){
    deleteBtn.addEventListener("click", (id) => {
        console.log('iddddd', id);
        db.collection("todo-items").doc(id).delete().then(() => {
            console.log(id);
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    })
  }



function newElement(items) {
    
    items.forEach((item)=> {
        let todo_item = document.createElement('div');
        todo_item.className = "todo-item";
        let check = document.createElement('div');
        check.className = "check";
        let check_mark = document.createElement('div');
        if (`${item.status}` == "completed") {
            check_mark.className = "check-mark checked"
        }
        else {
            check_mark.className = "check-mark"
        }
        check_mark.setAttribute('data-id', `${item.id}`)
        let image = document.createElement("img");
        image.className = "check_images";
        image.src = "assets/icon-check.svg";   
        check_mark.appendChild(image)
        check.appendChild(check_mark)

        let todo_text = document.createElement('div');
        todo_text.className = "todo-text";
        todo_text.setAttribute('data-id', `${item.id}`)
        if (`${item.status}` == "completed") {
            todo_text.className = "todo-text checked"
        }
        else {
            todo_text.className = "todo-text"
        }
        todo_text.textContent = `${item.text}`

        let cancel = document.createElement('div');
        cancel.className = "cancel";
        cancel.setAttribute('data-id', `${item.id}`)
        cancel.setAttribute('id', 'deleteBtn')

        let cancel_image = document.createElement("img");
        cancel_image.className = "cancel_image";
        cancel_image.src = "https://img.icons8.com/ios/50/ffffff/cancel.png";   
        cancel.appendChild(cancel_image)
        
        todo_item.appendChild(check)
        todo_item.appendChild(todo_text)
        todo_item.appendChild(cancel)
        test.appendChild(todo_item) 
    })
    
    createEventListeners()
}


    // var li = document.createElement("li");
    // var inputValue = document.getElementById("myInput").value;
    // var t = document.createTextNode(inputValue);
    // li.appendChild(t);
    // if (inputValue === '') {
    //   alert("You must write something!");
    // } else {
    //   document.getElementById("myUL").appendChild(li);
    // }
    // document.getElementById("myInput").value = "";
  
    // var span = document.createElement("SPAN");
    // var txt = document.createTextNode("\u00D7");
    // span.className = "close";
    // span.appendChild(txt);
    // li.appendChild(span);
  
    // for (i = 0; i < close.length; i++) {
    //   close[i].onclick = function() {
    //     var div = this.parentElement;
    //     div.style.display = "none";
    //   }
    // }




    // document.querySelector(".test").innerHTML = itemsHTML;
    // 



// var element = document. getElementById('myDivID');
// var dataID = element. getAttribute('data-id');
// var dataID = $('myDivID'). data('data-id');