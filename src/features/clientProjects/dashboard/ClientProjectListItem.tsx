import { format } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Segment } from 'semantic-ui-react'
import { ClientProject } from '../../../app/models/clientProject'

interface Props {
    clientProject: ClientProject
}


export default function ClientProjectListItem({ clientProject }: Props) {

    return (

        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/clientProjects/${clientProject.projectId}`}>
                                {clientProject.projectTitle}
                            </Item.Header>
                            <Item.Description>{clientProject.projectDescription}</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>

            <Segment>
                <span>
                    <Icon name='clock' />{format(clientProject.createdDate!, 'MMM dd yyyy h:mm aa')}
                    <Icon name='marker' />{clientProject.projectStatus ? 'Active' : 'Inactive'}
                </span>
            </Segment>
            <Segment secondary>
                Last Activity Date
            </Segment>
            <Segment clearing>
                <span>{clientProject.projectDescription}</span>
                <Button as={Link} to={`/clientProjects/${clientProject.projectId}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}