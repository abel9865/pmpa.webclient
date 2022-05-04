import { useField } from 'formik';
import React from 'react'
import { Checkbox, Form, Label } from 'semantic-ui-react';

interface Props{
    id: string;
    label: string;
    name: string;
    checked:boolean;
   
}

export default function MyToggleInput(props:Props){
    const[field, meta, helpers] = useField(props.name);


    return(

<Checkbox toggle

{...field} {...props}
value={field.value || null}
onChange={(e, d)=> helpers.setValue(d.value)}
onBlur={()=>helpers.setTouched(true)}
/>

    )
}