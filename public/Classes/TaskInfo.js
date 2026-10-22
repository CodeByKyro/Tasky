export class TaskInfo {
    type;
    task;
    isComplete;
    id;
    constructor(type, task, isComplete = false, id = crypto.randomUUID()) {
        this.type = type;
        this.task = task;
        this.isComplete = isComplete;
        this.id = id;
    }
    ;
}
;
