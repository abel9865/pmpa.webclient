import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default function ClientProjectDetails(){
  const{clientProjectStore} = useStore();
  const{selectedClientProject:clientProject, openForm, cancelSelectedClientProject}= clientProjectStore;


if(!clientProject) return <LoadingComponent/>;

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
              <Button onClick={cancelSelectedClientProject} basic color='grey' content='Cancel'/>
          </Button.Group>
       
        </Card.Content>
      </Card>
    )
}