export class Store {
    static getTask() {
        const storedTasks = localStorage.getItem('task-list');
        let taskList;
        storedTasks === null ?
            taskList = []
            :
                taskList = JSON.parse(storedTasks);
        return taskList;
    }
    ;
    static setTask(taskinfo) {
        const taskList = Store.getTask();
        taskList.push(taskinfo);
        localStorage.setItem('task-list', JSON.stringify(taskList));
    }
    ;
    static rmTask(id) {
        const taskList = Store.getTask();
        taskList.forEach((task, index) => {
            if (id === task.id) {
                taskList.splice(index, 1);
            }
            ;
        });
        localStorage.setItem('task-list', JSON.stringify(taskList));
    }
    static changeStatus(id) {
        const taskList = Store.getTask();
        taskList.forEach((task) => {
            if (id === task.id) {
                task.isComplete = !task.isComplete;
            }
        });
        localStorage.setItem('task-list', JSON.stringify(taskList));
    }
    ;
}
;
