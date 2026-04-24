const API = "/api";

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
    document.getElementById("message").innerText = data.message || data.error;
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

async function loadTasks() {
    const res = await fetch(`${API}/tasks`, {
        credentials: "include"
    });

    if (res.status !== 200) return;

    const tasks = await res.json();
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${task.title}</strong><br>
            ${task.description || ""}<br>
            ${task.due_date || ""}<br>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        list.appendChild(li);
    });
}

async function createTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const due_date = document.getElementById("due_date").value;

    await fetch(`${API}/tasks`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({ title, description, due_date })
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