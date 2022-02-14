import { LitElement, html, css } from "lit";
import { addTodoDB } from '../services/database';

class AddTaskView extends LitElement {

    static get properties() {
        return {
            title: { type: String },
            time: { type: String },
            updateTodos: { type: Function },
        }
    }

    static get styles() {
        return css `
            .add-form {
                display: flex;
                justify-content: space-between;
            }

            .form-control {
                width: 25%;
            }

            label {
                width: 30%;
                padding: 3% 0;
                font-size: 1.4em;
            }
            
            input, select {
                width: 70%;
                padding: 3% 0;
                font-size: 1.4em;
            }

            button {
                width: 10%;
                color: white;
                background-color: green;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1.4em;
            }
        `;
    }

    constructor() {
        super();
        this.title = "";
        this.time = "";
        this.updateTodos = () => {};
    }

    updateTitle = (e) => {
        this.title = e.target.value;
    }

    updateTime = (e) => {
        this.time = e.target.value;
    }

    resetForm = () => {
        this.title = "";
        this.time = "";
    }

    addTask = async () => {
        if(this.title && this.time) {
            const newTask = {
                title: this.title,
                time: this.time,
            }
    
            const status = await addTodoDB(newTask);
            if (status)
                this.updateTodos();
            this.resetForm();
        }
    }

    render() {
        return html`
            <div class='add-form'>
                <div class='form-control'>
                    <label>Task</label>
                    <input id="title" type='text' placeholder='Add Task' 
                    .value="${this.title}"
                    @change="${this.updateTitle}"/>
                </div>
                <div class='form-control'>
                    <label>Time</label>
                    <input id="time" type='text' placeholder='Add Day and Time' 
                    .value="${this.time}"
                    @change="${this.updateTime}"/>
                </div>
                <button @click="${this.addTask}">Add Task</button>
            </div>
        `;
    }
}

customElements.define("add-task-view", AddTaskView);
