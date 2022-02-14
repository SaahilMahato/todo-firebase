import { LitElement, html, css } from "lit";
import { 
    getTodosDB,
    deleteTodoDB,
    editTodoDB
} from '../services/database';

class AppView extends LitElement {

    static get properties() {
        return {
            todos: { type: Array },
        }
    }

    static get styles() {
        return css`
            .container {
                width: 95vw;
                height: 95vh;
                background-color: white;
                margin: 0 auto;
            }

            h1 {
                font-weight: normal;
            }

            .list-header {
                border-top: solid 2px black;
                border-bottom: solid 2px black;
                margin: 1% 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .list-header h3 {
                width: 95%;
            }

            .list-header button {
                width: 10%;
                padding: 1%;
                background-color: red;
                color: white;
                border: none;
                border-radius: 10px;
                cursor: pointer;
            }
        `;
    }

    constructor() {
        super();
        
        this.todos = [];
    }

    firstUpdated() {
        this.updateTodos();
    }

    updateTodos = async () => {
        this.todos =  await getTodosDB();
    }

    editTodo = async (id, completed, title, time) => {
        const status = await editTodoDB(id, completed, title, time);
        if (status)
            this.updateTodos();
    }

    deleteTodo = async (id) => {
        const status = await deleteTodoDB(id);
        if (status)
            this.updateTodos();
    }

    render() {
        return html`
            <div class="container">
                <header>
                    <h1>TODO-LIST</h1>
                </header>
                <add-task-view .updateTodos=${this.updateTodos}></add-task-view>
                <div class="list-header">
                    <h3>Todos</h3>
                </div>
                <div class="todo-list">
                    ${this.todos.map(todo => html`
                        <task-view 
                            .id=${todo.id}
                            .completed=${todo.completed}
                            .title=${todo.title}
                            .time=${todo.time}
                            .updateTodos=${this.updateTodos}
                            .editTodo=${this.editTodo}
                            .deleteTodo=${this.deleteTodo}
                        >
                        </task-view>
                    `)}
                </div>
            </div>
        `
    }
}

customElements.define("app-view", AppView);
