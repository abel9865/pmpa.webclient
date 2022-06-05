import { ErrorMessage, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';

export default function ForgotPassword(){
    const { userStore } = useStore();
const[requestSubmitted, setRequestSubmitted] = useState(false);

    return (

<>

<Header as ='h2' content = 'Reset Password' color='blue' textAlign='center' />
{requestSubmitted ?(
    <>
   <p>If we find the account associated with this email, you will receive an email soon. Please check your inbox and spam folders.</p>

    </>
):
(

<Formik
initialValues={{ email: '', error: null }}
onSubmit={(values, { setErrors }) => userStore.sendPasswordResetEmail(values).then(e=>setRequestSubmitted(true)).catch(error =>
    setErrors({ error: 'Invalid email ' }))}
>
{({ handleSubmit, isSubmitting, errors }) => (

    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
       
        <p>Please enter your email address. We will send you a link to reset your password.</p>
        <MyTextInput name='email' placeholder='Email' />
      
        <ErrorMessage
            name='error' render={() =>
                <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />}
        />
        <Button loading={isSubmitting} color='blue' content='Send Reset Link' type='submit' fluid />

    </Form>
)}

</Formik>

)}


</>
    
    )
}