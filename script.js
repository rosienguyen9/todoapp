let form = document.querySelector('.form')
let input = document.querySelector('.input')
let todosUl = document.querySelector('.todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos){
    todos.forEach(todo => {
        addTodo(todo)
    })
}

form.addEventListener('submit', function(e){
    e.preventDefault()

    addTodo();

})


function addTodo (todo){
    let todoText = input.value

    if(todo){
        todoText = todo.text
    }
    
    if(todoText) {
        let todoEl = document.createElement('li')

        if(todo && todo.completed){
            todoEl.classList.add('completed')
        }
        todoEl.innerText = todoText
        todosUl.appendChild(todoEl)

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')

            updateLS()
        })

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()
    
            todoEl.remove()

            updateLS()
        })
    
        input.value = ""

        updateLS()

    }
}

function updateLS() {
    const todosEl =  document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}