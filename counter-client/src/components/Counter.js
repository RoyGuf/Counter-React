import React from 'react'
import { useState, useEffect } from 'react'

// user ID indicator using random number
const userId = localStorage.getItem("userId") || Math.random();
localStorage.setItem("userId", userId)

// connect to a webSocket on port 8080
const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET);
ws.onopen = function(){
  ws.send(`Hello from ${userId}`);
};

const Counter = () => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    ws.onmessage = function(message){
      if(message.data === 'counter'){
        // send current userId and his counter value
        ws.send(`ID: ${userId}; Counter: ${count}`)
      }
    }
  }, [count]);

  const increment = () => (
    setCount(count + 1)
  )

  return (
    <div>
      <div>
        <p>Counter: {count}</p>
        <button onClick={increment}>+</button>
      </div>
    </div>
  )
}

export default Counter