import { TaskInfo } from '../Classes/TaskInfo.js';
import '../Components/TaskItem.js';
import { FormElements } from "../Elements/FormElements.js";
import { TaskListElements } from '../Elements/TaskListElements.js';
import { TaskLayout } from '../Interfaces/TaskLayout.js';
import { Store } from './Store.js';

export class UI {
    static addTask(e: Event): void {
        e.preventDefault();

        const listItem: HTMLLIElement = document.createElement('li');

        // Get form input data
        const type: string = FormElements.urgencySelector.value;
        const task: string = FormElements.taskInput.value;

        // Create task info object to store the data
        const taskInfo = new TaskInfo(type, task);

        // create task item, set data and render the task
        const taskItem = document.createElement('task-item');

        listItem.append(taskItem);

        TaskListElements.pendingTaskList.append(listItem);

        taskItem.setTask(taskInfo);


        // Add EventListener to the checkbox
        taskItem.querySelector('input[type="checkbox"]')!.addEventListener('change', () => {
            UI.markTask(taskInfo.id, listItem)
        });

        // Add EventListener to the remove button
        taskItem.querySelector('.remove-btn')!.addEventListener('click', () => {
            UI.removeTask(taskInfo.id, listItem)
        });

        Store.setTask(taskInfo);

        console.log(type, task);
    };

    private static markTask(id: string, listItem: HTMLElement): void {
        const checkBox = listItem.querySelector('input[type="checkbox"]') as HTMLInputElement;

        const destinationList = checkBox.checked ? 
        TaskListElements.completedTaskList
        : 
        TaskListElements.pendingTaskList;

        destinationList.append(listItem);

        Store.changeStatus(id);
    };

    private static removeTask(id: string, listItem: HTMLElement): void {
        listItem.remove();
        Store.rmTask(id);
    };

    static displayTasks() {
        const taskList = Store.getTask();
   
        taskList.forEach( (task: TaskLayout) => {
            const listItem = document.createElement('li') as HTMLLIElement;
    
            const taskItem = document.createElement('task-item');

            listItem.append(taskItem);

            const destinationList = 
            task.isComplete ?
            TaskListElements.completedTaskList
            :
            TaskListElements.pendingTaskList;

            destinationList.append(listItem);

            taskItem.setTask(task);

            // Add EventListener to the checkbox
            taskItem.querySelector('input[type="checkbox"]')!.addEventListener('change', () => {
                UI.markTask(task.id, listItem)
            });

            // Add EventListener to the remove button
            taskItem.querySelector('.remove-btn')!.addEventListener('click', () => {
                UI.removeTask(task.id, listItem)
            });
            });
    }
};