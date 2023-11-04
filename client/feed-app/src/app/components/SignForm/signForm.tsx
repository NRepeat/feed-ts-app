'use client'

import React, { FormEventHandler } from 'react';
import { Formik, Form, Field } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface MyFormValues {
  email: string;
  password: string;
}

function SignForm() {
  const initialValues: MyFormValues = { email: '', password: '' };
  const router = useRouter();

  const handleSubmitForm = async (values: any, event: any) => {
    const res = await signIn('credentials', {
      email:values.email      ,
      password: values.password,
      redirect: false
    });
    if (res && !res.error) {
      router.push('/')
    } else
      console.log(res)
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        handleSubmitForm(values,actions);
      }}
    >
      <Form>
        <label htmlFor="LoginEmail">Email</label>
        <Field type="email" id="LoginEmail" name="LoginEmail" placeholder="Email" required />
        <label htmlFor="LoginPassword">Password</label>
        <Field type="password" id="LoginPassword" name="LoginPassword" placeholder="Password" required />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default SignForm;
