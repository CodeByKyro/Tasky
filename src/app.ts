// Imports
import { FormElements } from './Elements/FormElements.js';
import { TaskListElements } from './Elements/TaskListElements.js';
import { UI } from './Services/UI.js';


// Add Event Listeners
// Form Button Event Listener
FormElements.taskForm.addEventListener('submit', UI.addTask);

window.addEventListener('DOMContentLoaded', UI.displayTasks);