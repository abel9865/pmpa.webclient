import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, CheckboxProps, Form, Segment } from 'semantic-ui-react';
import { ClientProject } from '../../../app/models/clientProject';



interface Props{
    clientProject: ClientProject|undefined;
 closeForm : ()=>void; 
 createOrEdit:(clientProject:ClientProject)=>void;
}

export default function ClientProjectForm({clientProject: selectedClientProject, closeForm, createOrEdit}:Props){
   
console.log('here is the obj passed');
console.log(selectedClientProject);

    const initialState = selectedClientProject?? {
        projectId:'',
        clientId: '',
        projectTitle:'',
        projectDescription:'',
        projectStatus: new Boolean(false) ,
        createdDate: '',
        lastUpdatedDate:'',
        createdBy: '',
        lastUpdatedBy:'',
        client:undefined,
        role:undefined
    }

    const[clientProject, setClientProject] = useState(initialState)
   
function handleSubmit(){
    createOrEdit(clientProject as ClientProject);
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
               <Button floated='right' positive type='submit' content='Submit' />
               <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
               
            </Form>
        </Segment>
    )
}