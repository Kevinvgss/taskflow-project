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

function toggle(i){

tasks[i].completed=!tasks[i].completed

save()
render()

}

function deleteTask(i){

const taskElements = document.querySelectorAll(".task")
const el = taskElements[i]

el.classList.add("removing")

setTimeout(()=>{

tasks.splice(i,1)

save()
render()

},250)

}

function editTask(i){

const t=prompt("Editar tarea",tasks[i].text)

if(t){
tasks[i].text=t
save()
render()
}

}

function updateStats(){

const total=tasks.length
const completed=tasks.filter(t=>t.completed).length

document.getElementById("total-count").textContent=total
document.getElementById("completed-count").textContent=completed
document.getElementById("pending-count").textContent=total-completed

let percent=0

if(total>0){
percent=Math.round((completed/total)*100)
}

document.getElementById("progress-fill").style.width=percent+"%"
document.getElementById("progress-text").textContent=percent+"%"

}

document.querySelectorAll(".menu").forEach(btn=>{

btn.onclick=()=>{

document.querySelectorAll(".menu")
.forEach(b=>b.classList.remove("active"))

btn.classList.add("active")

filter=btn.dataset.filter

render()

}

})

search.oninput=render

document.getElementById("clear-all").onclick=()=>{

if(confirm("¿Eliminar todas las tareas?")){

tasks=[]
save()
render()

}

}

/* RECORDATORIOS */

document.getElementById("add-reminder").onclick=()=>{

const input=document.getElementById("reminder-input")

if(!input.value.trim()) return

reminders.push(input.value)

input.value=""

save()
renderReminders()

}

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

function save(){

localStorage.setItem("tasks",JSON.stringify(tasks))
localStorage.setItem("reminders",JSON.stringify(reminders))

}

/* CALENDARIO */

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

/* FECHA HEADER */

document.getElementById("today-date").textContent=

new Date().toLocaleDateString("es-ES",{
weekday:"long",
day:"numeric",
month:"long"
})

render()
renderReminders()

/* MODO OSCURO */

const darkToggle = document.getElementById("dark-toggle")

/* comprobar si estaba activado */

if(localStorage.getItem("darkMode") === "true"){

document.documentElement.classList.add("dark")

darkToggle.textContent = "☀️ Modo claro"
darkToggle.style.background = "#1e293b"
darkToggle.style.color = "white"

}

/* click del botón */

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