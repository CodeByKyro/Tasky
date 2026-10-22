import { TaskLayout } from "../Interfaces/TaskLayout.js";

export class TaskInfo implements TaskLayout{
    constructor(readonly type: string, readonly task: string, public isComplete: boolean = false, readonly id: string = crypto.randomUUID()) {};
};