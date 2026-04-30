const API = "/api";
<<<<<<< HEAD
let currentFilter = "All";
=======
>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785

async function register() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
<<<<<<< HEAD

    if (res.status === 201) {
        document.getElementById("message").innerText =
            "Registration successful! Redirecting to login...";

        setTimeout(() => {
            window.location.href = "/login-page";
        }, 1500);
    } else {
        document.getElementById("message").innerText = data.error;
    }
=======
    document.getElementById("message").innerText = data.message || data.error;
>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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
        document.getElementById("message").innerText = data.error;
    }
}

<<<<<<< HEAD
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
=======
async function loadTasks() {
    const res = await fetch(`${API}/tasks`, {
>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785
        credentials: "include"
    });

    if (res.status !== 200) return;

    const tasks = await res.json();
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
<<<<<<< HEAD
        const warning = getDueWarning(task.due_date);

        const li = document.createElement("li");
        li.className = `task-card ${task.priority.toLowerCase()} ${warning.toLowerCase().replace(" ", "-")}`;

        li.innerHTML = `
            <strong>${task.title}</strong><br>
            ${task.description || ""}<br>
            Due: ${task.due_date || "No due date"}<br>
            Status: ${task.status}<br>
            Priority: ${task.priority}<br>
            <span class="warning">${warning}</span><br>

            <button onclick="editTask(${task.id}, '${escapeText(task.title)}', '${escapeText(task.description || "")}', '${task.due_date || ""}', '${task.status}', '${task.priority}')">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;

=======
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${task.title}</strong><br>
            ${task.description || ""}<br>
            ${task.due_date || ""}<br>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785
        list.appendChild(li);
    });
}

<<<<<<< HEAD
function escapeText(text) {
    return text.replace(/'/g, "\\'");
}

=======
>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785
async function createTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const due_date = document.getElementById("due_date").value;
<<<<<<< HEAD
    const status = document.getElementById("status").value;
    const priority = document.getElementById("priority").value;
=======
>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785

    await fetch(`${API}/tasks`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
<<<<<<< HEAD
        body: JSON.stringify({ title, description, due_date, status, priority })
    });

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("due_date").value = "";

    loadTasks();
}

async function editTask(id, oldTitle, oldDescription, oldDueDate, oldStatus, oldPriority) {
    const title = prompt("Edit title:", oldTitle);
    if (title === null) return;

    const description = prompt("Edit description:", oldDescription);
    if (description === null) return;

    const due_date = prompt("Edit due date YYYY-MM-DD:", oldDueDate);
    if (due_date === null) return;

    const status = prompt("Edit status: Pending, In Progress, Completed", oldStatus);
    if (status === null) return;

    const priority = prompt("Edit priority: Low, Medium, High", oldPriority);
    if (priority === null) return;

    await fetch(`${API}/tasks/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({ title, description, due_date, status, priority })
=======
        body: JSON.stringify({ title, description, due_date })
>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785
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