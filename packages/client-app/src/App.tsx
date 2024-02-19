import React, { useEffect, useState } from 'react';
import {OrderType} from "@package/database/src";
import './App.css';

const toppings = ['ketchup', 'mayo', 'cheese', 'green', 'pepper']
const sizes = ['S', 'M', 'L']
const API_URL = 'http://localhost:4000/api/order'
const statuses = ['pending', 'in preparation', 'ready to pickup', 'complete']

enum Size {
  SMALL= "S",
  MEDIUM = "M",
  LARGE = "L",
}

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

  const [formData, setFormData] = useState<Pick<OrderType, 'size' | 'type' | 'toppings'>>({
    type: '',
    size: sizes[0] as Size,
    toppings: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // @ts-ignore
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        // @ts-ignore
        setFormData({ ...formData, [name]: [...formData[name], value] });
      } else {
        // @ts-ignore
        setFormData({ ...formData, [name]: formData[name].filter(item => item !== value) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
        console.log('Form submitted successfully');
      })
      .catch(error => {
        console.error('Error submitting form:', error);
      });
  };

  return (
    <div className="App">
      Place Your Order
      <form onSubmit={handleSubmit}>
        <input type="text" name='type' placeholder='Pizza type' value={formData.type} onChange={handleChange} />
        <select name='size' value={formData.size} onChange={handleChange}>
          {sizes.map((size) => <option key={size} value={size}>{size}</option>)}
        </select>
        {toppings.map((topping, i) => (
          <label key={i}>
            <input
              type='checkbox'
              name='toppings'
              value={topping}
              checked={formData.toppings?.includes(topping)}
              onChange={handleChange}
            />
            {topping}
          </label>
        ))}
        <button type='submit'>Submit</button>
      </form>
      <ul style={{
        margin: 'auto',
        maxWidth: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {
          data.map((item, i) => <li>{item.size}&nbsp; &nbsp;<b>{item.type}</b>  <i>{statuses[item.status]}</i></li>)
        }
      </ul>

    </div>
  );
}

export default App;
