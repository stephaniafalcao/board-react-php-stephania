import { useEffect, useState } from 'react';

type HealthResponse = {
  status: string;
  database: string;
};

type RequestState = 'loading' | 'success' | 'error';

const apiUrl = import.meta.env.VITE_API_URL ?? '/api';

export default function App() {
  const [requestState, setRequestState] = useState<RequestState>('loading');
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [message, setMessage] = useState('Checking API status...');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${apiUrl}/health`, {
          headers: {
            Accept: 'application/json',
          },
        });

        const data = (await response.json()) as HealthResponse;

        if (!response.ok || data.status !== 'ok') {
          setRequestState('error');
          setHealth(data);
          setMessage('API responded with an error.');
          return;
        }

        setRequestState('success');
        setHealth(data);
        setMessage('Everything is running correctly.');
      } catch (error) {
        setRequestState('error');
        setHealth({ status: 'error', database: 'disconnected' });
        setMessage('Could not reach the API endpoint.');
      }
    };

    checkHealth();
  }, []);

  return (
    <main className="page">
      <section className="card">
        <h1>Health Monitor</h1>
        <p className="subtitle">React + Vite calling PHP API via Docker Compose</p>

        <div className="status-grid">
          <div>
            <span className="label">API status</span>
            <strong className={requestState === 'success' ? 'ok' : requestState === 'loading' ? 'loading' : 'error'}>
              {health?.status ?? 'loading'}
            </strong>
          </div>
          <div>
            <span className="label">Database status</span>
            <strong className={health?.database === 'connected' ? 'ok' : 'error'}>
              {health?.database ?? 'loading'}
            </strong>
          </div>
        </div>

        <p className="message">{message}</p>
        <p className="endpoint">Endpoint: {apiUrl}/health</p>
      </section>
    </main>
  );
}
