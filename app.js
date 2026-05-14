let tasks = JSON.parse(localStorage.getItem("tasks")) || []
let reminders = JSON.parse(localStorage.getItem("reminders")) || []

let filter="all"

const list=document.getElementById("task-list")

const input=document.getElementById("task-input")
const category=document.getElementById("task-category")
const priority=document.getElementById("task-priority")
const time=document.getElementById("task-time")
const notes=document.getElementById("task-notes")

const search=document.getElementById("search-task")

// Handle creation of a new task from the form inputs
document.getElementById("add-task").onclick=()=>{

if(!input.value.trim()) return

tasks.push({

text:input.value,
category:category.value,
priority:priority.value,
time:time.value,
notes:notes.value,
completed:false

})

input.value=""
notes.value=""

save()
render()

}

// Render the visible task list according to current filters and search
function render(){

list.innerHTML=""

let filtered=tasks

if(filter!=="all"){
filtered=tasks.filter(t=>t.category===filter)
}

if(search.value){
filtered=filtered.filter(t=>
t.text.toLowerCase().includes(search.value.toLowerCase())
)
}

filtered.forEach((task,i)=>{

const div=document.createElement("div")

div.className="task "+task.category

div.innerHTML=`

<h4>${task.text}</h4>

<div class="task-tags">

<span class="tag priority-${task.priority}">${task.priority}</span>
<span class="tag">${task.category}</span>

${task.time ? `<span class="tag">${task.time}</span>`:""}

</div>

${task.notes ? `<p>${task.notes}</p>`:""}

<div class="task-actions">

<div class="check ${task.completed?"done":""}" onclick="toggle(${i})">✓</div>

<button class="edit" onclick="editTask(${i})">Editar</button>

<button class="delete" onclick="deleteTask(${i})">Eliminar</button>

</div>

`

list.appendChild(div)

})

updateStats()

const emptyMessage = document.getElementById("empty-message")

if(tasks.length === 0){

emptyMessage.style.display = "block"

}else{

emptyMessage.style.display = "none"

}

}

// Toggle completed / not completed state for a task by index
/**
 * Toggles the completed status of a task at the given index.
 *
 * @param {number} index - The index of the task to update in the tasks array.
 */
function toggle(index) {
  const task = tasks[index];
  if (!task) {
    console.warn(`Task at index ${index} does not exist.`);
    return;
  }

  task.completed = !task.completed;

  save();
  render();
}


// Remove a task with a small animation before updating the list
/**
 * Deletes a task at the given index with a removal animation,
 * then updates storage and re-renders the task list.
 *
 * @param {number} i - The index of the task to delete from the tasks array.
 */
function deleteTask(i) {
  // Validate the index and presence of expected DOM elements and task
  const taskElements = document.querySelectorAll(".task");
  if (
    typeof i !== "number" ||
    i < 0 ||
    i >= taskElements.length ||
    i >= tasks.length ||
    !taskElements[i]
  ) {
    console.warn(`Invalid task index: ${i}. No task deleted.`);
    return;
  }

  const el = taskElements[i];
  el.classList.add("removing");

  setTimeout(() => {
    tasks.splice(i, 1);
    save();
    render();
  }, 250);
}

// Allow inline text editing for a task using a simple prompt
/**
 * Edits the text of a task at the given index using a browser prompt.
 * If the user provides new text, updates the task, saves, and re-renders the list.
 *
 * @param {number} i - The index of the task to edit in the tasks array.
 */
function editTask(i) {
  if (typeof i !== "number" || i < 0 || i >= tasks.length) {
    console.warn(`Invalid task index: ${i}. Cannot edit task.`);
    return;
  }

  const currentText = tasks[i].text;
  const updatedText = prompt("Editar tarea", currentText);

  if (updatedText) {
    tasks[i].text = updatedText;
    save();
    render();
  }
}

// Update totals, completed/pending counts and progress bar percentage
/**
 * Updates the statistics display, including total, completed, pending task counts,
 * and progress bar reflecting completion percentage.
 */
function updateStats() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Update task counts in DOM
  document.getElementById("total-count").textContent = totalTasks;
  document.getElementById("completed-count").textContent = completedTasks;
  document.getElementById("pending-count").textContent = pendingTasks;

  // Calculate completion percentage
  let percentComplete = 0;
  if (totalTasks > 0) {
    percentComplete = Math.round((completedTasks / totalTasks) * 100);
  }

  // Update progress bar and percentage text
  document.getElementById("progress-fill").style.width = percentComplete + "%";
  document.getElementById("progress-text").textContent = percentComplete + "%";
}

