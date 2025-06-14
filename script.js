document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when page loads
    loadTasks();

    // Add task when button is clicked
    addButton.addEventListener('click', () => addTask(taskInput.value));

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Add Task Function
    function addTask(taskText, save = true) {
        taskText = taskText.trim();
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create <li> element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Handle remove click
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Add button to li and li to ul
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';

        // Save task to localStorage if needed
        if (save) {
            const tasks = getTasksFromStorage();
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    // Load Tasks from localStorage
    function loadTasks() {
        const tasks = getTasksFromStorage();
        tasks.forEach(task => addTask(task, false)); // false = don’t re-save again
    }

    // Get tasks array from localStorage
    function getTasksFromStorage() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // Remove task from localStorage
    function removeTaskFromStorage(taskToRemove) {
        let tasks = getTasksFromStorage();
        tasks = tasks.filter(task => task !== taskToRemove);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
