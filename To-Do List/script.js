displayTasks();
let taskInputValue = document.getElementById("usrInp");
let addTaskBtn = document.getElementById("push");
let saveTaskBtn = document.getElementById("save");
let deleteAll = document.getElementById("dltAll");
let searchInput = document.getElementById("searchBar");

function getStorage() {
    let tasksObj;
    let webTasks = localStorage.getItem("localtasks");
    if (webTasks == null) {
        tasksObj = [];
    } else {
        tasksObj = JSON.parse(webTasks);
    }
    return tasksObj;
}
//  console.log(getStorage());

function setStorage(data) {
    localStorage.setItem("localtasks", JSON.stringify(data));
}
addTaskBtn.addEventListener("click", addToStorage);

function addToStorage() {
    let addTaskInputVal = taskInputValue.value;
    if (addTaskInputVal.trim() != 0) {
        let tasksObj = getStorage();
        tasksObj.push(addTaskInputVal);
        setStorage(tasksObj);
        taskInputValue.value = "";
        displayTasks();
    }
}

function displayTasks() {
    let addedTasksList = document.getElementById("tasks");
    let tasksObj = getStorage();
    let html = "";
    tasksObj.forEach((item, index) => {
        html += `<div id="task">
        <span id="taskName">
            ${index + 1}. ${item}
        </span>
        <div id="actions">
            <button id="edit" onclick="editTasks(${index})">
                <ion-icon name="create"></ion-icon> Edit
            </button>
            <button id="delete" onclick="deleteTasks(${index})">
            <ion-icon name="trash"></ion-icon> Delete
        </button>
        </div>
        </div>`;
    });
    if (tasksObj.length != 0) {
        addedTasksList.innerHTML = html;
    } else {
        addedTasksList.innerHTML = `<span id="noTasks">There are no tasks to show!</span>`;
    }
}
function editTasks(index) {
    let tasksObj = getStorage();
    taskInputValue.value = tasksObj[index];
    let saveIndex = document.getElementById("saveIndex");
    saveIndex.value = index;
    addTaskBtn.style.display = "none";
    saveTaskBtn.style.display = "block";
}
saveTaskBtn.addEventListener("click", saveTasks);

function saveTasks() {
    let tasksObj = getStorage();
    saveIndex = document.getElementById("saveIndex").value;
    tasksObj[saveIndex] = taskInputValue.value;
    setStorage(tasksObj);
    displayTasks();
    taskInputValue.value = "";
    addTaskBtn.style.display = "block";
    saveTaskBtn.style.display = "none";
}
function deleteTasks(index) {
    let tasksObj = getStorage();
    tasksObj.splice(index, 1);
    setStorage(tasksObj);
    displayTasks();
}
deleteAll.addEventListener("click", deleteAllTasks);
function deleteAllTasks() {
    let tasksObj = getStorage();
    if (tasksObj != null) {
        tasksObj = [];
    }
    setStorage(tasksObj);
    displayTasks();
    taskInputValue.value = "";
    addTaskBtn.style.display = "block";
    saveTaskBtn.style.display = "none";
}
searchInput.addEventListener("input", searchTasks);

function searchTasks() {
    let inputValue = searchInput.value;
    inputValue = inputValue.toUpperCase();
    let tasks = document.querySelectorAll("#task");
    Array.from(tasks).forEach(function (element) {
        let taskTxt = element.getElementsByTagName("span")[0].innerText;
        if (taskTxt.toUpperCase().includes(inputValue)) {
            element.style.display = "block";
            element.style.display = "flex";
        } else {
            element.style.display = "none";
        }
    });
}
