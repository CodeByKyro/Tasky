import { TaskInfo } from "../Classes/TaskInfo.js";
import "../Components/TaskItem.js";
import { FormElements } from "../Elements/FormElements.js";
import { NotificationElements } from "../Elements/NotificationElement.js";
import { TaskListElements } from "../Elements/TaskListElements.js";
import { Store } from "./Store.js";
var NotificationMsg;
(function (NotificationMsg) {
    NotificationMsg["successMsg"] = "Task Created Successfully";
    NotificationMsg["errorMsg"] = "Please Enter Task and Choose Urgency";
    NotificationMsg["completionMsg"] = "Task Completed Successfully";
    NotificationMsg["removalMsg"] = "Task Removed Successfully";
})(NotificationMsg || (NotificationMsg = {}));
var NotificationColors;
(function (NotificationColors) {
    NotificationColors["success"] = "success";
    NotificationColors["error"] = "error";
})(NotificationColors || (NotificationColors = {}));
export class UI {
    static addTask(e) {
        e.preventDefault();
        const listItem = document.createElement("li");
        // Get form input data
        let type = FormElements.urgencySelector.value;
        let task = FormElements.taskInput.value;
        if (type && task) {
            // Create task info object to store the data
            const taskInfo = new TaskInfo(type, task);
            // create task item, set data and render the task
            const taskItem = document.createElement("task-item");
            listItem.append(taskItem);
            TaskListElements.pendingTaskList.append(listItem);
            taskItem.setTask(taskInfo);
            // Add EventListener to the checkbox
            taskItem
                .querySelector('input[type="checkbox"]')
                .addEventListener("change", () => {
                UI.markTask(taskInfo.id, listItem);
            });
            // Add EventListener to the remove button
            taskItem.querySelector(".remove-btn").addEventListener("click", () => {
                UI.removeTask(taskInfo.id, listItem);
            });
            Store.setTask(taskInfo);
            FormElements.taskInput.value = '';
            FormElements.urgencySelector.value = '';
            UI.notificationMsg(NotificationMsg.successMsg, NotificationColors.success);
        }
        else {
            UI.notificationMsg(NotificationMsg.errorMsg, NotificationColors.error);
        }
    }
    static markTask(id, listItem) {
        const checkBox = listItem.querySelector('input[type="checkbox"]');
        const destinationList = checkBox.checked ? TaskListElements.completedTaskList : TaskListElements.pendingTaskList;
        checkBox.checked ? UI.notificationMsg(NotificationMsg.completionMsg, NotificationColors.success) : null;
        destinationList.append(listItem);
        Store.changeStatus(id);
    }
    static removeTask(id, listItem) {
        listItem.remove();
        Store.rmTask(id);
        UI.notificationMsg(NotificationMsg.removalMsg, NotificationColors.success);
    }
    static displayTasks() {
        const taskList = Store.getTask();
        taskList.forEach((task) => {
            const listItem = document.createElement("li");
            const taskItem = document.createElement("task-item");
            listItem.append(taskItem);
            const destinationList = task.isComplete
                ? TaskListElements.completedTaskList
                : TaskListElements.pendingTaskList;
            destinationList.append(listItem);
            taskItem.setTask(task);
            // Add EventListener to the checkbox
            taskItem
                .querySelector('input[type="checkbox"]')
                .addEventListener("change", () => {
                UI.markTask(task.id, listItem);
            });
            // Add EventListener to the remove button
            taskItem.querySelector(".remove-btn").addEventListener("click", () => {
                UI.removeTask(task.id, listItem);
            });
        });
    }
    static notificationMsg(text, color) {
        NotificationElements.NotificationContainer.innerHTML = '';
        const msg = document.createElement('p');
        msg.textContent = text;
        msg.className = color;
        NotificationElements.NotificationContainer.append(msg);
        setTimeout(() => {
            msg.remove();
        }, 3500);
    }
}
