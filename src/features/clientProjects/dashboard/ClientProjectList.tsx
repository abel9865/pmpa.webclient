import React from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { ClientProject } from '../../../app/models/clientProject';

interface Props{
    clientProjects: ClientProject[];
    selectClientProject:(id:string)=>void;
    deleteClientProject:(id:string)=>void;
}

export default function ClientProjectList({clientProjects, selectClientProject, deleteClientProject}: Props){
    return(
<Segment>
    <Item.Group divided>
{clientProjects.map(clientProject=>(
    <Item key={clientProject.projectId}>
        <Item.Content>
            <Item.Header as ='a'>{clientProject.projectTitle}</Item.Header>
            <Item.Meta>
                {clientProject.createdDate}
            </Item.Meta>
            <Item.Description>
                <div>{clientProject.projectDescription}</div>
            </Item.Description>
            <Item.Extra>
                <Button onClick={()=>selectClientProject(clientProject.projectId)} floated='right' content='View' color='blue'></Button>
                <Button onClick={()=>deleteClientProject(clientProject.projectId)} floated='right' content='Delete' color='red'></Button>
            </Item.Extra>
        </Item.Content>
    </Item>
))}
    </Item.Group>
</Segment>
    )
}