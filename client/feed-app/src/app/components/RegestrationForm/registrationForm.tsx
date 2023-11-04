'use client'

import React, { FormEventHandler, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { userApi } from '@/app/api/userApi';

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
          router.push('/FeedPage');
        } else {
          console.log(res);
        }
      }


    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        handleSubmitForm(values);
      }}
    >
      <Form>
        <label htmlFor="name">Full name</label>
        <Field
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          required
        />

        <label htmlFor="email">Email</label>
        <Field
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />

        <label htmlFor="password">Password</label>
        <Field
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <label htmlFor="checkbox">If you have moderator code</label>
        <input
          type="checkbox"
          checked={togle}
          onChange={handleToggle}
          id="checkbox"
        />
        {togle && <div><label htmlFor="moderatorCode">Moderator Code</label>
          <Field
            type="text"
            id="moderatorCode"
            name="moderatorCode"
            placeholder="Moderator Code"
          /></div>}

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default RegistrationForm;
