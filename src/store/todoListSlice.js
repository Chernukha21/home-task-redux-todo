import {createSlice} from "@reduxjs/toolkit";


const loadTodos = () => {
    try {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    } catch {
        return [];
    }
};

const initialState = {
    todos: loadTodos(),
    filter: 'all',
    search: '',
};

const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },

        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },

        toggleIsDone: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.isDone = !todo.isDone;
            }
        },

        setFilter: (state, action) => {
            state.filter = action.payload;
        },

        clearCompleted: (state) => {
            state.todos = state.todos.filter(todo => !todo.isDone);
        },
        editTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);

            if (todo) {
                todo.value = action.payload.value;
            }
        },
        updateOverdueTodos: (state) => {
            const now = Date.now();

            state.todos.forEach((todo) => {
                todo.isOverdue = !todo.isDone && !!todo.deadline && todo.deadline < now;
            });
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    },
});


export const { addTodo,editTodo, deleteTodo, toggleIsDone, setFilter, clearCompleted, updateOverdueTodos, setSearch } = todoListSlice.actions;
export default todoListSlice.reducer;