import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [clientProjects, setClientProjects] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/ClientProject/GetAllClientProjects').then(response=>{
    console.log(response); 
    setClientProjects(response.data);
    })
  }, [])
  return (
    <div >
      <Header as='h2' icon='braille' content='MergencePro'/>
      
        <img src={logo} className="App-logo" alt="logo" />
        <List>
        {clientProjects.map((clientProject:any)=>(
            <List.Item key={clientProject.projectId}>
              {clientProject.projectTitle}
            </List.Item>
          ))}
        </List>
        
       
      
    </div>
  );
}

export default App;
