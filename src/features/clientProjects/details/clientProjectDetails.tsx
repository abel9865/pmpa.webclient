import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Icon } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default observer(function ClientProjectDetails(){
  const{clientProjectStore} = useStore();
  const{selectedClientProject:clientProject, loadClientProject, loadingInitial}= clientProjectStore;
const {id} = useParams<{id:string}>();

useEffect(()=>{
  if(id) loadClientProject(id);
}, [id, loadClientProject])


if(loadingInitial || !clientProject) return <LoadingComponent/>;

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
              <Button as ={Link} to ={`/manage/${clientProject.projectId}`} basic color='blue' content='Edit'/>
              <Button as ={Link} to='/clientProjects' basic color='grey' content='Cancel'/>
          </Button.Group>
       
        </Card.Content>
      </Card>
    )
})