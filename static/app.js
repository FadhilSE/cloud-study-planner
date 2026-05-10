const API = "/api";
let currentFilter = "All";

let tasksCache = [];

async function loadCurrentUser() {
    const res = await fetch(`${API}/me`, {
        credentials: "include"
    });

    if (res.status === 200) {
        const user = await res.json();

        document.getElementById("userName").innerText =
            user.username;

        document.getElementById("userInitial").innerText =
            user.username.charAt(0).toUpperCase();
    }
}

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

    const search =
        document.getElementById("searchInput")?.value || "";

    const res = await fetch(
        `${API}/tasks?status=${currentFilter}&search=${search}`,
        {
            credentials: "include"
        }
    );

    if (res.status !== 200) return;

    const tasks = await res.json();

    tasksCache = tasks;

    const list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach(task => {

        const warning = getDueWarning(task.due_date);

        const li = document.createElement("li");

        li.className =
            `task-card ${task.priority.toLowerCase()} ${warning.toLowerCase().replace(" ", "-")}`;

        li.id = `task-${task.id}`;

        li.innerHTML = `
            <strong>📌 ${task.title}</strong><br>

            📝 ${task.description || "No description"}<br>

            📅 Due: ${task.due_date || "No due date"}<br>

            📊 Status: ${task.status}<br>

            🔥 Priority: ${task.priority}<br>

            <span class="warning">
                ⏰ ${warning}
            </span><br>

            <button onclick="editTask(${task.id})">
                Edit
            </button>

            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
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

    loadTasks();
}

async function editTask(id) {

    const task = tasksCache.find(t => t.id === id);

    if (!task) return;

    const li = document.getElementById(`task-${id}`);

    li.innerHTML = `
        <input id="edit-title-${id}"
               value="${task.title}">

        <input id="edit-description-${id}"
               value="${task.description || ""}">

        <input id="edit-due-${id}"
               type="date"
               value="${task.due_date || ""}">

        <select id="edit-status-${id}">
            <option ${task.status === "Pending" ? "selected" : ""}>
                Pending
            </option>

            <option ${task.status === "In Progress" ? "selected" : ""}>
                In Progress
            </option>

            <option ${task.status === "Completed" ? "selected" : ""}>
                Completed
            </option>
        </select>

        <select id="edit-priority-${id}">
            <option ${task.priority === "Low" ? "selected" : ""}>
                Low
            </option>

            <option ${task.priority === "Medium" ? "selected" : ""}>
                Medium
            </option>

            <option ${task.priority === "High" ? "selected" : ""}>
                High
            </option>
        </select>

        <button onclick="saveTask(${id})">
            Save
        </button>

        <button onclick="loadTasks()">
            Cancel
        </button>
    `;
}

async function saveTask(id) {

    const title =
        document.getElementById(`edit-title-${id}`).value.trim();

    const description =
        document.getElementById(`edit-description-${id}`).value.trim();

    const due_date =
        document.getElementById(`edit-due-${id}`).value;

    const status =
        document.getElementById(`edit-status-${id}`).value;

    const priority =
        document.getElementById(`edit-priority-${id}`).value;

    await fetch(`${API}/tasks/${id}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        credentials: "include",

        body: JSON.stringify({
            title,
            description,
            due_date,
            status,
            priority
        })
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