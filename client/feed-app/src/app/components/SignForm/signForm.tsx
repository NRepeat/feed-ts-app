'use client'
import "./style.css"
import React, { FormEventHandler } from 'react';
import { Formik, Form, Field } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import GoogleButton from "../GoogleButton/googleButton";
import Link from "next/link";
import { userApi } from "@/app/api/userApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks";
import { userSelector } from "@/app/selector/selector";
import { getUser } from "@/app/redux/slices/userSlice";

interface MyFormValues {
  email: string;
  password: string;
}
interface FormSubmitHandler {
  (values: { email: string; password: string }): Promise<any>;
}
function SignForm() {
  const initialValues: MyFormValues = { email: '', password: '' };
  const router = useRouter();
  const session = useSession()
  const param = useSearchParams()
  const { user } = useAppSelector(userSelector)
  const dispatch = useAppDispatch()
  const callback = param.get("callbackUrl")
  const handleSubmitForm: FormSubmitHandler = async (values) => {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    });
    if (res && !res.error) {
      await dispatch(getUser({ email: values.email }));
      const status = true
      router.push('/newsfeed');
      if (session.data?.expires) {
        await userApi.setStatus(status, user.id, session.data.expires)

      }
    } else
      console.log(res)
  };

  return (
    <div className="flex h-screen items-center  justify-center  flex-col ">
      <div className="flex justify-center flex-col w-full text-center  text-lg sm:text-2xl">
        {callback?.includes("/profile") ? <strong className="lg:mb-20  mb-10 text-red-700">You are logged out of your account</strong> : <></>}
        {callback && <strong className="lg:mb-20 mb-5  text-red-700">To view the news please login</strong>}
      </div>

      <div className="w-full  ">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleSubmitForm(values);
          }}
        >
          <Form className='FormikForm  border-2 lg:w-2/4  md:w-2/3 rounded-md shadow-2xl text-center p-5'>
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