// Category filter buttons (All, Personal, Trabajo, etc.)
document.querySelectorAll(".menu").forEach(btn=>{

btn.onclick=()=>{

document.querySelectorAll(".menu")
.forEach(b=>b.classList.remove("active"))

btn.classList.add("active")

filter=btn.dataset.filter

render()

}

})

// Live search: re-render tasks whenever the user types
search.oninput=render

// Clear all tasks after user confirmation
document.getElementById("clear-all").onclick=()=>{

if(confirm("¿Eliminar todas las tareas?")){

tasks=[]
save()
render()

}

}

/* RECORDATORIOS */

// Create a new reminder and persist it
document.getElementById("add-reminder").onclick=()=>{

const input=document.getElementById("reminder-input")

if(!input.value.trim()) return

reminders.push(input.value)

input.value=""

save()
renderReminders()

}

// Render the list of reminders on the right panel
function renderReminders(){

const container=document.getElementById("reminder-list")

container.innerHTML=""

reminders.forEach((r,i)=>{

const div=document.createElement("div")

div.className="reminder"

div.innerHTML=`

<span>${r}</span>

<button onclick="removeReminder(${i})">×</button>

`

container.appendChild(div)

})

}

// Animate and remove a single reminder by index
function removeReminder(i){

const reminderElements = document.querySelectorAll(".reminder")
const el = reminderElements[i]

el.classList.add("removing")

setTimeout(()=>{

reminders.splice(i,1)

save()
renderReminders()

},200)

}

// Persist current tasks and reminders to localStorage
/**
 * Saves the current tasks and reminders arrays to localStorage.
 * Tasks are stored under the key "tasks".
 * Reminders are stored under the key "reminders".
 */
function save() {
  const tasksJSON = JSON.stringify(tasks);
  const remindersJSON = JSON.stringify(reminders);

  localStorage.setItem("tasks", tasksJSON);
  localStorage.setItem("reminders", remindersJSON);
}

/* CALENDARIO */

// Build the mini calendar for the current month and highlight today's date
const calendar = document.getElementById("calendar")
const header = document.getElementById("calendar-header")

const today = new Date()

const months = [
"Enero","Febrero","Marzo","Abril","Mayo","Junio",
"Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
]

const year = today.getFullYear()
const month = today.getMonth()

header.textContent = months[month] + " " + year

calendar.innerHTML = ""

/* primer dia del mes */

let firstDay = new Date(year, month, 1).getDay()

if(firstDay === 0){
firstDay = 7
}

/* dias del mes */

const daysInMonth = new Date(year, month + 1, 0).getDate()

/* espacios vacíos */

for(let i = 1; i < firstDay; i++){

const empty = document.createElement("div")
calendar.appendChild(empty)

}

/* dias */

for(let i = 1; i <= daysInMonth; i++){

const day = document.createElement("div")

day.textContent = i

if(
i === today.getDate() &&
month === today.getMonth() &&
year === today.getFullYear()
){
day.classList.add("today")
}

calendar.appendChild(day)

}

/* FECHA HEADER: human‑readable full date in Spanish */

document.getElementById("today-date").textContent=

new Date().toLocaleDateString("es-ES",{
weekday:"long",
day:"numeric",
month:"long"
})

// Initial paint of tasks and reminders when the app loads
render()
renderReminders()

/* MODO OSCURO */

const darkToggle = document.getElementById("dark-toggle")

/* comprobar si estaba activado: restore previous dark mode choice */

if(localStorage.getItem("darkMode") === "true"){

document.documentElement.classList.add("dark")

darkToggle.textContent = "☀️ Modo claro"
darkToggle.style.background = "#1e293b"
darkToggle.style.color = "white"

}

/* click del botón: toggle theme and remember user preference */

darkToggle.onclick = () => {

document.documentElement.classList.toggle("dark")

const isDark = document.documentElement.classList.contains("dark")

if(isDark){

darkToggle.textContent = "☀️ Modo claro"
darkToggle.style.background = "#1e293b"
darkToggle.style.color = "white"

}else{

darkToggle.textContent = "🌙 Modo oscuro"
darkToggle.style.background = ""
darkToggle.style.color = ""

}

localStorage.setItem("darkMode", isDark)

}

