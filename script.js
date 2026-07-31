document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.textContent = isOpen ? 'Close' : 'Menu';
    });
  }

  const todoForm = document.querySelector('#todo-form');
  const taskInput = document.querySelector('#task-input');
  const taskList = document.querySelector('#task-list');

  if (!todoForm || !taskInput || !taskList) {
    return;
  }

  const tasks = [];

  function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
      const item = document.createElement('li');
      item.className = `task-item ${task.done ? 'task-item--done' : ''}`;
      item.innerHTML = `
        <span class="task-text">${task.text}</span>
        <div class="task-actions">
          <button type="button" class="task-toggle" data-index="${index}" aria-label="Toggle task completion">
            ${task.done ? '✓' : '○'}
          </button>
          <button type="button" class="task-delete" data-index="${index}" aria-label="Delete task">
            &times;
          </button>
        </div>
      `;

      taskList.appendChild(item);
    });
  }

  todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = taskInput.value.trim();
    if (!text) {
      return;
    }

    tasks.push({ text, done: false });
    taskInput.value = '';
    renderTasks();
  });

  taskList.addEventListener('click', (event) => {
    const toggle = event.target.closest('.task-toggle');
    const remove = event.target.closest('.task-delete');

    if (toggle) {
      const index = Number(toggle.dataset.index);
      tasks[index].done = !tasks[index].done;
      renderTasks();
      return;
    }

    if (remove) {
      const index = Number(remove.dataset.index);
      tasks.splice(index, 1);
      renderTasks();
    }
  });
});
