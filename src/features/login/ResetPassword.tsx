import { ErrorMessage, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { Button, Container, Header, Label, Segment, Image } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';


export default function ResetPassword(){

    const { userStore } = useStore();
const[requestSubmitted, setRequestSubmitted] = useState(false);

const validationSchema =   Yup.object({
   
    password: Yup.string()
        .concat(Yup.string().required('Password is required') )
        .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
        .when('password', (password, schema) => {
           return schema.required('Confirm Password is required');
        })
        .oneOf([Yup.ref('password')], 'Passwords must match')

})

    return (

<Segment inverted textAlign='center' vertical className='masthead'>

<Container text>
    <Header as ='h1' inverted>
        <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom:12}} />
    MergencePro
    </Header>

<Header as ='h2' content = 'Change Password' style={{color:'white'}} textAlign='center' />










{requestSubmitted ?(
    <>
   <p>Your password has been successfully changed. click <a>here to login</a></p>

    </>
):
(

<Formik
validationSchema={validationSchema}
initialValues={{ password: '', confirmPassword:'', error: null }}
onSubmit={(values, { setErrors }) => userStore.resetPassword(values).then(e=>setRequestSubmitted(true)).catch(error =>
    setErrors({ error: error }))}
>
{({ handleSubmit, isSubmitting, errors }) => (

    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
       
        <p>Enter a new password below to change your password</p>
        <MyTextInput name='password' placeholder='Password' type='password' />
        <MyTextInput name='confirmPassword' placeholder='Confirm Password' type='password' />
        <ErrorMessage
            name='error' render={() =>
                <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />}
        />
        <Button loading={isSubmitting} color='blue' content='Send Reset Link' type='submit' fluid />

    </Form>
)}

</Formik>

)}


</Container>
</Segment>
    
    )

}