interface Task {
  id: number;
  title: string;
  completed: boolean;
}

let tasks: Task[] = [];

const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;

// Load tasks from localStorage
function loadTasks() {
  const stored = localStorage.getItem('tasks');
  if (stored) tasks = JSON.parse(stored);
  renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
      <div>
        <button onclick="toggleTask(${task.id})">✔</button>
        <button onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Add new task
addBtn.onclick = () => {
  if (!taskInput.value.trim()) return;
  const newTask: Task = { id: Date.now(), title: taskInput.value, completed: false };
  tasks.push(newTask);
  taskInput.value = '';
  saveTasks();
  renderTasks();
};

// Toggle completion
(window as any).toggleTask = (id: number) => {
  tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
  saveTasks();
  renderTasks();
};

// Delete task
(window as any).deleteTask = (id: number) => {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
};

// Initial load
loadTasks();