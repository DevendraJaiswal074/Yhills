document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const dueDateInput = document.getElementById("due-date");
  const priorityInput = document.getElementById("priority");
  const taskList = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.classname = `task-item priority-${task.priority}`;
      if (task.completed) {
        li.classList.add('completed');
      }
      li.innerHTML = `
          <div>
            <span>${task.text}</span>
            <div class="task-details">
            Due: ${task.dueDate || 'Not Set'} | Priority: ${task.priority}
          </div>
          </div>
          <div>
          <button onClick="toggleTask(${index})">Mark Completed</button>
          <button onClick="deleteTask(${index})">Delete</button>
          </div>
        `;
      taskList.appendChild(li);
    });

  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;
    if (taskText) {
      tasks.push({
        text: taskText,
        completed: false,
        dueDate: dueDate,
        priority: priority
      });
      taskInput.value = '';
      dueDateInput.value = '';
      priority.value = 'low';
      saveTasks();
      renderTasks();
    }

  });

  window.toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  };

  window.deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  };

  renderTasks();
});