import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import Raect, { useEffect, useState } from 'react';
import { Accordion, AccordionTitleProps, Button, Grid, Header, Icon, Label, Message, Segment } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { UserFormValues } from '../../../app/models/user';
import ValidationErrors from '../../errors/ValidationErrors';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { v4 as uuid } from 'uuid';
//import * as roleData from './TestRoleDataSource.json';
import { history } from '../../..';
import { Role } from '../../../app/models/role';
import UserHeader from './UserHeader';

import "../../../features/syncFusion.css";



export default observer(function UserForm() {



    const history = useHistory();
    const { commonStore, userStore, roleStore } = useStore();
    const { setSideBarDisplay } = commonStore;
    const { addUser, updateUser, loading, getRegisteredUser, loadingInitial } = userStore;
    const { getRoles } = roleStore;
    const { id } = useParams<{ id: string }>();
    const [addMode, setAddMode] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);


    //Use to keep track of all available roles and selected roles unmodified
    const [allRolesUnmodified, setRolesUnmodified] = useState<Role[]>();
    const [selectedRolesUnmodified, setSelectedRolesUnmodified] = useState<Role[]>();

    //Use to keep track of all roles (modified to fit the structure expected by the multi select component)
    const [allRoles, setAllRoles] = useState<{ [key: string]: Object; }[]>();

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
        phoneNumber: '',

        imageId: '',
        imagePath: '',
        // isAdmin: false,
        // active: true,
        // profileImage: '',
        // profilePath: '',
        // sysTimeZone: '',
        // sysTimeOffset: '',

        clientSideChangeBy: userStore.user?.userId,
        clientId: userStore.user?.clientId,
        userId: uuid(),
        roles: []



    } as UserFormValues);




    function getValidationSchema(addMode: boolean) {

        var result = null;
        if (addMode) {

            result = Yup.object({
                firstName: Yup.string().required(),
                lastName: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
                address: Yup.string().required(),
                city: Yup.string().required(),
                state: Yup.string().required(),
                zipCode: Yup.string().required(),
                country: Yup.string().required(),


            });

        }
        else {
            result = Yup.object({
                firstName: Yup.string().required(),
                lastName: Yup.string().required(),
                email: Yup.string().required().email(),
                address: Yup.string().required(),
                city: Yup.string().required(),
                state: Yup.string().required(),
                zipCode: Yup.string().required(),
                country: Yup.string().required(),
                password: Yup.string()
                    .concat(addMode ? Yup.string().required('Password is required') : Yup.string().optional())
                    .min(6, 'Password must be at least 6 characters'),
                confirmPassword: Yup.string()
                    .when('password', (password, schema) => {
                        if (password || addMode) return schema.required('Confirm Password is required');
                    })
                    .oneOf([Yup.ref('password')], 'Passwords must match')

            })
        }

        return result;

    }


    const validationSchema = getValidationSchema(addMode);

    // Yup.object({
    //     firstName: Yup.string().required(),
    //     lastName: Yup.string().required(),
    //     email: Yup.string().required().email(),
    //     //password: addMode ? Yup.string().required() : Yup.string(),
    //     address: Yup.string().required(),
    //     city: Yup.string().required(),
    //     state: Yup.string().required(),
    //     zipCode: Yup.string().required(),
    //     country: Yup.string().required(),


    // })

    useEffect(() => {

        // show sidebar nav
        setSideBarDisplay(true);


        if (id) getRegisteredUser(id).then(registeredUser => {

            setRegisteredUser(registeredUser!);
            setAddMode(false);
        }
        );

        //in addMode, no user is selected - so read projectid from localstorage and retrieve all roles for projectId
        // getRoles(registeredUser ? registeredUser.clientId! : window.localStorage.getItem("cid")!).then(roles => {

        getRoles(window.localStorage.getItem("pjid")!).then(roles => {


            let rolesObj: { [key: string]: Object; }[] = roles!.map((role) => {
                return { roleId: role.roleId, roleName: role.roleName }

            });

            setAllRoles(rolesObj);

            setRolesUnmodified(roles);

        })

    }, [id, getRegisteredUser, setAddMode, getRoles, setAllRoles, setRolesUnmodified, setSideBarDisplay])




    function getSelectedRoles() {

        let selectedRolesObj: string[] = []

        if (registeredUser.roles !== undefined) {
            selectedRolesObj = registeredUser!?.roles!.map((role) => {
                return role.roleId

            });
        };

        return selectedRolesObj;
    }



    const selectedRoles = getSelectedRoles();





    function handleAccordionClick(titleProps: AccordionTitleProps) {
        const index = Number(titleProps.index);
        //const { activeIndex } = this.state
        let newIndex: number = activeIndex === index ? -1 : index

        setActiveIndex(newIndex!);
    }



    function handleMultiSelectChange(data: any) {


        if(allRolesUnmodified){


            var arrayLength = data.value.length;

            const finalResult: Role[] = []
    
            for (var i = 0; i < arrayLength; i++) {
    
                let role = allRolesUnmodified!.filter(x => x.roleId == data.value[i]);
                //Do something
                finalResult.push(role[0]);
            }
    
            setSelectedRolesUnmodified(finalResult);
    
            let result = allRolesUnmodified!.filter(role => {
                return Object.keys(data.value).every(x => role.roleId === data.value[x] as string);
    
            });


        }
     

    }

    async function handleFormSubmit(registeredUser: UserFormValues) {

        try {

            registeredUser.roles = selectedRolesUnmodified;
console.log('obj to update');
console.log(registeredUser);

            if (registeredUser.userId?.length === 0 || registeredUser.userId === undefined) {

                let newUser = {
                    ...registeredUser,
                    userId: uuid()
                }

                await addUser(newUser).then(() => {
                    history.push('security');



                })
            }
            else {
                alert('updating user');
                await updateUser(registeredUser).then(() => {
                    history.push('security');
                })
            }

            //return Promise.resolve(true); 
        } catch (error) {
            alert(error);
        }



    }


