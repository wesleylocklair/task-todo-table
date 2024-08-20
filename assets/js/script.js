// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskNameInputEl = $("#task-name-input");
const taskDueDateInputEl = $("#task-due-date");
const taskDescriptionInputEl = $("#task-description");
const taskFormEl = $("#task-form");
const closeButtonEl = $("#close");
const taskSubmitEl = $("#add-task-close");
const modal = $("#formModal");
const taskDisplayEl = $("#task-display");

closeButtonEl.click(closeModal);
taskFormEl.on("submit", handleAddTask);
function generateTaskId(event) {
    return crypto.randomUUID();
}


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
    const tasks = readTasksFromStorage();
    const todoList = $("#todo-cards");
    todoList.empty();
    const inProgressList = $("#in-progress-cards");
    inProgressList.empty();
    const doneList = $("#done-cards");
    doneList.empty();
    for (let task of tasks) {
      if (task.status === "to-do") {
        todoList.append(createTaskCard(task));
      } else if (task.status === "in-progress") {
        inProgressList.append(createTaskCard(task));
      } else if (task.status === "done") {
        doneList.append(createTaskCard(task));
      }
    }
    $(".draggable").draggable({
      opacity: 0.8,
      zIndex: 50,
      helper: function (e) {
        const original = $(e.target).hasClass("ui-draggable")
          ? $(e.target)
          : $(e.target).closest(".ui-draggable");
        return original.clone().css({
          width: original.outerWidth(),
        });
      },
    });
  }
  function readTasksFromStorage() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) {
      tasks = [];
    }
    return tasks;
  }

  function saveTasksToStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  function closeModal() {
    modal.modal("hide");
  }
function handleAddTask(event){
    event.preventDefault();
    let taskId = generateTaskId(event);
    const taskName = taskNameInputEl.val().trim();
    const taskDueDate = taskDueDateInputEl.val();
    const taskDescription = taskDescriptionInputEl.val();
    const newTask = {
      id: taskId,
      name: taskName,
      dueDate: taskDueDate,
      description: taskDescription,
      status: "to-do",
    };
    const tasks = readTasksFromStorage();
    tasks.push(newTask);
    saveTasksToStorage(tasks);
    renderTaskList();
    taskNameInputEl.val("");
    taskDueDateInputEl.val("");
    taskDescriptionInputEl.val("");
    closeModal();
}
function handleDeleteTask(){
const taskId = $(this).attr("data-task-id");
const tasks = readTasksFromStorage();
  tasks.forEach((task) => {
    if (task.id === taskId) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  saveTasksToStorage(tasks);
  renderTaskList();
  }
function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();
    const taskNum = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.id;
    for (let task of tasks) {
      if (task.id === taskNum) {
        task.status = newStatus;
      }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTaskList();
}
$(document).ready(function () {
    renderTaskList();
    $(".lane").droppable({
      accept: ".draggable",
      drop: handleDrop,
      activeClass: "ui-state-highlight",
    });
});
