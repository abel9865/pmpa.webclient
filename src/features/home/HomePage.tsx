import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../login/LoginForm';

export default observer(function HomePage(){
const {userStore, modalStore} = useStore();


    return(
      <Segment inverted textAlign='center' vertical className='masthead'>

          <Container text>
              <Header as ='h1' inverted>
                  <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom:12}} />
              MergencePro
              </Header>
              {userStore.isLoggedIn ?(
                  <>
                  <Header as ='h2' inverted content='Manage and automate your processes' />
                  <Button as={Link} to ='/clientProjects' size='huge' inverted  style={{marginTop:'20px'}}>
Take me to my solutions!
    </Button>
                  </>
              ): (
                <>
                
               


                             <Button onClick={() => (modalStore.openModal(<LoginForm />, "mini"))} size='huge' inverted>
                            Login!
                        </Button>
                        <Button  onClick={() => (modalStore.openModal(<h1>Forgot Password</h1>, "large"))} size='huge' inverted>
                                Forgot Password
                            </Button> 
                            </>
                    
              )}
             

             
          </Container>
          </Segment>
    )
})