import { useState } from 'react';
import axios from 'axios';

function Summarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/openai/summarize', { 
        userInput: text 
      });
      setSummary(response.data.result);
      setText('');
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {summary && (
          <div className="space-y-4">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                {text}
              </div>
            </div>
            
            {/* AI response */}
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                {isLoading ? (
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                  </div>
                ) : (
                  summary
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-200">
        <div className="relative flex items-center">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask for a summary..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !text.trim()}
            className="absolute right-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Summarizer may produce inaccurate information about people, places, or facts.
        </p>
      </div>
    </div>
  );
}

export default Summarizer;