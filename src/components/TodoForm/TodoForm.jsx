import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/todoListSlice.js';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { validationTodoSchema } from '../../../schemas/todoSchema.js';
import classes from './TodoForm.module.scss';

const TodoForm = () => {
    const dispatch = useDispatch();

    const createTodo = (values, { resetForm }) => {
        const deadline = Date.now() + 1000 * 15;
        const newTodo = {
            id: Date.now(),
            value: values.value.trim(),
            isDone: false,
            deadline,
            isOverdue: deadline < Date.now(),
        };

        dispatch(addTodo(newTodo));
        resetForm();
    };

    return (
        <Formik
            initialValues={{ value: '' }}
            validationSchema={validationTodoSchema}
            onSubmit={createTodo}
        >
            {({ values, setFieldValue }) => (
                <Form className={classes.form}>
                    <div className={classes.todoInputWrapper}>
                        <div className={classes.circle}></div>

                        <Field
                            name="value"
                            type="text"
                            className={classes.todoInput}
                            placeholder="Create a new todo..."
                        />

                        {values.value.trim() && (
                            <button
                                type="button"
                                className={classes.clearBtn}
                                onClick={() => setFieldValue('value', '')}
                            >
                                ×
                            </button>
                        )}
                    </div>
                    <ErrorMessage name="value">
                        {(msg) => <div className={classes.error}>{msg}</div>}
                    </ErrorMessage>
                </Form>
            )}
        </Formik>
    );
};

export default TodoForm;