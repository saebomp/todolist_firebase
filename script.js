
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
        console.log(items)
    })
}

getItems();