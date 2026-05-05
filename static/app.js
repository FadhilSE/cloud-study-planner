const API = "/api";
let currentFilter = "All";

async function register() {
    const message = document.getElementById("message");
    message.innerText = "Registering...";

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    if (res.status === 201) {
        message.innerText = "Registration successful! Redirecting to login...";
        setTimeout(() => {
            window.location.href = "/login-page";
        }, 1500);
    } else {
        message.innerText = data.error || "Registration failed";
    }
}

async function login() {
    const message = document.getElementById("message");
    message.innerText = "Logging in...";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.status === 200) {
        window.location.href = "/dashboard";
    } else {
        message.innerText = data.error || "Login failed";
    }
}

function setFilter(status) {
    currentFilter = status;
    loadTasks();
}

function getDueWarning(dueDate) {
    if (!dueDate) return "";

    const today = new Date();
    const due = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    if (due < today) return "Overdue";
    if (due.getTime() === today.getTime()) return "Due Today";
    return "Upcoming";
}

async function loadTasks() {
    const search = document.getElementById("searchInput")?.value || "";

    const res = await fetch(`${API}/tasks?status=${currentFilter}&search=${search}`, {
        credentials: "include"
    });

    if (res.status !== 200) return;

    const tasks = await res.json();
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const warning = getDueWarning(task.due_date);

        const li = document.createElement("li");
        li.className = `task-card ${task.priority.toLowerCase()} ${warning.toLowerCase().replace(" ", "-")}`;

        li.innerHTML = `
            <strong>📌 ${task.title}</strong><br>
            📝 ${task.description || "No description"}<br>
            📅 Due: ${task.due_date || "No due date"}<br>
            📊 Status: ${task.status}<br>
            🔥 Priority: ${task.priority}<br>
            <span class="warning">⏰ ${warning}</span><br>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
`;

        list.appendChild(li);
    });
}

async function createTask() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const due_date = document.getElementById("due_date").value;
    const status = document.getElementById("status").value;
    const priority = document.getElementById("priority").value;

    await fetch(`${API}/tasks`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({ title, description, due_date, status, priority })
    });

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("due_date").value = "";

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.value = "";
    }

    currentFilter = "All";

    loadTasks();
}

async function editTask(id) {
    const title = prompt("Edit title:");
    if (title === null) return;

    const description = prompt("Edit description:");
    if (description === null) return;

    const due_date = prompt("Edit due date YYYY-MM-DD:");
    if (due_date === null) return;

    const status = prompt("Edit status: Pending, In Progress, Completed", "Pending");
    if (status === null) return;

    const priority = prompt("Edit priority: Low, Medium, High", "Medium");
    if (priority === null) return;

    await fetch(`${API}/tasks/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({ title, description, due_date, status, priority })
    });

    loadTasks();
}

async function deleteTask(id) {
    await fetch(`${API}/tasks/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    loadTasks();
}

async function logout() {
    await fetch(`${API}/logout`, {
        method: "POST",
        credentials: "include"
    });

    window.location.href = "/";
}