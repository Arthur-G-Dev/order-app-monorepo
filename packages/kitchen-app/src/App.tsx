import React, { useEffect, useState } from 'react';
import {OrderType} from "@package/database/src";
import './App.css';

const API_URL = 'http://localhost:4000/api/order'
const statuses = ['pending', 'in preparation', 'ready to pickup', 'complete']

function App() {
  const [data, setData] = useState<OrderType[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/list`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    void fetchData()

    setInterval(fetchData, 3000);
  }, [])


  const handleStatusUpdate = async  (id: number) => {
   await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id})
    })
  }


  return (
    <div className="App">
      Handle order statuses

      <ul style={{
        margin: 'auto',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {
          data.map((item, i) => <li>{item.size}&nbsp; &nbsp;<b>{item.type}</b>  <i>{statuses[item.status]}</i> <button disabled={item.status === 3} onClick={() => handleStatusUpdate(item.id)}>Update Status</button></li>)
        }
      </ul>

    </div>
  );
}

export default App;
