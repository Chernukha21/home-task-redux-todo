import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import classes from './TodoList.module.scss';
import TodoListItem from "../TodoListItem/TodoListItem.jsx";
import {clearCompleted, setFilter, updateOverdueTodos, setSearch} from "../../store/todoListSlice.js";

const TodoList = () => {
    const dispatch = useDispatch();
    const { todos, filter, search  } = useSelector(state => state.todoList);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(updateOverdueTodos());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    const itemsLeft = todos.filter(todo => !todo.isDone).length;

    const filteredTodos = todos.filter(todo => {
        if (filter === 'overdue') return todo.isOverdue;
        if (filter === 'active') return !todo.isDone;
        if (filter === 'completed') return todo.isDone;
        return true;
    }).filter(todo =>
        todo.value.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <p>
                <input
                    className={classes.search}
                    type="text"
                    placeholder="Search todo..."
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                />
            </p>
            <div className={classes.todoList}>
                {filteredTodos.map(todo => {
                    return (
                        <TodoListItem
                            key={todo.id}
                            id={todo.id}
                            value={todo.value}
                            isDone={todo.isDone}
                            isOverdue={todo.isOverdue}
                        />
                    )
                })}

                <div className={classes.filtersWrapper}>
                    <div>{itemsLeft} items left</div>

                    <div className={classes.filters}>
                        <button onClick={() => dispatch(setFilter('all'))}>All</button>
                        <button onClick={() => dispatch(setFilter('active'))}>Active</button>
                        <button onClick={() => dispatch(setFilter('completed'))}>Completed</button>
                    </div>

                    <button onClick={() => dispatch(clearCompleted())}>
                        Clear Completed
                    </button>
                </div>
            </div>
        </>

    );
};

export default TodoList;