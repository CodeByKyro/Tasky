import { TaskInfo } from '../Classes/TaskInfo.js';
import '../Components/TaskItem.js';
import { FormElements } from "../Elements/FormElements.js";
import { TaskListElements } from '../Elements/TaskListElements.js';
export class UI {
    static addTask(e) {
        e.preventDefault();
        const listItem = document.createElement('li');
        const type = FormElements.urgencySelector.value;
        const task = FormElements.taskInput.value;
        const taskInfo = new TaskInfo(type, task);
        const taskItem = document.createElement('task-item');
        listItem.append(taskItem);
        TaskListElements.pendingTaskList.append(listItem);
        taskItem.setTask(taskInfo);
        taskItem.querySelector('input[type="checkbox"]').addEventListener('change', UI.markTask);
        taskItem.querySelector('.remove-btn').addEventListener('click', UI.removeTask);
        console.log(type, task);
    }
    static markTask(e) {
        const checkBox = e.currentTarget;
        const taskListItem = checkBox.closest('li');
        const destinationList = checkBox.checked ?
            TaskListElements.completedTaskList
            :
                TaskListElements.pendingTaskList;
        destinationList.append(taskListItem);
    }
    static removeTask(e) {
        const removeBtn = e.currentTarget;
        const taskListItem = removeBtn.closest('li');
        taskListItem.remove();
    }
}
;
