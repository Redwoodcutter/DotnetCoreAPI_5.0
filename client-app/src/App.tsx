import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';



function App() {
  const [dashboard, setDashboard] = useState ([]);

  useEffect(() => {
    axios.get ('http://localhost:5000/api/dashboard').then(response => {
      console.log(response);
      setDashboard(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='BestDb'/>
        <List>
          {dashboard.map((dashboard: any) => (
            <List.Item key={dashboard.id}>
              {dashboard.title}
            </List.Item>
          ) )}
        </List>
    </div>
  );
}

export default App;
