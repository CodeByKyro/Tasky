const taskItemTemplate = document.createElement('template');
taskItemTemplate.innerHTML = `
    <div class="task">
            <h4></h4>
            <div class="task-content">
                <p></p>
                <input type="checkbox" name="isComplete" id="isComplete">
                <button class="remove-btn"> X </button>
            </div>
    </div>
`;
export class TaskItem extends HTMLElement {
    constructor() {
        super();
        const content = taskItemTemplate.content.cloneNode(true);
        this.appendChild(content);
    }
    set(taskInfo) {
        this.querySelector('h4').textContent = taskInfo.type;
        this.querySelector('p').textContent = taskInfo.task;
    }
}
window.customElements.define('task-item', TaskItem);
