import axios from 'axios';
import './App.css';
import { Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const apiCall = () => {
  axios.get('http://localhost:8080').then((data) => {
    console.log(data)
  })
}

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Button variant="primary" onClick={apiCall}>Make API Call</Button>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
