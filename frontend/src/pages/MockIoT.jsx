import React, { useState } from 'react';
import { ingestTelemetry, getDeviceLatest, listDevices } from '../lib/api';

export default function MockIoT() {
  const [deviceId, setDeviceId] = useState('dev_1');
  const [points, setPoints] = useState([]);
  const [devices, setDevices] = useState([]);
  const [status, setStatus] = useState('');

  async function sendMock() {
    setStatus('sending');
    try {
      const p = { deviceId, speed: Math.random()*80, lat: -1.286389, lng: 36.817223 };
      await ingestTelemetry(p);
      setStatus('sent');
    } catch (e) {
      setStatus('error: ' + e.message);
    }
  }
  async function fetchLatest() {
    try {
      const res = await getDeviceLatest(deviceId);
      setPoints(res.latest || []);
    } catch(e) {
      setStatus('error: ' + e.message);
    }
  }
  async function fetchDevices() {
    try {
      const res = await listDevices();
      setDevices(res.devices || []);
    } catch(e) {
      setStatus('error: ' + e.message);
    }
  }
  return (
    <div style={{ padding: 20 }}>
      <h2>Mock IoT Console</h2>
      <div>
        <label>Device ID: <input value={deviceId} onChange={e=>setDeviceId(e.target.value)} /></label>
        <button onClick={sendMock}>Send mock point</button>
        <button onClick={fetchLatest}>Fetch latest</button>
        <button onClick={fetchDevices}>List devices</button>
      </div>
      <div>Status: {status}</div>
      <div style={{ marginTop: 10 }}>
        <h3>Devices</h3>
        <pre>{JSON.stringify(devices, null, 2)}</pre>
        <h3>Latest Points</h3>
        <pre>{JSON.stringify(points, null, 2)}</pre>
      </div>
    </div>
  );
}
