
addItem = (e) => {
    e.preventDefault();
    let text = document.getElementById("todo-input")
    db.collection("todo-items").add({
        text: text.value,
        status:"active"
    })
    text.value = "";
}

const form = document.getElementById('submit-form')
form.addEventListener('submit', addItem);

//realtime
getItems = () => {
    db.collection("todo-items").onSnapshot((snapshot) => {
        // console.log(snapshot)
        let items = [];
        snapshot.docs.forEach((doc)=> {
            items.push({
                id:doc.id,
                ...doc.data()
            })
        })
        console.log(items);
        generateItems(items)
    })
}

generateItems = (items) => {
    let itemsHTML = ""
    items.forEach((item)=> {
        itemsHTML += `
        <div class="todo-item">
            <div class="check">
                <div data-id="${item.id}" class="check-mark ${item.status == "completed" ? "checked": ""}">
                    <img src="assets/icon-check.svg">
                </div>
            </div>
            <div class="todo-text ${item.status == "completed" ? "checked": ""}">
                ${item.text}
            </div>
            <div class="cancel"><img data-id="${item.id}" src="https://img.icons8.com/ios/50/ffffff/cancel.png"/></div>
        </div>
        `
    })
    document.querySelector(".todo-items").innerHTML = itemsHTML;
    createEventListeners()
}

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