import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, CheckboxProps, Form, Segment } from 'semantic-ui-react';
import { ClientProject } from '../../../app/models/clientProject';
import { useStore } from '../../../app/stores/store';





export default observer(function ClientProjectForm(){
   
const{clientProjectStore}  = useStore();
const{selectedClientProject, closeForm, createClientProject, updateClientProject, loading} = clientProjectStore;

    const initialState = selectedClientProject?? {
        projectId:'',
        clientId: 'ea8ff81c-a42c-4f7a-8cc3-a842c8f1a10e',
        projectTitle:'',
        projectDescription:'',
        projectStatus: new Boolean(false) ,
        createdDate: moment().format(),
        //lastUpdatedDate:moment().format("DD-MM-YYYY hh:mm:ss"),
        lastUpdatedDate:moment().format(),
        createdBy: '0320d8c5-0cbe-4d0b-b0bb-22dd9d774051',
        lastUpdatedBy:'0320d8c5-0cbe-4d0b-b0bb-22dd9d774051',
        client:null,
         role:[]
    }

    const[clientProject, setClientProject] = useState(initialState)
   
function handleSubmit(){
    
  clientProject.projectId? updateClientProject(clientProject as ClientProject):createClientProject(clientProject as ClientProject)
}

function handleToggleChange(event:FormEvent<HTMLInputElement>, data:CheckboxProps){
//const{name, checked} = data;

    setClientProject({...clientProject, projectStatus: data.checked as boolean})
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

function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
const {name, value} = event.target;
setClientProject({...clientProject, [name]: value})
}

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" value={clientProject.projectTitle} name='projectTitle' onChange={handleInputChange}/>
                <Form.TextArea placeholder="Description" name='projectDescription' value={clientProject.projectDescription} onChange={handleInputChange}/>
                <Form.Checkbox toggle  label='Status' name='projectStatus' checked={clientProject.projectStatus===true?true: false} onChange={(e, data)=>handleToggleChange(e, data)} />
               <Button loading={loading} floated='right' positive type='submit' content='Submit' />
               <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
               
            </Form>
        </Segment>
    )
})