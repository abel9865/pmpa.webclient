import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function ClientProjectList() {

    const {clientProjectStore} = useStore();
    const {deleteClientProject, clientProjectsByTitle, loading} = clientProjectStore;
    const [target, setTarget] = useState('')

    function handleProjectDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        // function handleProjectDelete(e:any, id:string){
        setTarget(e.currentTarget.name);

        console.log(e.currentTarget);
        console.log(e.currentTarget.name);
        console.log(id);

        deleteClientProject(id);

    }
  

    return (
        <Segment>
            <Item.Group divided>
                {clientProjectsByTitle.map(clientProject => (
                    <Item key={clientProject.projectId}>
                        <Item.Content>
                            <Item.Header as='a'>{clientProject.projectTitle}</Item.Header>
                            <Item.Meta>
                                {clientProject.createdDate}
                            </Item.Meta>
                            <Item.Description>
                                <div>{clientProject.projectDescription}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    name={clientProject.projectId}
                                   as ={Link} to={`/clientProjects/${clientProject.projectId}`}
                                    floated='right'
                                    content='View'
                                    color='blue'>

                                </Button>
                                <Button
                                    name={clientProject.projectId}
                                    loading={loading && target === clientProject.projectId}
                                    onClick={(e) => handleProjectDelete(e, clientProject.projectId)}
                                    floated='right'
                                    content='Delete'
                                    color='red'></Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})