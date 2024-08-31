import axios from 'axios';
import './App.css';
import { Outlet } from 'react-router-dom';

const apiCall = () => {
  axios.get('http://localhost:8080').then((data) => {
    console.log(data)
  })
}

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={apiCall}>Make API Call</button>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
