import { TaskInfo } from '../Classes/TaskInfo.js';
import '../Components/TaskItem.js';
import { FormElements } from "../Elements/FormElements.js";
import { TaskListElements } from '../Elements/TaskListElements.js';

export class UI {
    static addTask(e: Event): void {
        e.preventDefault();

        const listItem: HTMLLIElement = document.createElement('li');

        const type: string = FormElements.urgencySelector.value;
        const task: string = FormElements.taskInput.value;

        const taskInfo = new TaskInfo(type, task);

        const taskItem = document.createElement('task-item');

        listItem.append(taskItem);

        TaskListElements.pendingTaskList.append(listItem);

        taskItem.setTask(taskInfo);

        taskItem.querySelector('input[type="checkbox"]')!.addEventListener('change', UI.markTask);

        taskItem.querySelector('.remove-btn')!.addEventListener('click', UI.removeTask);

        console.log(type, task);
    }

    private static markTask(e: Event): void {
        const checkBox = e.currentTarget as HTMLInputElement;

        const taskListItem = checkBox.closest('li')!;


        const destinationList = checkBox.checked ? 
        TaskListElements.completedTaskList
        : 
        TaskListElements.pendingTaskList;

        destinationList.append(taskListItem);
    }

    private static removeTask(e: Event) {
        const removeBtn = e.currentTarget as HTMLButtonElement;

        const taskListItem = removeBtn.closest('li') as HTMLLIElement;

        taskListItem.remove();
    }
};
