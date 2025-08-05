import { useState } from 'react';
import axios from 'axios';

function Summarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/openai/summarize', { userInput:text });
      setSummary(response.data.summary);
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <div>
      <textarea
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={handleSummarize}>Summarize</button>
      <h3>Summary:</h3>
      <p>{summary}</p>
    </div>
  );
}

export default Summarizer;
