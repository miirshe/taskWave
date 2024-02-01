import { Modal } from '@mui/material'
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../redux/slices/taskslices';
import { handleCloseTaskModel } from '../redux/slices/taskModelSlices';
import * as Yup from 'yup'
const TaskForm = ({ board, params_row }) => {
    console.log('params_ROW', params_row);
    const openTaskModel = useSelector(state => state.taskModel.taskModel);
    const [createTask] = useCreateTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const initialValues = {
        title: params_row?.title || '',
        description: params_row?.description || '',
        status: params_row?.status || ''
    }
    const validationSchema = Yup.object({
        title: Yup.string().required('title is required'),
        description: Yup.string().required('descriptionis required'),
        // subtasks: Yup.array().of(Yup.string().required('Subtask is required')),
        status: params_row?._id ? Yup.string().required('status is required') : '',
    })
    const handleSubmit = async (values, { resetForm }) => {
        try {
            console.log('values', values);
            const { title, description, status } = values;
            const id = params_row?._id;
            if (!id) {
                createTask({ title, description, boardId: board?._id })
                    .then((res) => {
                        const status = res?.data?.status;
                        const message = res?.data?.message;
                        if (status) {
                            toast.success(message);
                            resetForm();
                        } else {
                            toast.error(message);
                            console.log('message', message);
                        }
                    })
                    .catch(err => {
                        toast.error(err);
                        console.log('err', err);
                    });
            } else {
                updateTask({ id: id, updateTask: { title: title, description: description, status: status, boardId: board?._id } })
                    .then((res) => {
                        const status = res?.data?.status;
                        const message = res?.data?.message;
                        if (status) {
                            toast.success(message);
                            resetForm();
                            navigate('/');
                            dispatch(handleCloseTaskModel(false))
                        } else {
                            toast.error(message);
                        }
                    })
                    .catch(err => {
                        toast.error(err?.data);
                    });
            }
        } catch (error) {
            console.log('error submitting tasks', error.message);
        }
    }
    return (
        <div className='w-full'>
            <Modal open={openTaskModel} onClose={() => dispatch(handleCloseTaskModel(false))}>
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="w-[70%] md:w-[30%] bg-white dark:bg-slate-800 dark:text-white p-4 rounded-lg">
                        <label htmlFor="" className="text-base font-medium ml-1">Add new Task </label>
                        <hr className='w-full mt-3' />
                        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            <Form className='w-full space-y-5 p-4 text-black'>
                                <div className='w-full space-y-2'>
                                    <label htmlFor="" className="text-base font-medium ml-1 text-black ">Title</label>
                                    <Field className="p-2 rounded border w-full outline-[#322F64] text-black" type="text" placeholder='Enter board name eg. taskWave' name="title" />
                                    <ErrorMessage name='title' className='text-red-500' component="div" />
                                </div>

                                <div className="w-full space-y-3">
                                    <label htmlFor="" className="text-base font-medium ml-1 text-black">Description</label>
                                    <Field as="textarea" rows='4' className="w-full text-black px-3 py-2 rounded border outline-[#322F64]" name='description' placeholder='Enter description' />
                                    <ErrorMessage name="description" component="div" className="text-red-500" />
                                </div>

                                {/* <FieldArray name='subtasks'>
                                    {(arrayHelpers) => (
                                        <div>
                                            {arrayHelpers.form.values.subtasks.map((subtask, index) => (
                                                <div key={index} className='flex items-center gap-3'>
                                                    <Field
                                                        type='text'
                                                        className='w-full p-2 rounded border outline-[#322F64]'
                                                        name={`subtasks.${index}`}
                                                        placeholder='Enter subtask'
                                                    />
                                                    <button  type='button' className='p-2 bg-[#322F64] text-white' onClick={() => arrayHelpers.remove(index)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                            <button type='button' className='w-full p-2 bg-[#322F64] text-white mt-5' onClick={() => arrayHelpers.push('')}>
                                                Add Subtask
                                            </button>
                                        </div>
                                    )}
                                </FieldArray> */}


                                {
                                    params_row?._id &&
                                    (<div className="w-full space-y-3">
                                        <label htmlFor="" className="text-base font-medium ml-1 text-black ">Status</label>
                                        <Field as="select" rows='4' className="w-full p-2 text-black rounded border outline-[#322F64]" name='status'>
                                            <option value="">--select status--</option>
                                            <option value="Todo">Todo</option>
                                            <option value="Doing">Doing</option>
                                            <option value="Done">Done</option>
                                        </Field>
                                        <ErrorMessage name="status" component="div" className="text-red-500" />
                                    </div>)

                                }

                                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <button className='w-full p-3 rounded shadow border border-[#322F64] text-[#322F64]' onClick={() => dispatch(handleCloseTaskModel(false))}>Close</button>
                                    <button className='w-full p-3 rounded shadow bg-[#322F64] text-white' type='submit'>{!params_row?._id ? 'Create Task' : 'Update Task'}</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default TaskForm