import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Checkbox, CheckboxProps, FormField, Header, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { ClientProject } from '../../../app/models/clientProject';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { values } from 'mobx';
import MyToggleInput from '../../../app/common/form/MyToggleInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/CategoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';



export default observer(function ClientProjectForm() {
    const history = useHistory();
    const { clientProjectStore, userStore, modalStore } = useStore();
    const { createClientProject, updateClientProject, loading, loadClientProject, loadingInitial } = clientProjectStore;
   const{user} = userStore;
    const { id } = useParams<{ id: string }>();



    const [clientProject, setClientProject] = useState<ClientProject>({
        projectId: '',
        clientId: user?.clientId,
        projectTitle: '',
        projectDescription: '',
        projectStatus: new Boolean(false),
        createdDate: new Date(moment().format()),
        //lastUpdatedDate:moment().format("DD-MM-YYYY hh:mm:ss"),
        lastUpdatedDate: moment().format(),
        createdBy: user?.userId,
        lastUpdatedBy: '',
        client: null,
        role: new Array()
    } as ClientProject);

    const validationSchema = Yup.object({
        projectTitle: Yup.string().required('The title is required'),
        projectDescription: Yup.string().required('The description is required'),
        projectStatus: Yup.string().required('The status is required')
       // createdDate: Yup.string().required('Date is required').nullable()
    })

    useEffect(() => {
        if (id) loadClientProject(id).then(clientProject => setClientProject(clientProject!))
    }, [id, loadClientProject]);

    function handleFormSubmit(clientProject: ClientProject) {

        if (clientProject.projectId.length === 0) {
            let newClientProject = {
                ...clientProject,
                projectId: uuid()
            }
            createClientProject(newClientProject as ClientProject).then(() => {
                history.push(`/clientProjects/${newClientProject.projectId}`);
                modalStore.closeModal();
            }
            )
        }
        else {
            updateClientProject(clientProject as ClientProject).then(() => {
                history.push(`/clientProjects/${clientProject.projectId}`);
                modalStore.closeModal();
            }
            )
        }
    }

    function handleToggleChange(event: FormEvent<HTMLInputElement>, data: CheckboxProps) {

        setClientProject({ ...clientProject, projectStatus: data.checked as boolean })

    }

    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.target;
    //     setClientProject({ ...clientProject, [name]: value })
    // }
    if (loadingInitial) return <LoadingComponent content='Loading...' />
    return (


        <Segment clearing>
            <Header content='Client Project Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={clientProject}
                onSubmit={values => handleFormSubmit(values)}>
                {
                    ({ handleSubmit, isValid, isSubmitting, dirty }) => (

                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInput name='projectTitle' placeholder='title' />


                            <MyTextArea rows={3} placeholder="Description" name='projectDescription' />
                            <Checkbox toggle label='Status' name='projectStatus' checked={clientProject.projectStatus === true ? true : false} onChange={(e, data) => handleToggleChange(e, data)} />
                            {/* <MySelectInput options={categoryOptions} placeholder='Category' name ='category' /> */}
                            {/* <MyToggleInput id='projectStatus' checked={clientProject.projectStatus} label='Status' name='projectStatus' />  */}
                            {/* <Header content='Other Client Project Details' sub color='teal' />

                            <MyDateInput placeholderText='Date' name='createdDate' showTimeSelect timeCaption='time' /> */}
                            {modalStore.modal.open ? (
                                <>
                                    <Button
                                        disabled={isSubmitting || !dirty || !isValid}
                                        loading={loading} floated='right' positive type='submit' content='Submit' />
                                    <Button onClick={() => (modalStore.closeModal())} floated='right' type='button' content='Cancel' />

                                </>
                            ) :
                                (<>
                                    <Button
                                        disabled={isSubmitting || !dirty || !isValid}
                                        loading={loading} floated='right' positive type='submit' content='Submit' />
                                    <Button as={Link} to='/clientProjects' floated='right' type='button' content='Cancel' />

                                </>)
                            }


                        </Form>

                    )
                }

            </Formik>


        </Segment>


    )
})