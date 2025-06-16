export default function Home() {
  return (
    <div style={{
      fontFamily: 'monospace',
      padding: '20px',
      backgroundColor: '#000',
      color: '#00ff00',
      minHeight: '100vh'
    }}>
      <h1>🔍 LeaksDB API</h1>
      <p>Endpoint: <code>/api/leaksdb?query=your_query</code></p>
      
      <h3>Examples:</h3>
      <ul>
        <li><code>/api/leaksdb?query=john@gmail.com</code></li>
        <li><code>/api/leaksdb?query=081234567890</code></li>
        <li><code>/api/leaksdb?query=John%20Doe</code></li>
      </ul>
      
      <h3>Response:</h3>
      <pre>{`{
  "status": true/false,
  "message": "...",
  "query": "...",
  "results": {...}
}`}</pre>
    </div>
  );
}
