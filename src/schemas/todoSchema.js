import * as Yup from 'yup';

export const validationTodoSchema = Yup.object({
    value: Yup.string()
        .trim()
        .required('Enter a task')
        .min(3, 'Length should be at least 3 characters'),
});