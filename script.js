const form = document.getElementById('submit-form')
form.addEventListener('submit', addItem);

function addItem(e){
    e.preventDefault();
    let text = document.getElementById("todo-input")
    db.collection("todo-items").add({
        text: text.value,
        status:"active"
    })
    
}
