import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// Initialize socket outside the component to avoid re-initialization
const socket = io("http://localhost:5000");

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Register the listener
    socket.on("notification", (data) => {
      console.log("Received notification:", data);
      setNotifications((prev) => [...prev, data.message]);
    });

    // Cleanup listener when the component unmounts
    return () => {
      socket.off("notification");
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <h1>Real-Time Alerts Dashboard</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
