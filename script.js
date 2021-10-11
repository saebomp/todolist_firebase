
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
                <div class="check-mark">
                    <img src="assets/icon-check.svg">
                </div>
            </div>
            <div class="todo-text">
                ${item.text}
            </div>
        </div>
        `
    })
    document.querySelector(".todo-items").innerHTML = itemsHTML
}

getItems();