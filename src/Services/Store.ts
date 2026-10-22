import { TaskLayout } from "../Interfaces/TaskLayout.js";

export class Store {
    static getTask() {
        const storedTasks = localStorage.getItem('task-list');

        let taskList;

        storedTasks === null ?
        taskList = []
        :
        taskList = JSON.parse(storedTasks);

        return taskList;
    };

    static setTask(taskinfo: TaskLayout): void {
        const taskList = Store.getTask();

        taskList.push(taskinfo);

        localStorage.setItem('task-list', JSON.stringify(taskList));
    };

    static rmTask(id: string): void {
        const taskList = Store.getTask();

        taskList.forEach( (task: TaskLayout, index: number) => {
            if (id === task.id){
                taskList.splice(index, 1);
            };
        });

        localStorage.setItem('task-list', JSON.stringify(taskList));
    }

    static changeStatus(id: string): void {
        const taskList = Store.getTask();

        taskList.forEach((task: TaskLayout) => {
            if(id === task.id) {
                task.isComplete = !task.isComplete;
            }
        });

        localStorage.setItem('task-list', JSON.stringify(taskList));
    };
};