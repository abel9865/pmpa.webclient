import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Grid, Header, Icon, Item, Reveal, Segment } from 'semantic-ui-react'
import PhotoUploadWidget from '../../../app/common/imageUpload/PhotoUploadWidget';
import { useStore } from '../../../app/stores/store';

interface Props{
    firstName:string;
    lastName: string;
    photoUrl:string;
}

export default observer(function UserHeader({firstName, lastName, photoUrl}:Props){

    const {modalStore} = useStore();
const{profileStore:{uploadPhoto, uploading}} = useStore();

function handlePhotoUpload(file:Blob){
uploadPhoto(file);
}
    return(
    <Segment>
<Grid>
  <Grid.Column width={14}>
      <Item.Group>
          {/* <Grid.Row> */}
          <Item>

              <Item.Image avatar size='tiny' src={photoUrl}  />
            
              <Item.Content  verticalAlign='middle'> 
                  <Header as='h2' content={firstName + ' ' + lastName} />
              </Item.Content>
            
          </Item>
          {/* </Grid.Row> */}

          {/* <Grid.Row> */}
          <span style={{verticalAlign:'bottom'}}>  <Icon name='upload' onClick={() => (modalStore.openModal(<PhotoUploadWidget  uploadPhoto={handlePhotoUpload} loading={uploading}/>, "large"))} /></span>
          {/* </Grid.Row> */}
      </Item.Group>
      </Grid.Column>  

      <Grid.Column width={2}>
<Reveal animated='move'>
    <Reveal.Content visible style={{width:'100%'}}> 
<Button fluid color='teal' content = 'Active'></Button>
    </Reveal.Content>

    <Reveal.Content hidden style={{width:'100%'}}> 
<Button fluid basic color={true?'red':'green'} content = {true? 'Inactive': 'Active'}></Button>
    </Reveal.Content>
</Reveal>

      </Grid.Column>
</Grid>
    </Segment>
    )

})