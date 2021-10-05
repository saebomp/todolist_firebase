const form = document.getElementById('submit-form')
form.addEventListener('submit', addItem);

function addItem(e){
    e.preventDefault();
    let text = document.getElementById("todo-input")
    console.log(text.value)
}
