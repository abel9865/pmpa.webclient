import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Dropdown, DropdownProps, Segment, Table } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Gateway } from '../../app/models/gateway';
import * as Yup from 'yup';


export default observer(function PaymentGatewaySettings(){

    let gateway = {} as Gateway;

    const gatewayOptions = [
        {
            key: 'Stripe',
            text: 'Stripe',
            value: 'Stripe'
        },
        {
            key: 'PayFabric',
            text: 'PayFabric',
            value: 'PayFabric'
        },
        {
            key: 'AuthorizeNet',
            text: 'Authorize Net',
            value: 'AuthorizeNet'
        }
       
    ];

    const validationSchema = Yup.object({
        // projectTitle: Yup.string().required('The title is required'),
        // projectDescription: Yup.string().required('The description is required'),
        // projectStatus: Yup.string().required('The status is required')
       // createdDate: Yup.string().required('Date is required').nullable()
    })

function handleGatewayChange(data: DropdownProps){

}

function handleFormSubmit(values: any){

}

    return(
        <>

<Segment clearing>
          
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={gateway}
                onSubmit={values => handleFormSubmit(values)}>
                {
                    ({ handleSubmit, isValid, isSubmitting, dirty }) => (

          <Form className='ui form error' autoComplete='off'>

        <Table style={{ marginBottom: '20px', width: '100%' }} >
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <p>Select a Payment Gateway </p>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <Dropdown name='font' value= {gateway.provider} onChange={(e, data) => (handleGatewayChange(data))} placeholder='Select a gateway' fuid selection options={gatewayOptions} />
                                        </Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>
                                            <p>Account Key </p>
                                        </Table.Cell>

                                        <Table.Cell>
                                        <MyTextInput  name='acctKey' placeholder='Account Key' />
                                        </Table.Cell>

                                        <Table.Cell>
                                            <p>API Key</p>
                                        </Table.Cell>

                                        <Table.Cell>
                                        <input name='apiKey' placeholder='API Key' type='text'  />
                                        </Table.Cell>
                                    </Table.Row>

                                  
                                  


                                   
                                </Table.Body>
                            </Table>

                            <Button
                                // disabled={isSubmitting}
                                //loading={loading} 
                                floated='right' positive type='submit' content='Submit' />

</Form>
          )
        }

    </Formik>


</Segment>

        
        </>
    )
})