import { LitElement, html, css } from "lit";


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
        this.updateTodos = this.updateTodos.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    clearAll() {
        this.todos = [];
    }

    updateTodos(newTask) {
        const newTaskUpdated = {
            ...newTask,
            id: this.todos.length,
            completed: false,
        };
        this.todos = [...this.todos, newTaskUpdated];
    }

    editTodo(id, completed, title, time) {
        const temp = [...this.todos];
        
        for(let i=0; i<temp.length; i++) {
            if (temp[i].id === id) {
                temp[i].completed = completed;
                temp[i].title = title;
                temp[i].time = time;
                break;
            }
        }

        this.todos = [...temp];
    }

    deleteTodo(id) {
        const temp = this.todos.filter(todo => todo.id !== id);

        for (let i=0; i<temp.length; i++) {
            temp[i].id = i;
        }

        this.todos = [...temp];
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
                    <button @click=${this.clearAll}>Clear All</button>
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
