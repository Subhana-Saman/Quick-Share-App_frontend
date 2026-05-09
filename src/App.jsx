import { useState, useEffect } from 'react';
import axios from 'axios';

// Vite projects mein variable access karne ka sahi tarika
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setText(res.data.text);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/save`, { text });
      setMessage("⚡Saved Successfully ");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("❌ FAILED");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Glowing Accent Ring */}
        <div style={styles.iconCircle}>
          <span style={{fontSize: '24px'}}>💎</span>
        </div>
        
        <h1 style={styles.title}>Quick<span style={{color: '#ff007f'}}>Share</span></h1>
        <p style={styles.subtitle}>Jis device par ye page khulega, wahan ye text mil jayega.</p>
        
        <textarea
          style={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter secret text..."
        />
        
        <button
          onClick={handleSave}
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonPressed : {})
          }}
        >
          {loading ? "SYNCING..." : "SAVE / SYNC"}
        </button>

        <div style={styles.statusArea}>
          {message && <span style={styles.msg}>{message}</span>}
          {!message && <span style={styles.footer}>Session: 30 Mins Active</span>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh', 
    backgroundColor: '#1a1a2e', // Deep Space Blue
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    margin: 0
  },
  card: { 
    backgroundColor: '#1a1a2e', 
    padding: '40px', 
    borderRadius: '50px', 
    boxShadow: '20px 20px 60px #0d0d17, -20px -20px 60px #272745', 
    width: '90%', 
    maxWidth: '400px', 
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  iconCircle: {
    width: '70px',
    height: '70px',
    backgroundColor: '#1a1a2e',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 25px',
    boxShadow: 'inset 6px 6px 12px #0d0d17, inset -6px -6px 12px #272745',
    border: '2px solid #00d4ff' // Neon Blue Border
  },
  title: { 
    color: '#ffffff', 
    fontSize: '26px', 
    fontWeight: '900', 
    margin: '0 0 5px 0',
    letterSpacing: '2px',
  },
  subtitle: { 
    color: '#7676a7', 
    fontSize: '13px', 
    marginBottom: '30px',
    lineHeight: '1.4'
  },
  textarea: { 
    width: '100%', 
    height: '180px', 
    padding: '20px', 
    borderRadius: '25px', 
    border: 'none', 
    fontSize: '16px', 
    outline: 'none', 
    boxSizing: 'border-box',
    backgroundColor: '#16213e',
    color: '#00d4ff', // Electric Blue Text
    boxShadow: 'inset 8px 8px 16px #0b1120, inset -8px -8px 16px #21315c',
    resize: 'none'
  },
  button: { 
    width: '100%', 
    marginTop: '30px', 
    padding: '16px', 
    backgroundColor: '#1a1a2e', 
    color: '#ff007f', // Neon Pink Text
    border: 'none', 
    borderRadius: '20px', 
    cursor: 'pointer', 
    fontSize: '14px', 
    fontWeight: '800',
    letterSpacing: '2px',
    boxShadow: '6px 6px 15px #0d0d17, -6px -6px 15px #272745',
    transition: 'all 0.2s ease',
    textShadow: '0 0 10px rgba(255,0,127,0.3)'
  },
  buttonPressed: {
    boxShadow: 'inset 4px 4px 8px #0d0d17, inset -4px -4px 8px #272745',
    opacity: 0.7
  },
  statusArea: {
    marginTop: '25px',
    height: '24px'
  },
  msg: { 
    color: '#00ff41', // Matrix Green
    fontWeight: '700', 
    fontSize: '14px',
    textShadow: '0 0 8px rgba(0,255,65,0.4)'
  },
  footer: { 
    fontSize: '11px', 
    color: '#535377',
    fontWeight: '600',
    textTransform: 'uppercase'
  }
};

export default App;
