const form=document.getElementById("task-form")
const input=document.getElementById("task-input")
const timeInput=document.getElementById("task-time")
const taskList=document.getElementById("task-list")
const taskCount=document.getElementById("task-count")
const searchInput=document.getElementById("search")

let tasks=JSON.parse(localStorage.getItem("tasks")) || []

/* CREAR TAREA */

form.addEventListener("submit",function(e){

e.preventDefault()

const text=input.value.trim()
const time=timeInput.value

if(text==="") return

tasks.push({

text:text,
time:time,
date:new Date().toISOString().split("T")[0],
completed:false

})

saveTasks()
renderTasks()

input.value=""
timeInput.value=""

})

/* RENDER */

function renderTasks(){

taskList.innerHTML=""

tasks.forEach(function(task,index){

const li=document.createElement("li")

if(task.completed){
li.classList.add("completed")
}

li.innerHTML=`
<div>
📌 ${task.text}
<span>${task.time || ""}</span>
</div>

<button class="delete-btn" data-index="${index}">
✖
</button>
`

li.addEventListener("click",function(){

tasks[index].completed=!tasks[index].completed

saveTasks()
renderTasks()

})

taskList.appendChild(li)

})

taskCount.textContent=tasks.length

updateDashboard()
renderTodayTasks()

document.getElementById("empty-message").style.display=

tasks.length===0 ? "block" : "none"

}

/* BORRAR */

taskList.addEventListener("click",function(e){

if(e.target.classList.contains("delete-btn")){

const index=e.target.dataset.index

tasks.splice(index,1)

saveTasks()
renderTasks()

}

})

/* GUARDAR */

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks))

}

/* DASHBOARD */

function updateDashboard(){

const total=tasks.length
const completed=tasks.filter(t=>t.completed).length
const pending=total-completed

document.getElementById("totalTasks").textContent=total
document.getElementById("completedTasks").textContent=completed
document.getElementById("pendingTasks").textContent=pending

document.getElementById("progress-fill").style.width=

total===0 ? "0%" : (completed/total)*100+"%"

}

/* HOY */

function renderTodayTasks(){

const todayList=document.getElementById("today-list")

todayList.innerHTML=""

tasks.forEach(task=>{

const li=document.createElement("li")

li.innerHTML=`

<div>

<span class="today-icon">📌</span>

${task.text}

</div>

${task.time ? `<span class="today-time">${task.time}</span>` : ""}

`

todayList.appendChild(li)

})

}

/* BUSCADOR */

searchInput.addEventListener("input",function(){

const text=searchInput.value.toLowerCase()

document.querySelectorAll("#task-list li").forEach(task=>{

task.style.display=

task.textContent.toLowerCase().includes(text)

? "flex" : "none"

})

})

/* MENU */

const sections=document.querySelectorAll(".section")

function showSection(id){

sections.forEach(sec=>sec.style.display="none")

document.getElementById(id).style.display="block"

}

/* BOTONES MENU */

function activateMenu(element){

document.querySelectorAll(".sidebar li").forEach(item=>{
item.classList.remove("active")
})

element.classList.add("active")

}

document.getElementById("menu-dashboard").onclick=function(){

showSection("dashboard-section")
activateMenu(this)

}

document.getElementById("menu-hoy").onclick=function(){

showSection("today-section")
activateMenu(this)

}

document.getElementById("menu-tareas").onclick=function(){

showSection("tasks-section")
activateMenu(this)

}

document.getElementById("menu-ajustes").onclick=function(){

showSection("settings-section")
activateMenu(this)

}

/* MODO OSCURO */

const darkToggle=document.getElementById("darkModeToggle")

darkToggle.checked=localStorage.getItem("darkMode")==="true"

if(darkToggle.checked){
document.body.classList.add("dark")
}

darkToggle.addEventListener("change",function(){

document.body.classList.toggle("dark")

localStorage.setItem("darkMode",darkToggle.checked)

})

/* COLOR */

document.getElementById("colorTheme").addEventListener("change",function(e){

document.querySelector("header").style.background=e.target.value

})

/* BORRAR TODO */

document.getElementById("clearTasks").onclick=function(){

if(confirm("¿Seguro que quieres borrar todas las tareas?")){

tasks=[]
saveTasks()
renderTasks()

}

}

/* FECHA */

document.getElementById("date").textContent=

new Date().toLocaleDateString("es-ES",{

weekday:"long",
day:"numeric",
month:"long"

})

renderTasks()

/* CALENDARIO */

function generateCalendar(){

const calendar=document.getElementById("calendar")
const title=document.getElementById("calendar-title")

const today=new Date()

const currentMonth=today.getMonth()
const currentYear=today.getFullYear()

const months=[
"Enero","Febrero","Marzo","Abril","Mayo","Junio",
"Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
]

title.textContent=months[currentMonth]+" "+currentYear

const firstDay=new Date(currentYear,currentMonth,1).getDay()
const daysInMonth=new Date(currentYear,currentMonth+1,0).getDate()

calendar.innerHTML=""

const weekDays=["L","M","X","J","V","S","D"]

weekDays.forEach(function(day){

const dayLabel=document.createElement("div")

dayLabel.textContent=day
dayLabel.style.fontWeight="600"

calendar.appendChild(dayLabel)

})

for(let i=0;i<firstDay-1;i++){

const empty=document.createElement("div")
calendar.appendChild(empty)

}

for(let day=1;day<=daysInMonth;day++){

const dayElement=document.createElement("div")

dayElement.classList.add("day")

dayElement.textContent=day

if(day===today.getDate()){
dayElement.classList.add("today")
}

calendar.appendChild(dayElement)

}

}

generateCalendar()