console.log(allRoles);
console.log(selectedRoles);


    if (loadingInitial) return <LoadingComponent content='Loading...' />

    return (


        <div className='pmpacomp'>
            <UserHeader firstName={registeredUser.firstName || ''} lastName={registeredUser.lastName || ''} photoUrl={registeredUser.imagePath || ''}></UserHeader>
            {/* userStore.addUser(values.registeredUser) */}
            <Segment clearing>

                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={{
                        email: registeredUser.email || '',
                        password: registeredUser.password || '',

                        firstName: registeredUser.firstName || '',
                        lastName: registeredUser.lastName || '',
                        address: registeredUser.address || '',
                        city: registeredUser.city || '',
                        state: registeredUser.state || '',
                        zipCode: registeredUser.zipCode || '',
                        country: registeredUser.country || '',
                        phoneNumber: registeredUser.phoneNumber || '',

                        imageId: registeredUser.imageId || '',
                        imagePath: registeredUser.imagePath || '',

                        // isAdmin: registeredUser.isAdmin,
                        // active: registeredUser.active,
                        // profileImage: registeredUser.profileImage,
                        // profilePath: registeredUser.profilePath,
                        // sysTimeZone: registeredUser.sysTimeZone,
                        // sysTimeOffset: registeredUser.sysTimeOffset,

                        clientSideChangeBy: userStore.user?.userId,
                        clientId: userStore.user?.clientId,
                        userId: registeredUser.userId || '',


                        error: null

                    }}
                    //  initialValues={{formObj:registeredUser, error:null}}

                    //   onSubmit={(values, { setErrors }) => handleFormSubmit(values.formObj).catch(error=>   
                    //    setErrors({error: "An error occured" })      )}
                    onSubmit={(values, { setErrors }) =>
                        // ((id?.length === 0 || id === undefined) ? 
                        // addUser(values) 
                        // : updateUser(values))
                        handleFormSubmit(values)
                            .catch(error =>
                                setErrors({ error: error }))}
                // onSubmit={values=> handleFormSubmit(values)} 
                >
                    {/* {({ handleSubmit, isSubmitting, errors, isValid, dirty}) => ( */}

                    {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (


                        <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>

                            {addMode ? (
                                <Header as='h2' content='Add New User' color='black' textAlign='left' />

                            ) :
                                (
                                    <Header as='h2' content='Edit User' color='black' textAlign='left' />
                                )
                            }


                            <MyTextInput name='clientSideChangeBy' placeholder='' type='hidden' />
                            <MyTextInput name='clientId' placeholder='' type='hidden' />
                            <MyTextInput name='userId' placeholder='' type='hidden' />


                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <MyTextInput label='First Name' name='firstName' placeholder='First Name' />
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <MyTextInput label='Last Name' name='lastName' placeholder='Last Name' />
                                    </Grid.Column>
                                </Grid.Row>


                                {addMode ? (
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <MyTextInput label='Email Address' name='email' placeholder='Email' />
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <MyTextInput label='Password' name='password' placeholder='Password' type='password' />
                                        </Grid.Column>
                                    </Grid.Row>

                                ) :

                                    (

                                        <Grid.Row>
                                            <Grid.Column >
                                                <MyTextInput label='Email Address' name='email' placeholder='Email' />
                                            </Grid.Column>

                                        </Grid.Row>

                                    )
                                }

                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <MyTextInput label='Address' name='address' placeholder='address' />
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <MyTextInput label='City' name='city' placeholder='City' />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <MyTextInput label='State' name='state' placeholder='State' />
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <MyTextInput label='Zip Code' name='zipCode' placeholder='ZipCode' />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <MyTextInput label='Country' name='country' placeholder='Country' />
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <MyTextInput label='PhoneNumber' name='phoneNumber' placeholder='Phone Number' />
                                    </Grid.Column>
                                </Grid.Row>


                                <Grid.Row>
                                    <Grid.Column>
                                        <MultiSelectComponent id="boxelement" dataSource={allRoles!} value={selectedRoles}
                                            //change={()=>alert('test')}
                                            change={(data: any) => (handleMultiSelectChange(data))}
                                            mode="Box" floatLabelType='Always'
                                            fields={{ text: 'roleName', value: 'roleId' }}
                                            style={{ border: '0 px !important' }}
                                            placeholder="Select roles" />
                                    </Grid.Column>

                                </Grid.Row>

                            </Grid>


                            {addMode ? (
                                <div style={{ marginBottom: '20px' }}>
                                </div>
                            ) :
                                (



                                    <Accordion fluid styled style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        <Accordion.Title
                                            active={activeIndex === 0}

                                            index={0}
                                            onClick={(e, data) => (handleAccordionClick(data))}
                                        >
                                            <Icon name='dropdown' />
                                            <Label color='orange' size='large' content='Change Password' />
                                        </Accordion.Title>
                                        <Accordion.Content active={activeIndex === 0}>
                                            <Message>

                                                <p>
                                                    Leave blank to keep the passsword the same
                                                </p>
                                            </Message>
                                            <MyTextInput label='New Password' name='password' placeholder='Password' type='password' />
                                            <MyTextInput label='Confirm Password' name='confirmPassword' placeholder='Confirm Password' type='password' />


                                        </Accordion.Content>


                                    </Accordion>

                                )

                            }




                            <ErrorMessage
                                name='error' render={() =>
                                    <ValidationErrors errors={errors.error} />}
                            />

                            <Button as={Link} to='/security' floated='right' type='button' content='Cancel' />
                            {/* <Button disabled={!isValid || !dirty || isSubmitting} */}
                            {/* <Button disabled={Object.keys(errors).length !== 0 || !dirty || isSubmitting}
                                loading={isSubmitting} color='blue' content='Submit' type='submit' floated='right' /> */}
                            <Button
                                loading={isSubmitting} color='blue' content='Submit' type='submit' floated='right' />
                        </Form>
                    )}

                </Formik>

            </Segment>
        </div>
    )
})