import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import Raect, { useEffect, useState } from 'react';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { UserFormValues } from '../../../app/models/user';
import ValidationErrors from '../../errors/ValidationErrors';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';
import { history } from '../../..';

export default observer(function UserForm() {
    const history = useHistory();
    const { userStore } = useStore();

    const { addUser, updateUser, loading, getRegisteredUser, loadingInitial } = userStore;
    const { id } = useParams<{ id: string }>();
    const [addMode, setAddMode] = useState(true);
    const [opErr, setOpErr] = useState();
  
    const [registeredUser, setRegisteredUser] = useState<UserFormValues>({
        email: '',
        password: '',
        
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phoneNumber:'',
        
        // isAdmin: false,
        // active: true,
        // profileImage: '',
        // profilePath: '',
        // sysTimeZone: '',
        // sysTimeOffset: '',

        clientSideChangeBy: userStore.user?.userId,
        clientId: userStore.user?.clientId,
        userId: uuid()
       
       

    } as UserFormValues);

    const validationSchema = Yup.object({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
        address: Yup.string().required(),
        city: Yup.string().required(),
        state: Yup.string().required(),
        zipCode: Yup.string().required(),
        country: Yup.string().required(),


    })

console.log(id);
    console.log(registeredUser);

    useEffect(() => {
        if (id) getRegisteredUser(id).then(registeredUser => {


          

            setRegisteredUser(registeredUser!);
            setAddMode(false);
        
        }
        )
    }, [id, getRegisteredUser])


    function handleFormSubmit(registeredUser: UserFormValues) {

try {
    if (registeredUser.userId?.length === 0 || registeredUser.userId===undefined) {
       
        let newUser = {
            ...registeredUser,
            userId: uuid()
        }

        addUser(newUser).then(() => {
            history.push('security');


           
        })
    }
    else {
        alert('updating user');
        updateUser(registeredUser).then(() => {
            history.push('security');
        })
    }

    //return Promise.resolve(true); 
} catch (error) {
 alert(error) ;
}
      


    }



    function getInitalValues():UserFormValues{
var result;

        if(addMode){
            result =  
            {
                email: '',
                password: '',
                
                firstName: '',
                lastName: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
                phoneNumber:'',
                
                // isAdmin: false,
                // active: true,
                // profileImage: '',
                // profilePath: '',
                // sysTimeZone: '',
                // sysTimeOffset: '',
        
                clientSideChangeBy: userStore.user?.userId,
                clientId: userStore.user?.clientId,
                userId: uuid()
               
               
        
            } as UserFormValues
        }
        else{
             
            result = {
                email: registeredUser.email,
                password: registeredUser.password,
                
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                address: registeredUser.address,
                city: registeredUser.city,
                state: registeredUser.state,
                zipCode: registeredUser.zipCode,
                country: registeredUser.country,
                phoneNumber:registeredUser.phoneNumber,
                
                // isAdmin: registeredUser.isAdmin,
                // active: registeredUser.active,
                // profileImage: registeredUser.profileImage,
                // profilePath: registeredUser.profilePath,
                // sysTimeZone: registeredUser.sysTimeZone,
                // sysTimeOffset: registeredUser.sysTimeOffset,
        
                clientSideChangeBy: userStore.user?.userId,
                clientId: userStore.user?.clientId,
              userId:registeredUser.userId, 
             
            };
        }

        return result;
    }

    var initialValues = getInitalValues();

    if (loadingInitial) return <LoadingComponent content='Loading...' />

    return (

        // <Segment clearing >
        <div className='pmpacomp'>
            {/* userStore.addUser(values.registeredUser) */}
            <Formik
             validationSchema={validationSchema}
             enableReinitialize
             initialValues={{
                email: registeredUser.email ||'',
                password: registeredUser.password || '',
                
                firstName: registeredUser.firstName || '',
                lastName: registeredUser.lastName || '',
                address: registeredUser.address || '',
                city: registeredUser.city || '',
                state: registeredUser.state || '',
                zipCode: registeredUser.zipCode || '',
                country: registeredUser.country || '',
                phoneNumber:registeredUser.phoneNumber || '',
                
                // isAdmin: registeredUser.isAdmin,
                // active: registeredUser.active,
                // profileImage: registeredUser.profileImage,
                // profilePath: registeredUser.profilePath,
                // sysTimeZone: registeredUser.sysTimeZone,
                // sysTimeOffset: registeredUser.sysTimeOffset,
        
                clientSideChangeBy: userStore.user?.userId,
                clientId: userStore.user?.clientId,
              userId:registeredUser.userId || '', 
                
                
                error:null

             }}
              //  initialValues={{formObj:registeredUser, error:null}}
               
                //   onSubmit={(values, { setErrors }) => handleFormSubmit(values.formObj).catch(error=>   
                //    setErrors({error: "An error occured" })      )}
                onSubmit={(values, { setErrors }) => 
                  ((id?.length === 0 || id===undefined) ? addUser(values): updateUser(values))
                .catch(error=>   
                    setErrors({error: error })      )}
              // onSubmit={values=> handleFormSubmit(values)} 
            >
                {/* {({ handleSubmit, isSubmitting, errors, isValid, dirty}) => ( */}

                {({ handleSubmit, isSubmitting, errors, isValid, dirty}) => (
              

                    <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>

                        {id ? (

                            <Header as='h2' content='Edit User' color='black' textAlign='left' />
                        ) :
                            (
                                <Header as='h2' content='Add New User' color='black' textAlign='left' />
                            )
                        }


                         <MyTextInput name='clientSideChangeBy' placeholder='' type='hidden' />
                        <MyTextInput name='clientId' placeholder='' type='hidden' />
                        <MyTextInput name='userId' placeholder='' type='hidden' />
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

                        <Button as={Link} to='/security' floated='right' type='button' content='Cancel' />
                        {/* <Button disabled={!isValid || !dirty || isSubmitting} */}
                        <Button disabled={Object.keys(errors).length!==0 || !dirty || isSubmitting}
                            loading={isSubmitting} color='blue' content='Submit' type='submit' floated='right' />
                    </Form>
                )}

            </Formik>

        {/* </Segment> */}
        </div>
    )
})