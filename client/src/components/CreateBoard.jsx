import React from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateBoardMutation, useUpdateBoardMutation } from '../redux/slices/boardSlices';
import { useDispatch, useSelector } from 'react-redux';
import { handleClose } from '../redux/slices/popUpSlices';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Modal } from '@mui/material';
import * as Yup from 'yup'
const CreateBoard = () => {
    const isOpen = useSelector(state => state.popUp.popUp);
    const dispatch = useDispatch()
    const params_row = useLocation().state;
    const [createBoard] = useCreateBoardMutation()
    const [updateBoard] = useUpdateBoardMutation()
    const navigate = useNavigate();
    const initialValues = {
        title: '',
        description: '',
        color: ''
    }
    const validationSchema = Yup.object({
        title: Yup.string().required('title is required')
            .matches(/^[a-zA-Z]*$/, 'Title should only contain letters')
            .matches(/^\S*$/, 'Title should not contain white spaces'),
        description: Yup.string().required('descriptionis required'),
        color: Yup.string().required('color is required'),
    })

    const handleSubmit = async (values, { resetForm }) => {
        try {
            console.log('values', values);
            const { title, description, color } = values;
            const id = params_row?.id;
            if (!id) {
                createBoard({ title, description, color })
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
                updateBoard({ id: id, updateBoard: { title: title, description: description, color: color } })
                    .then((res) => {
                        const status = res?.data?.status;
                        const message = res?.data?.message;
                        if (status) {
                            toast.success(message);
                            resetForm();
                            navigate('/');
                            dispatch(handleClose(false))
                        } else {
                            toast.error(message);
                        }
                    })
                    .catch(err => {
                        toast.error(err?.data);
                    });
            }
        } catch (error) {
            console.log('error submitting category', error.message);
        }
    }

    const colorOptions = [
        "#1B80D9", "#0B489E", "#4B3D7D", "#9664C2", "#F1833A"
    ]

    return (
        <div className='w-full'>
            <Modal open={isOpen} onClose={() => dispatch(handleClose(false))}>
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="w-[70%] md:w-[30%] bg-white dark:bg-slate-800 dark:text-white p-4 rounded-lg">
                        <label htmlFor="" className="text-base font-medium ml-1">Create Board</label>
                        <hr className='w-full mt-3' />
                        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            <Form className='w-full space-y-5 p-4 text-black'>
                                <div className='w-full space-y-2'>
                                    <label htmlFor="" className="text-base font-medium ml-1">Title</label>
                                    <Field className="p-3 rounded border w-full outline-[#322F64]" type="text" placeholder='Enter board name eg. taskWave' name="title" />
                                    <ErrorMessage name='title' className='text-red-500' component="div" />
                                </div>
                                <div className="w-full space-y-3">
                                    <label htmlFor="" className="text-base font-medium ml-1">Description</label>
                                    <Field as="textarea" rows='4' className="w-full px-3 py-2 rounded border outline-[#322F64]" name='description' placeholder='Enter description' />
                                    <ErrorMessage name="description" component="div" className="text-red-500" />
                                </div>


                                <div className='w-full space-y-2'>
                                    <label htmlFor="" className="text-base font-medium ml-1">Color</label>
                                    <div className="flex gap-3">
                                        {colorOptions.map((option) => (
                                            <label key={option} className="flex items-center gap-3">
                                                <Field
                                                    type="radio"
                                                    name="color"
                                                    value={option}
                                                />
                                                <div
                                                    className="w-6 h-6 rounded-full"
                                                    style={{ backgroundColor: option }}
                                                ></div>
                                            </label>
                                        ))}
                                    </div>
                                    <ErrorMessage name='color' className='text-red-600' component="div" />
                                </div>

                                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <button className='w-full p-3 rounded shadow border border-[#322F64] text-[#322F64]' onClick={() => dispatch(handleClose(false))}>Close</button>
                                    <button className='w-full p-3 rounded shadow bg-[#322F64] text-white' type='submit'>{!params_row?.id ? 'Create Board' : 'Update Board'}</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CreateBoard