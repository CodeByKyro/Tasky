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
export default class TaskItem extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        if (this.childNodes.length === 0) {
            const content = taskItemTemplate.content.cloneNode(true);
            this.appendChild(content);
        }
    }
    setTask(taskInfo) {
        const header = this.querySelector('h4');
        const taskDetails = this.querySelector('p');
        const checkBox = this.querySelector('#isComplete');
        header.textContent = `${taskInfo.type}`;
        taskDetails.textContent = `${taskInfo.task}`;
        checkBox.checked = taskInfo.isComplete;
    }
}
customElements.define('task-item', TaskItem);
