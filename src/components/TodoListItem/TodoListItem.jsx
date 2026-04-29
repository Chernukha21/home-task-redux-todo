import classes from './TodoListItem.module.scss';
import {useDispatch} from "react-redux";
import {deleteTodo, editTodo, toggleIsDone} from "../../store/todoListSlice.js";
import {useState} from "react";
import  editIcon  from "../../assets/edit_icon.svg?react";
import classNames from "classnames";

const TodoListItem = ({ id, isDone, value, isOverdue  }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);


    const toggleTodoHandler = () => {
        dispatch(toggleIsDone({ id }));
    };

    const deleteTodoHandler = () => {
        dispatch(deleteTodo({ id }));
    }

    const canEdit = !isDone;

    const editTodoHandler = () => {
        if (!canEdit) return;
        setEditValue(value);
        setIsEditing(true);
    }

    const saveEditHandler = () => {
        const trimmedValue = editValue.trim();

        if (!trimmedValue) {
            setEditValue(value);
            setIsEditing(false);
            return;
        }

        dispatch(editTodo({ id, value: trimmedValue }));
        setIsEditing(false);
    };


    const keyDownHandler = (e) => {
        if (e.key === 'Enter') saveEditHandler();

        if (e.key === 'Escape') {
            setEditValue(value);
            setIsEditing(false);
        }
    };

    const canShowEditButton = !isDone && !isOverdue && !isEditing;

    const stateClasses = classNames(classes.todoListItem, {
        [classes.completed]: isDone,
        [classes.overdue]: isOverdue,
    });

    return (
        <div
            className={stateClasses}
        >
            <div className={classes.check} onClick={toggleTodoHandler}>
                {isDone && <span className={classes.icon} />}
            </div>

            {isEditing ? (
                <input
                    className={classes.editInput}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={saveEditHandler}
                    onKeyDown={keyDownHandler}
                    autoFocus
                />
            ) : (
                <div className={classes.value}>{value}</div>
            )}

            {canShowEditButton && (
                <p
                    className={classes.editBtn}
                    onClick={editTodoHandler}
                >
                    <img className={classes.editIconStyle} src={editIcon} alt="Edit" />
                </p>
            )}

            <button className={classes.deleteBtn} onClick={deleteTodoHandler}>
                ×
            </button>
        </div>
    );
};

export default TodoListItem;