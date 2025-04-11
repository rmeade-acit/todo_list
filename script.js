// Get the important elements from our HTML
const input = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');

// Create an empty array to store our todos
let todos = [];

// Function to add a new todo
function addTodo() {
    // Get the text from the input box
    const text = input.value.trim();
    
    // Only add the todo if there's actually text
    if (text) {
        // Create a new todo object
        const todo = {
            id: Date.now(),              // Use current timestamp as unique ID
            text: text,                  // The todo text
            completed: false             // New todos start as not completed
        };
        
        // Add the new todo to our array
        todos.push(todo);
        
        // Clear the input box
        input.value = '';
        
        // Update the display
        displayTodos();
        updateCount();
    }
}

// Function to toggle a todo between completed and not completed
function toggleTodo(id) {
    // Go through each todo
    for (let i = 0; i < todos.length; i++) {
        // If this is the todo we want to change
        if (todos[i].id === id) {
            // Flip its completed status
            todos[i].completed = !todos[i].completed;
            break;
        }
    }
    
    // Update the display
    displayTodos();
    updateCount();
}

// Function to delete a todo
function deleteTodo(id) {
    // Create a new array with all todos EXCEPT the one we want to delete
    todos = todos.filter(todo => todo.id !== id);
    
    // Update the display
    displayTodos();
    updateCount();
}

// Function to display all the todos
function displayTodos() {
    // Clear the current list
    todoList.innerHTML = '';
    
    // Go through each todo
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        
        // Create a new div for this todo
        const todoItem = document.createElement('div');
        todoItem.className = todo.completed ? 'todo-item completed' : 'todo-item';
        
        // Create the HTML for this todo
        todoItem.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn">Delete</button>
        `;
        
        // Get the checkbox and delete button
        const checkbox = todoItem.querySelector('input');
        const deleteBtn = todoItem.querySelector('.delete-btn');
        
        // Add event listeners
        checkbox.addEventListener('change', function() {
            toggleTodo(todo.id);
        });
        
        deleteBtn.addEventListener('click', function() {
            deleteTodo(todo.id);
        });
        
        // Add this todo to the list
        todoList.appendChild(todoItem);
    }
}

// Function to update the count of remaining todos
function updateCount() {
    // Count how many todos are not completed
    let remaining = 0;
    for (let i = 0; i < todos.length; i++) {
        if (!todos[i].completed) {
            remaining++;
        }
    }
    
    // Update the count text
    todoCount.textContent = remaining + ' item' + (remaining !== 1 ? 's' : '') + ' left';
}

// Listen for Enter key in the input box
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initial display
displayTodos();
updateCount();