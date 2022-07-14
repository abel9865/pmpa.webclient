import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Label } from 'semantic-ui-react';
import modalStore from '../../app/stores/modalStore';
import { useStore } from '../../app/stores/store';

interface Props{
    id:string;
    
}

export default observer(function DeleteWorkFlow({id}:Props){
    const { modalStore, workFlowStore } = useStore();
   
    return (
        <Formik
            initialValues={{ error: null }}
            onSubmit={(values, { setErrors }) => workFlowStore.deleteWorkFlow(id).catch(error =>
                setErrors({ error: 'An error occured. Failed to delete workflow' }))}
        >
            {({ handleSubmit, isSubmitting, errors }) => (

                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                   <p>Are you sure that you want to delete this workflow?</p>
                    <ErrorMessage
                        name='error' render={() =>
                            <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />}
                    />
                    <div className='modalButtons'>
                     <Button onClick={()=>(modalStore.closeModal())} floated='right' type='button' content='No' />
                    <Button loading={isSubmitting} color='blue' content='Yes' type='submit' floated='right'  />
                    </div>
                </Form>
            )}

        </Formik>
    )
})