import { useState } from 'react';

function ChatInput({ onSend, loading, disabled }) {
    const [input, setInput] = useState('');

    const handleSubmit = () => {
        if (!input.trim() || loading || disabled) return;
        onSend(input.trim());
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="chat-input-container">
            <textarea
                className="chat-input-textarea"
                placeholder="Describe what you want to build..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading || disabled}
                rows={1}
            />
            <button
                className="chat-send-btn"
                onClick={handleSubmit}
                disabled={!input.trim() || loading || disabled}
            >
                {loading ? 'Generating...' : 'Generate'}
            </button>
        </div>
    );
}

export default ChatInput;