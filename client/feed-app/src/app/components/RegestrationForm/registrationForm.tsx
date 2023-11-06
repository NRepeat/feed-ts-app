'use client'
import "./style.css"
import React, { FormEventHandler, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { userApi } from '@/app/api/userApi';
import Link from "next/link";

interface MyFormValues {
  name: string;
  email: string;
  password: string;
  moderatorCode: string;
}

function RegistrationForm() {
  const [togle, setTogle] = useState(false);
  const initialValues: MyFormValues = {
    name: '',
    email: '',
    password: '',
    moderatorCode: '',
  };
  const router = useRouter();

  const handleToggle = () => {
    setTogle(!togle);
  };

  const handleSubmitForm = async (values: MyFormValues) => {
    try {
      const dbUser: any = await userApi.registration(
        values.email,
        values.password,
        values.name,
        values.moderatorCode
      );
      if (dbUser) {
        const res = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        if (res && !res.error) {
          router.push('/newsfeed');
        } else {
          console.log(res);
        }
      }


    } catch (error) {
      console.error(error);
    }
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

          <div className=' border-2 w-2/6 rounded-md shadow-2xl text-center p-5 ' >
            <div className="mb-10">
              <strong className=" text-4xl ">Sign up</strong>
            </div>


            <section className='flex items-center justify-between  flex-col gap-5'>
              <section className='flex  text-left w-1/2 flex-col'>
              <label htmlFor="name">Full name</label>
                <Field

                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  required
                />
              </section>



              <section className='flex  text-left w-1/2 flex-col'>
              <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </section>


              <section className='flex text-left w-1/2 flex-col'>
              <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                /></section>

              <section className='pl-3 flex w-1/2 flex-row'>

                <input
                  type="checkbox"
                  checked={togle}
                  onChange={handleToggle}
                  id="checkbox"
                />
                <label htmlFor="checkbox">If you have moderator code</label>
              </section>
              {togle && <div className='flex w-1/2 flex-col'>
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

    </div>

  );
}

export default RegistrationForm;
