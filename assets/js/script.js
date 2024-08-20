// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId(event) {
    return crypto.randomUUID();
}

// Todo: create a function to create a task card
function createTaskCard(task) {
 const taskCard = $("<div>").addClass("card project-card my-3 draggable").attr("data-task-id", task.id);
const cardHeader = $("<div>").addClass("card-header h4").text(task.name);
const cardBody = $("<div>").addClass("card-body");
const cardDescription = $("<p>").addClass("card-text").text(task.description);
const cardDueDate = $("<p>").addClass("card-text").text(task.dueDate);
const cardDeleteBtn = $("<button>").addClass("btn btn-danger delete").text("Delete").attr("data-task-id", task.id);
      
//When delete button is pressed, do handledeletetask function
cardDeleteBtn.on("click", handleDeleteTask);
    if (task.dueDate && task.status !== "done") {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, "DD/MM/YYYY");
//Different colors for each card depeneding on it's due date.
    if (now.isSame(taskDueDate, "day")) {
         taskCard.addClass("bg-warning text-white");
          } 
    else if (now.isAfter(taskDueDate)) {
            taskCard.addClass("bg-danger text-white");
            cardDeleteBtn.addClass("border-light");
          }
        }
//Append created elements to card
        cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
        taskCard.append(cardHeader, cardBody);
        return taskCard;
      }

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
