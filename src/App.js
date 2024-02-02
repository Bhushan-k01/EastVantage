import logo from './logo.svg';
import './App.css';
import axios from "axios"
import { useState, useEffect, useCallback } from "react"

function App() {
  const [response, setResponse] = useState({});
  const fetchData = async () => {
    const { data: { results } } = await axios.get("https://randomuser.me/api/");
    setResponse((data) => data = { ...data, ...results[0] });
    localStorage.setItem("user", results[0]);
  }
  const refreshHandler = () => {
    fetchData()
  }
  useEffect(() => {
    fetchData()
    return () => {
      setResponse({})
      localStorage.clear()
    }
  }, [])
  return (
    <div className="App">
      <h1>
        Users Details
        </h1>
        <table>
          <tr>
            <th>Name</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <button className='refresh-btn' onClick={refreshHandler}>Refresh</button>
          </tr>
          <tr>
            <td>{response?.name?.title}</td>
            <td>{response?.name?.first}</td>
            <td>{response?.name?.last}</td>
            <td>{response?.email}</td>
          </tr>
        </table>
    </div>
  );
}

export default App;
