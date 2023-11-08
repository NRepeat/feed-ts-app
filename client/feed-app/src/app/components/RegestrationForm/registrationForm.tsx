'use client'
import "./style.css"
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { userApi } from '@/app/api/userApi';
import Link from "next/link";
import { Modal, Box } from "@mui/material";
import { getUser } from "@/app/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks";
import { userSelector } from "@/app/selector/selector";


interface MyFormValues {
  name: string;
  email: string;
  password: string;
  moderatorCode: string;
}

function RegistrationForm() {
  const [togle, setTogle] = useState(false);
  const [userError, setUserError] = useState(false)
  const { user } = useAppSelector(userSelector)
  const router = useRouter();
  const dispatch = useAppDispatch()

  const expire = new Date()

  const initialValues: MyFormValues = {
    name: '',
    email: '',
    password: '',
    moderatorCode: '',
  };

  const handleToggle = () => {
    setTogle(!togle);
  };

  const handleSubmitForm = async (values: MyFormValues) => {
    try {
      const dbUser: any = await userApi.registration(
        values.email,
        values.password,
        values.name,
        values.moderatorCode,
      );
      if (dbUser) {
        await dispatch(getUser({ email: dbUser.data.data.user.userEmail }));
        const res = await signIn('credentials', {
          email: dbUser.data.data.user.userEmail,
          password: values.password,
          redirect: false,
        });
        if (res && !res.error) {
          const status = true
          router.push('/newsfeed');
          expire.setDate(expire.getDate() + 1);
          const expireString = expire.toISOString().split('T')[0];
          await userApi.setStatus(status, dbUser.data.data.user.id, expireString)

        } else {
          console.log(res);
        }
      } else {
        setUserError(true)
      }
    } catch (error) {
      console.error(error);
    }
  };
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className='flex  w-full min-h-screen justify-center items-center'>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          handleSubmitForm(values);
        }}
      >
        <Form className='w-full justify-center flex '>
          <div className=' border-2 lg:w-2/6 sm:w-1/2 w-full rounded-md shadow-2xl text-center p-5 ' >
            <div className="mb-10">
              <strong className=" text-4xl ">Sign up</strong>
            </div>
            <section className='flex items-center justify-between  flex-col gap-5'>
              <section className='flex  text-left w-full sm:w-1/2 flex-col'>
                <label htmlFor="name">Full name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  required
                />
              </section>
              <section className='flex  text-left w-full sm:w-1/2 flex-col'>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </section>
              <section className='flex text-left w-full sm:w-1/2 flex-col'>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                /></section>
              <section className='pl-3 flex w-full sm:w-1/2 flex-row '>
                <input
                  type="checkbox"
                  checked={togle}
                  onChange={handleToggle}
                  id="checkbox"
                />
                <label className="pt-1" htmlFor="checkbox">If you have moderator code</label>
              </section>
              {togle && <div className='flexw-full sm:w-1/2 flex-col'>
                <Field
                  type="text"
                  id="moderatorCode"
                  name="moderatorCode"
                  placeholder="Moderator Code"
                /></div>}
              <div className="flex  justify-evenly  w-full">  <Link className="backButton transition-all" href={"/signin"}>
                <button className="flex justify-center items-center w-full h-full "> <strong> Back to sign in</strong>  </button></Link>
                <button className="submitButton" type="submit"> <strong>Register</strong> </button></div>
            </section>
          </div>
        </Form>
      </Formik>
      <Modal
        open={userError}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "50%" }}>
          <button className='border-2 p-2 hover:bg-black hover:text-white' onClick={() => setUserError(false)}>Close Modal</button>
          <p>User with this email {user.email} exist</p>
        </Box>
      </Modal>
    </div>
  );
}

export default RegistrationForm;
