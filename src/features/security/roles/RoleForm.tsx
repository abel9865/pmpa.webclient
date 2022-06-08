import { ErrorMessage, Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import Raect, { FormEvent, useEffect, useState } from 'react';
import { Accordion, AccordionTitleProps, Button, Checkbox, CheckboxProps, Grid, Header, Icon, Label, Segment } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { UserFormValues } from '../../../app/models/user';
import ValidationErrors from '../../errors/ValidationErrors';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import {
    ListBoxComponent, Inject,
    CheckBoxSelection
} from '@syncfusion/ej2-react-dropdowns';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { v4 as uuid } from 'uuid';
//import * as roleData from './TestRoleDataSource.json';
import { history } from '../../..';
import { Role } from '../../../app/models/role';
import MyToggleInput from '../../../app/common/form/MyToggleInput';
import { values } from 'mobx';
import moment from 'moment';
import "../../../features/syncFusion.css";

export default observer(function RoleForm() {



    const history = useHistory();
    const { commonStore, userStore, roleStore, clientProjectStore } = useStore();
    const { setSideBarDisplay } = commonStore;
    const { selectedClientProject } = clientProjectStore;

    const { createRole, updateRole, getRole, loading, loadingInitial } = roleStore;

    const { id } = useParams<{ id: string }>();
    const [addMode, setAddMode] = useState(true);
    const [activeVal, setActiveVal] = useState(true);



    const [role, setRole] = useState<Role>({

        roleId: '',
        roleName: '',
        active: true,
        createdBy: '',
        createdDate: moment().format(),
        lastUpdatedBy: '',
        lastUpdatedDate: moment().format(),
        projectId: selectedClientProject?selectedClientProject.projectId: window.localStorage.getItem("pjid"),
        clientId: selectedClientProject? selectedClientProject!.clientId!: window.localStorage.getItem("cid")



    } as Role);







    const validationSchema =
        Yup.object({
            roleName: Yup.string().required()
        })

    useEffect(() => {


        // show sidebar nav
        setSideBarDisplay(true);



        if (id) getRole(id).then(role => {


            setRole(role!);
            setAddMode(false);
            setActiveVal(role?.active!);



        }
        )
    }, [id, getRole, setAddMode, setActiveVal, setSideBarDisplay])








    function handleFormSubmit(role: Role) {

        try {
            if (role.roleId?.length === 0 || role.roleId === undefined) {

                let newRole = {
                    ...role,
                    userId: uuid()
                }

                createRole(newRole).then(() => {
                    history.push('security');



                })
            }
            else {

                updateRole(role).then(() => {
                    history.push('security');
                })
            }

            //return Promise.resolve(true); 
        } catch (error) {
            alert(error);
        }



    }




    const reportData = [
        { text: 'Hennessey Venom', id: 'list-01' },
        { text: 'Bugatti Chiron', id: 'list-02' },
        { text: 'Bugatti Veyron Super Sport', id: 'list-03' },
        { text: 'SSC Ultimate Aero', id: 'list-04' },
        { text: 'Koenigsegg CCR', id: 'list-05' },
        { text: 'McLaren F1', id: 'list-06' },
        { text: 'Aston Martin One- 77', id: 'list-07' },
        { text: 'Jaguar XJ220', id: 'list-08' },
        { text: 'McLaren P1', id: 'list-09' },
        { text: 'Ferrari LaFerrari', id: 'list-10' },
    ];

    const formData = [
        { text: 'Hennessey Venom', id: 'list-01' },
        { text: 'Bugatti Chiron', id: 'list-02' },
        { text: 'Bugatti Veyron Super Sport', id: 'list-03' },
        { text: 'SSC Ultimate Aero', id: 'list-04' },
        { text: 'Koenigsegg CCR', id: 'list-05' },
        { text: 'McLaren F1', id: 'list-06' },

    ];

    const dashboardData = [
        { text: 'Hennessey Venom', id: 'list-01' },
        { text: 'Bugatti Chiron', id: 'list-02' },
        { text: 'Bugatti Veyron Super Sport', id: 'list-03' },
        { text: 'SSC Ultimate Aero', id: 'list-04' },
        { text: 'Koenigsegg CCR', id: 'list-05' },
        { text: 'McLaren F1', id: 'list-06' },
        { text: 'Aston Martin One- 77', id: 'list-07' },
        { text: 'Jaguar XJ220', id: 'list-08' },
        { text: 'McLaren P1', id: 'list-09' },
        { text: 'Ferrari LaFerrari', id: 'list-10' },
    ];

    function handleToggleChange(event: FormEvent<HTMLInputElement>, data: CheckboxProps) {


        setActiveVal(data.checked!);

    }

    if (loadingInitial) return <LoadingComponent content='Loading...' />

    return (


        <div className='pmpacomp'>

            <Segment clearing>

                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={{


                        roleId: role.roleId || '',
                        roleName: role.roleName || '',
                        active: role.active || true,
                        createdBy: role.createdBy || '',
                        createdDate: role.createdDate || '',
                        lastUpdatedBy: role.lastUpdatedBy || '',
                        lastUpdatedDate: role.lastUpdatedDate || '',
                        projectId: role.projectId || selectedClientProject?.projectId,
                        clientId: role.clientId || selectedClientProject?.projectId,

                        error: null

                    }}

                    onSubmit={(values, { setErrors }) =>
                        ((id?.length === 0 || id === undefined) ? createRole(values as Role) : updateRole(values as Role))
                            .catch(error =>
                                setErrors({ error: error }))}

                >
                    {/* {({ handleSubmit, isSubmitting, errors, isValid, dirty}) => ( */}

                    {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (


                        <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>

                            {addMode ? (
                                <Header as='h2' content='Add New Role' color='black' textAlign='left' />

                            ) :
                                (
                                    <Header as='h2' content='Edit Role' color='black' textAlign='left' />
                                )
                            }


                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width='8'>
                                        <MyTextInput label='Role Name' name='roleName' placeholder='Role Name' />
                                    </Grid.Column>


                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width='8'>
                                        <label style={{ fontSize: '.92857143em', fontWeight: '700' }}>Role Status
                                            <Checkbox style={{ marginLeft: '10px', top: '5px' }} toggle name='active' checked={activeVal} onChange={(e, data) => handleToggleChange(e, data)} />
                                            {/* <MyToggleInput id='status' label=' Role Status' name='status' checked={role.active}/> */}
                                            {/* <input type='checkbox' placeholder='Role Status' name='status' checked={role.active} /> */}
                                        </label>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row style={{ marginBottom: '20px' }}>
                                    <Grid.Column width='5'>

                                        <ListViewComponent id='list' dataSource={reportData} showCheckBox={true} headerTitle='Select Reports' showHeader={true} height="490px"></ListViewComponent>
                                    </Grid.Column>

                                    <Grid.Column width='5'>
                                        <ListViewComponent id='list' dataSource={formData} showCheckBox={true} headerTitle='Select Forms' showHeader={true} height="490px"></ListViewComponent>
                                        {/* <Header as='h4' content='Select Forms' />
                                    <ListBoxComponent id='listbox' dataSource={formData} selectionSettings={{mode:'Multiple'}} height="290px"></ListBoxComponent> */}
                                    </Grid.Column>

                                    <Grid.Column width='6'>
                                        <ListViewComponent id='list' dataSource={dashboardData} showCheckBox={true} headerTitle='Select Dashboards' showHeader={true} height="490px"></ListViewComponent>
                                        {/* <Header as='h4' content='Select Dashboards' />
                                    <ListBoxComponent id='listbox' dataSource={dashboardData} selectionSettings={{mode:'Multiple', showCheckbox:true, showSelectAll:true}} height="290px">
                                    <Inject services={[CheckBoxSelection]} />
                                    </ListBoxComponent> */}
                                    </Grid.Column>

                                </Grid.Row>

                            </Grid>


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
                    )
                    }

                </Formik>

            </Segment>
        </div>
    )
})