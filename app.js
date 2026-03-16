var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var tasks = [];
var taskInput = document.getElementById('taskInput');
var addBtn = document.getElementById('addBtn');
var taskList = document.getElementById('taskList');
// Load tasks from localStorage
function loadTasks() {
    var stored = localStorage.getItem('tasks');
    if (stored)
        tasks = JSON.parse(stored);
    renderTasks();
}
// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(function (task) {
        var li = document.createElement('li');
        li.innerHTML = "\n      <span class=\"".concat(task.completed ? 'completed' : '', "\">").concat(task.title, "</span>\n      <div>\n        <button onclick=\"toggleTask(").concat(task.id, ")\">\u2714</button>\n        <button onclick=\"deleteTask(").concat(task.id, ")\">\uD83D\uDDD1</button>\n      </div>\n    ");
        taskList.appendChild(li);
    });
}
// Add new task
addBtn.onclick = function () {
    if (!taskInput.value.trim())
        return;
    var newTask = { id: Date.now(), title: taskInput.value, completed: false };
    tasks.push(newTask);
    taskInput.value = '';
    saveTasks();
    renderTasks();
};
// Toggle completion
window.toggleTask = function (id) {
    tasks = tasks.map(function (task) { return task.id === id ? __assign(__assign({}, task), { completed: !task.completed }) : task; });
    saveTasks();
    renderTasks();
};
// Delete task
window.deleteTask = function (id) {
    tasks = tasks.filter(function (task) { return task.id !== id; });
    saveTasks();
    renderTasks();
};
// Initial load
loadTasks();
