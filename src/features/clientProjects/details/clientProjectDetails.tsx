import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import { ClientProject } from '../../../app/models/clientProject';

interface Props{
    clientProject:ClientProject;
    cancelSelectClientProject:()=>void;
    openForm:(id:string)=>void;
}

export default function ClientProjectDetails({clientProject, cancelSelectClientProject, openForm}:Props){
    return (
        <Card fluid>
            <Icon name='cogs'/>
       
        <Card.Content>
          <Card.Header>{clientProject.projectTitle}</Card.Header>
          <Card.Meta>
            <span >{clientProject.createdDate}</span>
          </Card.Meta>
          <Card.Description>
            {clientProject.projectDescription}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths='2'>
              <Button onClick={()=>openForm(clientProject.projectId)} basic color='blue' content='Edit'/>
              <Button onClick={cancelSelectClientProject} basic color='grey' content='Cancel'/>
          </Button.Group>
       
        </Card.Content>
      </Card>
    )
}