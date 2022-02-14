import { LitElement, html, css } from "lit";


class TaskView extends LitElement {

    static get properties() {
        return {
            id: { type: Number },

            time: { type: String },
            title: { type: String },
            
            completed: { type: Boolean },

            editTodo: { type: Function },
            deleteTodo: { type: Function },
            updateTodos: { type: Function },
        }
    }

    static get styles() {
        return css `
            .task-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .checkbox {
                width: 24px;
                height: 24px;
                cursor: pointer;
            }

            input {
                font-size: 18px;
                border: none;
            }

            img {
                width: 32px;
                cursor: pointer;
            }
        `;
    }

    constructor() {
        super();

        this.id = "";
        this.time = "";
        this.title = "";

        this.completed = false;

        this.editTodo = () => {};
        this.deleteTodo = () => {};
        this.updateTodos = () => {};
    }

    updateComplete = (e) => {
        this.completed = e.target.checked;
        this.editTodo(this.id, this.completed, this.title, this.time);
    }

    updateTitle = (e) => {
        this.title = e.target.value;
        this.editTodo(this.id, this.completed, this.title, this.time);
    }

    updateTime = (e) => {
        this.time = e.target.value;
        this.editTodo(this.id, this.completed, this.title, this.time);
    }

    render() {
        return html`
            <div class="task-container">
                <input class="checkbox" type="checkbox" .checked=${this.completed} @change=${this.updateComplete}>
                <input .value=${this.title} @change=${this.updateTitle}>
                <input .value=${this.time} @change=${this.updateTime}>
                <img src="images/delete.png" @click=${() => this.deleteTodo(this.id)}>
            </div>
        `
    }
}

customElements.define("task-view", TaskView);
