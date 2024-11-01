import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { fetchHistoricalData, fetchModelResults, fetchMetrics, fetchEvents } from '../apiService';

function Dashboard() {
  const [historicalData, setHistoricalData] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const histData = await fetchHistoricalData();
      const metricData = await fetchMetrics();
      const eventList = await fetchEvents();
      setHistoricalData(histData);
      setMetrics(metricData);
      setEvents(eventList);
    };
    loadData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Brent Oil Price Dashboard</h1>
      <div className="metrics">
        <h2>Model Metrics</h2>
        <p>RMSE: {metrics.RMSE}</p>
        <p>MAE: {metrics.MAE}</p>
        <p>Accuracy: {metrics.Accuracy}</p>
      </div>
      <div className="chart">
        <h2>Historical Brent Oil Prices</h2>
        <LineChart width={600} height={300} data={historicalData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </div>
      <div className="events">
        <h2>Significant Events</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index}>{event.date}: {event.event}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
