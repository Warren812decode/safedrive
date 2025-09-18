const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function api(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${res.status} ${text}`);
  }
  return res.json();
}

export async function login(name, password) {
  return api('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, password }) });
}

export async function register(name, password) {
  return api('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, password }) });
}

export async function ingestTelemetry(point) {
  return api('/api/iot/ingest', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(point) });
}

export async function getDeviceLatest(deviceId) {
  return api(`/api/iot/${deviceId}/latest`);
}

export async function listDevices() {
  return api('/api/iot');
}
