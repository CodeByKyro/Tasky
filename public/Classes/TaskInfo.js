export class TaskInfo {
    type;
    task;
    isComplete;
    constructor(type, task, isComplete = false) {
        this.type = type;
        this.task = task;
        this.isComplete = isComplete;
    }
    ;
}
