const FORM =  document.querySelector('form');
const TODO_INPUT = document.querySelector('.to-do-input');
const TODO_TEXT_WRAPPER = document.querySelector('.todo-list');
const NOTIFICATION_DIV = document.querySelector(".toasts")
const TODO = document.querySelectorAll(".todo")

console.log(TODO)
let todoState = false;

const addTodo = (todo) => {
    let todoText = TODO_INPUT.value;

    if (todo) {
        todoText = todo.text
    }

    
    if (todoText) {
        
        const todoLi = document.createElement('li');
        const eraseSpan = document.createElement('span');
        eraseSpan.classList.add('erase');
        eraseSpan.classList.add('material-symbols-outlined');
        eraseSpan.innerText = 'backspace'
        const todoDiv =  document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.innerText = todoText
        const checkSpan = document.createElement('span');
        checkSpan.classList.add('check')
        checkSpan.classList.add('material-symbols-outlined')
        checkSpan.innerText = 'priority'

        if (todo && todo.finished) {
            todoLi.classList.add('finished')
            todoDiv.classList.add('finished')
        }

        todoLi.append(eraseSpan, todoDiv, checkSpan)
        
        TODO_TEXT_WRAPPER.appendChild(todoLi)
        

        checkSpan.addEventListener('click', () => {
            
            const NOTIF = document.createElement('div');
            NOTIF.classList.add('toast')
        
            if (!todoLi.classList.contains('finished')) {
                NOTIF.innerText = "To-Do Item Finished";
                NOTIF.style.color = 'black'
                NOTIF.style.backgroundColor = `#96faff`
            } else {
                NOTIF.innerText = "To-Do Item Not Finished";
                NOTIF.style.color = 'black'
                NOTIF.style.backgroundColor = `#ff9696` 
            }
            NOTIFICATION_DIV.appendChild(NOTIF)
        
            setTimeout(() => {
                NOTIF.remove()
            }, 1000)
            
            todoDiv.classList.toggle('finished')
            todoLi.classList.toggle('finished')
            addToLocalStorage()
        })

        eraseSpan.addEventListener('mouseover', () => {
            todoDiv.style.color = 'red'
        })

        eraseSpan.addEventListener('mouseleave', () => {
            todoDiv.style.color = ''
        })

        eraseSpan.addEventListener('click', () => {
            
            todoLi.remove()
            addToLocalStorage()
            todoDeletedNotif()
        })
        
        TODO_INPUT.value = ''

        addToLocalStorage()
        
    }
}



FORM.addEventListener('submit', (event) => {
    event.preventDefault()
    if (TODO_INPUT.value != '') {
        todoAddedNotif()
    }
    addTodo()
})

const TODOS = JSON.parse(localStorage.getItem('todos'))

if (TODOS) {
    TODOS.forEach(todo =>  addTodo(todo));
}
function addToLocalStorage() {
    
    const TODO_TEXT = document.querySelectorAll('.todo')
    const TODO_ARR = [];

    TODO_TEXT.forEach(span => {
        TODO_ARR.push({
            text: span.innerText,
            finished: span.classList.contains('finished')
        })
    })

    localStorage.setItem('todos', JSON.stringify(TODO_ARR))
}



function todoAddedNotif() {
    const NOTIF = document.createElement('div');
    NOTIF.classList.add('toast')

    NOTIF.innerText = "To-Do Item Added"
    NOTIF.style.color = 'rgb(0, 103, 121)'
    NOTIF.style.backgroundColor = `wheat`
    NOTIFICATION_DIV.appendChild(NOTIF)

    setTimeout(() => {
        NOTIF.remove()
    }, 1000)
}

function todoDeletedNotif() {
    const NOTIF = document.createElement('div');
    NOTIF.classList.add('toast')

    NOTIF.innerText = "To-Do Item Deleted";
    NOTIF.style.color = 'red'
    NOTIF.style.backgroundColor = `wheat`
    NOTIFICATION_DIV.appendChild(NOTIF)

    setTimeout(() => {
        NOTIF.remove()
    }, 1000)
}



