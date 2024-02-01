import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { SiTask } from 'react-icons/si'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { BiHide, BiShow } from "react-icons/bi";
import { useLoginUserMutation } from '../redux/slices/UserSlices';
import { useSelector } from 'react-redux';
const userLogin = () => {
  const boardColor = useSelector(state => state.boardColor.boardColor)
  const textColor = useSelector(state => state.boardColor.textColor)
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState('password');
  const initialValues = {
    email: '',
    password: ''
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required")
  })
  const handleSubmit = (values) => {
    const { email, password } = values;
    loginUser({ email, password })
      .then((res) => {
        const status = res?.data?.status;
        if (status) {
          toast.success(res?.data?.message);
          navigate('/');
        } else {
          toast.error(res?.data?.message);
        }
      }).catch((err) => {
        console.log(err);
      })
  }
  return (
    <div className='w-full p-4 dark:bg-slate-800 dark:text-white'
    style={{ backgroundColor: boardColor, color: textColor }}>
      <div className='w-[90%] md:w-[40%] lg:w-[30%] p-4 shadow rounded mx-auto mt-[10%] bg-white text-black'>
        <Formik onSubmit={handleSubmit} enableReinitialize
          initialValues={initialValues} validationSchema={validationSchema}>
          <Form className='w-full space-y-6 '>
            <div className='w-full flex flex-row gap-3 justify-center'>
              <SiTask size={30} />
              <h1 className='text-base font-medium'>TaskWave</h1>
              <span className='text-base'> - Login</span>
            </div>
            <div className='w-full'>
              <Field type='text' name='email' placeholder="Enter email"
                className='w-full p-3 rounded border' />
              <ErrorMessage className='text-red-500' name='email' component='div' />
            </div>
            <div className='w-full relative'>
              <Field type={showPassword} name='password' placeholder="Enter password"
                className='w-full p-3 rounded border' />
              <ErrorMessage className='text-red-500' name='password' component='div' />
              {
                showPassword == 'password' ?
                  <BiHide className=' absolute top-3 right-3' size={20} onClick={() => setShowPassword('text')} />
                  : <BiShow className=' absolute top-3 right-3' size={20} onClick={() => setShowPassword('password')} />
              }
            </div>
            <button type='submit' className='w-full text-base font-medium bg-slate-800 dark:bg-white dark:text-black text-white p-3 rounded shadow'>login</button>
            <p className='w-full text-center' > <span className='inline text-base font-light'>I don't have account !</span> <Link className='inline text-base font-medium' to='/user-register'>Register</Link></p>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default userLogin