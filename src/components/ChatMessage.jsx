function ChatMessage({ message }) {
    const isUser = message.role === 'user';

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const minutesStr = minutes < 10 ? '0' + minutes : '' + minutes;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutesStr} ${ampm}`;
    };

    return (
        <div className={`chat-message ${isUser ? 'chat-message-user' : 'chat-message-ai'}`}>
            <div className={`chat-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
                <p className="chat-bubble-text">{message.content}</p>
            </div>
            <span className="chat-timestamp">{formatTime(message.timestamp)}</span>
        </div>
    );
}

export default ChatMessage;