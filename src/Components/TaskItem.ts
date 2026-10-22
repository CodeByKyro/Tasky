import { TaskItemLayout } from "../Interfaces/TaskItemLayout.js";
import { TaskLayout } from "../Interfaces/TaskLayout.js";

const taskItemTemplate: HTMLTemplateElement = document.createElement('template');

taskItemTemplate.innerHTML = `
    <div class="task">
            <h4></h4>
            <div class="task-content">
                <p></p>
                <input type="checkbox" name="isComplete" id="isComplete">
                <button class="remove-btn"> X </button>
            </div>
    </div>
`

export default class TaskItem extends HTMLElement implements TaskItemLayout{
    constructor() {
        super();
    }

    connectedCallback(): void {
        if (this.childNodes.length === 0) {
            const content = taskItemTemplate.content.cloneNode(true);
            this.appendChild(content);
        }
    }

    setTask(taskInfo: TaskLayout): void {

        const header =  this.querySelector('h4') as HTMLHeadingElement;

        const taskDetails = this.querySelector('p') as HTMLParagraphElement;

        const checkBox =  this.querySelector('#isComplete') as HTMLInputElement;


        
        header.textContent = `${taskInfo.type}`;

        taskDetails.textContent = `${taskInfo.task}`

        checkBox.checked = taskInfo.isComplete;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        'task-item': TaskItem;
    }
}

customElements.define('task-item', TaskItem);