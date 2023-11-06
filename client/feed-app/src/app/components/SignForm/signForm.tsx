'use client'
import "./style.css"
import React, { FormEventHandler } from 'react';
import { Formik, Form, Field } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import GoogleButton from "../GoogleButton/googleButton";
import Link from "next/link";

interface MyFormValues {
  email: string;
  password: string;
}

function SignForm() {
  const initialValues: MyFormValues = { email: '', password: '' };
  const router = useRouter();
  const param = useSearchParams()
  const callback = param.get("callbackUrl")
  const handleSubmitForm = async (values: any, event: any) => {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    });
    if (res && !res.error) {
      router.push('/')
    } else
      console.log(res)
  };

  return (
    <div className="flex h-screen items-center  justify-center  flex-col ">
      {callback && <strong className="mb-20 text-2xl text-red-700">To view the news please login</strong>}

      <div className="w-full  ">   
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleSubmitForm(values, actions);
          }}
        >
          <Form className='FormikForm  border-2 w-2/6 rounded-md shadow-2xl text-center p-5 '>
          <div className="mb-10">
              <strong className=" text-4xl ">Sign up</strong>
            </div>
            <label htmlFor="LoginEmail">Email</label>
            <Field type="email" id="LoginEmail" name="LoginEmail" placeholder="Email" required />
            <label htmlFor="LoginPassword">Password</label>
            <Field type="password" id="LoginPassword" name="LoginPassword" placeholder="Password" required />
            <div className="flex flex-col gap-5">
              <button type="submit">Submit</button>
              <GoogleButton />

              <Link className="bg-cyan-900 h-full text-white p-2 rounded-md" href={'/registration'}> Registration</Link></div>


          </Form>
        </Formik></div>

    </div>

  );
}

export default SignForm;
