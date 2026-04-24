import TodoForm from "../TodoForm/TodoForm.jsx";
import TodoList from "../TodoList/TodoList.jsx";
import classes from './Todo.module.scss';
const Todo = () => {
    return (
        <section className={classes.todo}>
            <h1>Todo</h1>
            <TodoForm/>
            <TodoList/>
        </section>
    );
};

export default Todo;