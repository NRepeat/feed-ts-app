'use client'
import "./style.css"
import React, { FormEventHandler } from 'react';
import { Formik, Form, Field } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import GoogleButton from "../GoogleButton/googleButton";
import Link from "next/link";
import { userApi } from "@/app/api/userApi";

interface MyFormValues {
  email: string;
  password: string;
}

function SignForm() {
  const initialValues: MyFormValues = { email: '', password: '' };
  const router = useRouter();
  const session = useSession()
  const param = useSearchParams()
  const callback = param.get("callbackUrl")
  const handleSubmitForm = async (values: any, event: any) => {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    });
    if (res && !res.error) {

      const dbUser: any = await userApi.getUser(values.email)
      const status = true
      router.push('/newsfeed');
      await userApi.setStatus(status, dbUser.data.data.user.id, session.data?.expires)
    } else
      console.log(res)
  };

  return (
    <div className="flex h-screen items-center  justify-center  flex-col ">
      {callback?.includes("/profile") ? <strong className="mb-20 text-2xl text-red-700">You are logged out of your account</strong> : <></>}
      {callback && <strong className="mb-20 text-2xl text-red-700">To view the news please login</strong>}
      <div className="w-full  ">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleSubmitForm(values, actions);
          }}
        >
          <Form className='FormikForm  border-2 w-2/6 rounded-md shadow-2xl text-center p-5'>
            <div className="mb-10">
              <strong className=" text-4xl">Sign in</strong>
            </div>
            <label htmlFor="LoginEmail">Email</label>
            <Field type="email" id="LoginEmail" name="email" placeholder="Email" required />
            <label htmlFor="LoginPassword">Password</label>
            <Field type="password" id="LoginPassword" name="password" placeholder="Password" required />
            <div className="flex flex-col gap-5">
              <button type="submit">Submit</button>
              <GoogleButton />
              <Link
                className="bg-cyan-900 h-full hover:bg-cyan-800 transition-all text-white p-2 rounded-md"
                href={'/registration'}
              >
                Registration
              </Link>
            </div>
          </Form>
        </Formik></div>

    </div>

  );
}

export default SignForm;
