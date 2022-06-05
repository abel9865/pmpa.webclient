
import React, { useEffect, useState } from 'react';
import { Button, Grid, Header, Image } from 'semantic-ui-react';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropZone from './PhotoWidgetDropZone';
import { observer } from 'mobx-react-lite';

interface Props{
    loading:boolean;
    uploadPhoto:(file:Blob) =>void;
}

export default observer(function PhotoUploadWidget({loading, uploadPhoto}:Props){

    const[files, setFiles] = useState<any>([]);

const[cropper, setCropper] = useState<Cropper>()


function onCrop(){
    if(cropper){
        cropper.getCroppedCanvas().toBlob(blob=>uploadPhoto(blob!));
    }
}

useEffect(()=>{
    return()=>{
        files.forEach((file:any)=> URL.revokeObjectURL(file.preview))
    }
}, [files])
    return(

        <Grid>
            <Grid.Column width={4}>
<Header as ='h4' color='teal' content='Step 1 - Add Photo'/>
<PhotoWidgetDropZone setFiles={setFiles}/>
            </Grid.Column>
<Grid.Column width={1} />
            <Grid.Column width={4}>
<Header as='h4' color='teal' content='Step 2 - Resize image'/>
{files && files.length>0 &&(
   <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
)}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
<Header as ='h4' color='teal' content='Step 3 - Preview & Upload'/>
        
        {files && files.length>0 &&
        <>


        
           <div className='img-preview' style={{minHeight:200, overflow:'hidden'}} />
           
           <Button.Group widths={2}>
           <Button
                  positive
                  icon='check'
                  loading={loading}
                  onClick={onCrop}
                 // onClick={() => uploadPhoto(image!)}
                />
                <Button
                disabled={loading}
                  icon='close'
                 // disabled={loading}
                  onClick={() => setFiles([])}
                />
          </Button.Group>
           
          </>
        
    }

            </Grid.Column>

        </Grid>
    )
})