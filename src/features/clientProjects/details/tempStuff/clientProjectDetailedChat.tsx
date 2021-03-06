import { Formik, Form, Field, FieldProps  } from 'formik';
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import {Segment, Header, Comment, Button, Loader} from 'semantic-ui-react'
import MyTextArea from '../../../../app/common/form/MyTextArea';
import { useStore } from '../../../../app/stores/store';
import * as Yup from 'yup';
import { formatDistanceToNow } from 'date-fns'

interface Props {
    resourceId: string;
}

export default observer(function ClientProjectDetailedChat({resourceId}:Props) {
   
    const{commentStore} = useStore();

    useEffect(()=>{
        if(resourceId){
            commentStore.createHubConnection(resourceId);
        }
        return()=>{
            commentStore.clearComments();
        }
    },[commentStore, resourceId]);

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{border: 'none'}}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
                <Comment.Group>
                    {commentStore.comments.map(comment=>(
                        <Comment key={comment.id}>
                        <Comment.Avatar src={comment.image || '/assets/user.png'}/>
                        <Comment.Content>
                            <Comment.Author>{comment.displayName}</Comment.Author>
                            <Comment.Metadata>
                                <div>{formatDistanceToNow(new Date(comment.createdDate!))} ago</div>
                            </Comment.Metadata>
                            <Comment.Text>{comment.body}</Comment.Text>
                           
                        </Comment.Content>
                    </Comment>
                    ))}
                    
{/* <Formik
onSubmit={(values, {resetForm})=>
commentStore.addComment(values).then(()=>resetForm())}
initialValues={{body:''}}
>
 {({isSubmitting, handleSubmit})=>{ 
    <Form className='ui form' onSubmit={handleSubmit}>
  <MyTextArea placeholder='Add comment' name='body' rows={2} />
                        <Button
                        loading={isSubmitting}
                        //disabled={isSubmitting || !isValid}
                        //disabled={isSubmitting}
                            content='Add Reply'
                            labelPosition='left'
                            icon='edit'
                            primary
                            type='submit'
                            floated='right'
                        />

                        
    </Form>
 }} 

</Formik> */}


<Formik
                    onSubmit={(values, { resetForm }) =>
                        commentStore.addComment(values).then(() => resetForm())}
                    initialValues={{ body: '' }}
                    validationSchema={Yup.object({
                        body: Yup.string().required()
                    })}
                >
                    {({ isSubmitting, isValid, handleSubmit }) => (
                        <Form className='ui form'>
                            <Field name='body'>
                                {(props: FieldProps) => (
                                    <div style={{ position: 'relative' }}>
                                        <Loader active={isSubmitting} />
                                        <textarea
                                            placeholder='Enter your comment (Enter to submit, SHIFT + enter for new line)'
                                            rows={2}
                                            {...props.field}
                                            onKeyPress={e => {
                                                if (e.key === 'Enter' && e.shiftKey) {
                                                    return;
                                                }
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
                 
                </Comment.Group>
            </Segment>
        </>

    )
})
