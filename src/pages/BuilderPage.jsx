import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContext } from '../context/ToastContext.jsx';
import ChatMessage from '../components/ChatMessage.jsx';
import ChatInput from '../components/ChatInput.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
import LivePreview from '../components/LivePreview.jsx';
import { getProject, updateProject } from '../services/projectService.js';
import { generateCode } from '../services/generationService.js';
import '../styles/builder.css';

const EXAMPLE_PROMPTS = [
    'A personal portfolio website with a dark theme',
    'A simple calculator app',
    'A weather dashboard with cards',
    'A landing page for a coffee shop',
    'A to-do list app',
    'A countdown timer for New Year',
];

function BuilderPage() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { showToast } = useContext(ToastContext);

    const [project, setProject] = useState(null);
    const [messages, setMessages] = useState([]);
    const [code, setCode] = useState('');
    const [activeTab, setActiveTab] = useState('preview');
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editTitle, setEditTitle] = useState('');

    useEffect(() => {
        const loadProject = async () => {
            try {
                const data = await getProject(projectId);
                setProject(data);
                setMessages(data.messages || []);
                setCode(data.generatedCode || '');
                setEditTitle(data.title || 'Untitled Project');
            } catch (err) {
                showToast('Project not found.', 'error');
                navigate('/dashboard');
            } finally {
                setPageLoading(false);
            }
        };
        loadProject();
    }, [projectId]);

    const handleSend = async (prompt) => {
        if (loading) return;

        const userMessage = { role: 'user', content: prompt, timestamp: new Date() };
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const result = await generateCode(projectId, prompt);

            setMessages((prev) => [...prev, result.message]);

            if (result.generatedCode) {
                setCode(result.generatedCode);
                setActiveTab('preview');
            }

            if (project.title === 'Untitled Project') {
                const newTitle = prompt.length > 50 ? prompt.substring(0, 50) + '...' : prompt;
                setProject((prev) => ({ ...prev, title: newTitle }));
                setEditTitle(newTitle);
            }
        } catch (err) {
            const message = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Generation failed. Please try again.';
            showToast(message, 'error');
            setMessages((prev) => prev.slice(0, -1));
        } finally {
            setLoading(false);
        }
    };

    const handleTitleSave = async () => {
        setIsEditingTitle(false);
        if (editTitle.trim() && editTitle !== project.title) {
            try {
                await updateProject(projectId, { title: editTitle.trim() });
                setProject((prev) => ({ ...prev, title: editTitle.trim() }));
            } catch (error) {
                showToast('Failed to rename project.', 'error');
            }
        }
    };

    const handleDownload = () => {
        if (!code) return;
        const blob = new Blob([code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${project && project.title ? project.title : 'my-app'}.html`;
        link.click();
        URL.revokeObjectURL(url);
        showToast('Code downloaded!', 'success');
    };

    if (pageLoading) {
        return (
            <div className="loading-state" style={{ flex: 1 }}>
                <div className="spinner" />
                <p>Loading project...</p>
            </div>
        );
    }

    return (
        <div className="builder">
            <div className="builder-chat">
                <div className="builder-chat-header">
                    {isEditingTitle ? (
                        <input
                            className="builder-title-input"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onBlur={handleTitleSave}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleTitleSave(); }}
                            autoFocus
                        />
                    ) : (
                        <h2
                            className="builder-chat-title"
                            onClick={() => setIsEditingTitle(true)}
                            title="Click to rename"
                        >
                            {project && project.title ? project.title : 'Untitled Project'}
                        </h2>
                    )}
                </div>

                <div className="builder-messages">
                    {messages.length === 0 ? (
                        <div className="builder-empty-chat">
                            <p className="builder-empty-icon">&#9830;</p>
                            <p className="builder-empty-title">What would you like to build?</p>
                            <p className="builder-empty-subtitle">Describe your idea and AI will generate the code.</p>
                            <div className="builder-examples">
                                {EXAMPLE_PROMPTS.map((prompt, index) => (
                                    <button
                                        key={index}
                                        className="builder-example-chip"
                                        onClick={() => handleSend(prompt)}
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="builder-messages-list">
                            {messages.map((msg, index) => (
                                <ChatMessage key={index} message={msg} />
                            ))}
                            {loading && (
                                <div className="builder-typing">
                                    <span className="builder-typing-dot">.</span>
                                    <span className="builder-typing-dot">.</span>
                                    <span className="builder-typing-dot">.</span>
                                    <span className="builder-typing-text">AI is generating your code</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <ChatInput onSend={handleSend} loading={loading} disabled={false} />
            </div>

            <div className="builder-preview">
                <div className="builder-tabs">
                    <div className="builder-tabs-left">
                        <button
                            className={`builder-tab ${activeTab === 'preview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('preview')}
                        >
                            Preview
                        </button>
                        <button
                            className={`builder-tab ${activeTab === 'code' ? 'active' : ''}`}
                            onClick={() => setActiveTab('code')}
                        >
                            Code
                        </button>
                    </div>
                    <div className="builder-tabs-right">
                        {code && (
                            <button className="builder-action-btn" onClick={handleDownload}>Download</button>
                        )}
                    </div>
                </div>

                <div className="builder-content">
                    {activeTab === 'preview' ? (
                        <LivePreview code={code} />
                    ) : (
                        <CodeEditor code={code} onChange={setCode} readOnly={false} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default BuilderPage;