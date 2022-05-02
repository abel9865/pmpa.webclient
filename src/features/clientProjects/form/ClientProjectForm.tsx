import { observer } from 'mobx-react-lite';
import moment from 'moment';
import  { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, CheckboxProps, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { ClientProject } from '../../../app/models/clientProject';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';





export default observer(function ClientProjectForm() {
    const history = useHistory();
    const { clientProjectStore } = useStore();
    const {  createClientProject, updateClientProject, loading, loadClientProject, loadingInitial } = clientProjectStore;
    const { id } = useParams<{ id: string }>();



    const [clientProject , setClientProject] = useState({
        projectId: '',
        clientId: 'ea8ff81c-a42c-4f7a-8cc3-a842c8f1a10e',
        projectTitle: '',
        projectDescription: '',
        projectStatus: new Boolean(false),
        createdDate: moment().format(),
        //lastUpdatedDate:moment().format("DD-MM-YYYY hh:mm:ss"),
        lastUpdatedDate: moment().format(),
        createdBy: '0320d8c5-0cbe-4d0b-b0bb-22dd9d774051',
        lastUpdatedBy: '0320d8c5-0cbe-4d0b-b0bb-22dd9d774051',
        client:null,
          role:new Array()
    } as ClientProject);

    useEffect(() => {
        if (id) loadClientProject(id).then(clientProject => setClientProject(clientProject!))
    }, [id, loadClientProject]);


    // const initialState = selectedClientProject?? {
    //         projectId:'',
    //         clientId: 'ea8ff81c-a42c-4f7a-8cc3-a842c8f1a10e',
    //         projectTitle:'',
    //         projectDescription:'',
    //         projectStatus: new Boolean(false) ,
    //         createdDate: moment().format(),
    //         //lastUpdatedDate:moment().format("DD-MM-YYYY hh:mm:ss"),
    //         lastUpdatedDate:moment().format(),
    //         createdBy: '0320d8c5-0cbe-4d0b-b0bb-22dd9d774051',
    //         lastUpdatedBy:'0320d8c5-0cbe-4d0b-b0bb-22dd9d774051',
    //         client:null,
    //          role:[]
    //     }



    function handleSubmit() {

console.log(clientProject);
console.log(clientProject.projectId.length);

        if (clientProject.projectId.length === 0) {
            let newClientProject = {
                ...clientProject,
                projectId: uuid()
            }
            createClientProject(newClientProject as ClientProject).then(() =>history.push(`/clientProjects/${newClientProject.projectId}`))
        }
        else{
            updateClientProject(clientProject as ClientProject).then(()=>history.push(`/clientProjects/${clientProject.projectId}`))
        }
    }

    function handleToggleChange(event: FormEvent<HTMLInputElement>, data: CheckboxProps) {
        //const{name, checked} = data;

        setClientProject({ ...clientProject, projectStatus: data.checked as boolean })
        //  clientProject.projectStatus = checked as boolean;
        //     let isChecked: number = 0
        //     if(checked){
        // isChecked = 1;
        //     }

        //clientProject.projectStatus as boolean == data.checked;
        //setClientProject(clientProject);


        console.log(event);
        console.log(data);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setClientProject({ ...clientProject, [name]: value })
    }
    if (loadingInitial) return <LoadingComponent content='Loading...' />
    return (

       
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" value={clientProject.projectTitle} name='projectTitle' onChange={handleInputChange} />
                <Form.TextArea placeholder="Description" name='projectDescription' value={clientProject.projectDescription} onChange={handleInputChange} />
                <Form.Checkbox toggle label='Status' name='projectStatus' checked={clientProject.projectStatus === true ? true : false} onChange={(e, data) => handleToggleChange(e, data)} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/clientProjects' floated='right' type='button' content='Cancel' />

            </Form>
        </Segment>

       
    )
})