import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import Raect from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { UserFormValues } from '../../../app/models/user';
import ValidationErrors from '../../errors/ValidationErrors';

export default observer(function UserForm() {
    const { userStore } = useStore();
console.log(userStore.user);

    return (
        <Formik
            initialValues={{ firstName:'', lastName:'', address:'', city:'', state:'', zipCode:'', country:'' , email: '', password: '', clientSideChangeBy: userStore.user?.userId, clientId: userStore.user?.clientId, phoneNumber:'',isAdmin:false, active:true, profileImage:null, profilePath: '', sysTimeZone:'', sysTimeOffset:'',   error: null }}
            onSubmit={(values, { setErrors }) => userStore.addUser(values).catch(error =>
                setErrors({ error }))}
                validationSchema={Yup.object({
                    firstName: Yup.string().required(),
                    lastName: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().required(),
                    address: Yup.string().required(),
                    city: Yup.string().required(),
                    state: Yup.string().required(),
                    zipCode: Yup.string().required(),
                    country: Yup.string().required(),
                   
                    
                })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (

                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as ='h2' content = 'Add New User' color='teal' textAlign='center' />
                    <MyTextInput name='clientSideChangeBy' placeholder='' type='hidden' />
                    <MyTextInput name='clientId' placeholder='' type='hidden' />
                    <MyTextInput name='firstName' placeholder='First Name' />
                    <MyTextInput name='lastName' placeholder='Last Name' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <MyTextInput name='phoneNumber' placeholder='Phone Number' />
                  
                    <MyTextInput name='address' placeholder='address' />
                    <MyTextInput name='city' placeholder='City' />
                    <MyTextInput name='state' placeholder='State' />
                    <MyTextInput name='zipCode' placeholder='ZipCode' />
                    <MyTextInput name='country' placeholder='Country' />
                   
                    <ErrorMessage
                        name='error' render={() =>
                          <ValidationErrors  errors = {errors.error}/>}
                    />
                    <Button  disabled={!isValid || !dirty || isSubmitting} 
                    loading={isSubmitting} positive content='Submit' type='submit' fluid />

                </Form>
            )}

        </Formik>
    )
})