import { LitElement, html, css } from "lit";
import { addTodoDB } from '../services/database';

class AddTaskView extends LitElement {

    static get properties() {
        return {
            time: { type: String },
            title: { type: String },

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
                width: 40%;
            }

            label {
                width: 30%;
                padding: 3% 0;
                font-size: 1.4em;
            }
            
            input {
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
        this.time = "";
        this.title = "";

        this.updateTodos = () => {};
    }

    updateTitle = (e) => {
        this.title = e.target.value;
    }

    updateTime = (e) => {
        this.time = e.target.value;
    }

    resetForm = () => {
        this.time = "";
        this.title = "";
    }

    addTask = async () => {
        if(this.title && this.time) {
            const newTask = {
                time: this.time,
                title: this.title,  
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
