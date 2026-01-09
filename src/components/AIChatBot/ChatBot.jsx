import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    IconButton,
    Avatar,
    CircularProgress,
    useTheme,
    alpha
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { useFetchHook } from '../../API/useFetchHook';
import { API } from '../../API/APIRoute';

const ChatBot = () => {
    const theme = useTheme();
    const [messages, setMessages] = useState([]); // Start empty for the "Hero" view
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const { fetchData } = useFetchHook();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const result = await fetchData({
                API_URL: API.AI_CHAT,
                METHOD_TYPE: "POST",
                PAYLOAD: { message: userMessage.text }
            });

            // Assuming result contains 'response' or 'message' from the AI
            const botResponseText = result?.response || result?.message || "I'm sorry, I couldn't process that.";

            const botMessage = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat Error:", error);
            const errorMessage = { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting to the server.", sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const showHero = messages.length === 0;

    return (
        <Box sx={{
            height: 'calc(100vh - 100px)',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '1000px', // Constrain width for readability like ChatGPT
            mx: 'auto',
            position: 'relative',
            // overflow: 'scroll',
            WebkitOverflowScrolling: 'touch',
        }}>

            {/* Chat Area */}
            <Box sx={{
                flexGrow: 1,
                overflowY: 'auto',
                p: { xs: 2, md: 4 },
                display: 'flex',
                flexDirection: 'column',
                scrollbarColor: "transparent transparent",
                gap: 3,
                pb: 12 // Space for absolute input
            }}>
                {showHero ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        mt: -10 // Optical centering
                    }}>
                        <Avatar sx={{
                            width: 64,
                            height: 64,
                            bgcolor: theme.palette.mode === 'light' ? 'black' : 'white',
                            color: theme.palette.mode === 'light' ? 'white' : 'black',
                            mb: 2
                        }}>
                            <SmartToyIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h4" fontWeight="700" textAlign="center">
                            What can I help with?
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {messages.map((msg) => (
                            <Box
                                key={msg.id}
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    width: '100%'
                                }}
                            >
                                <Avatar sx={{
                                    width: 36,
                                    height: 36,
                                    bgcolor: msg.sender === 'bot' ? (theme.palette.mode === 'light' ? 'black' : 'white') : 'transparent',
                                    color: msg.sender === 'bot' ? (theme.palette.mode === 'light' ? 'white' : 'black') : 'text.primary',
                                    boxShadow: msg.sender === 'bot' ? 1 : 0
                                }}>
                                    {msg.sender === 'bot' ? <SmartToyIcon fontSize="small" /> : <PersonIcon />}
                                </Avatar>

                                <Box sx={{ flexGrow: 1, pt: 0.5 }}>
                                    <Typography
                                        variant="subtitle2"
                                        fontWeight="700"
                                        sx={{ mb: 0.5, display: msg.sender === 'user' ? 'none' : 'block' }}
                                    >
                                        Task AI
                                    </Typography>
                                    <Typography variant="body1" sx={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                                        {msg.text}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                        {isTyping && (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Avatar sx={{
                                    width: 36,
                                    height: 36,
                                    bgcolor: theme.palette.mode === 'light' ? 'black' : 'white',
                                    color: theme.palette.mode === 'light' ? 'white' : 'black'
                                }}>
                                    <SmartToyIcon fontSize="small" />
                                </Avatar>
                                <CircularProgress size={20} sx={{ mt: 1 }} />
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </Box>

            {/* Floating Input Area */}
            <Box sx={{
                position: 'absolute',
                bottom: 20,
                left: 0,
                right: 0,
                px: 2,
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Paper sx={{
                    p: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '800px',
                    borderRadius: 8, // Pill shape
                    bgcolor: theme.palette.mode === 'light' ? '#f4f4f4' : alpha('#424242', 0.6),
                    boxShadow: theme.shadows[4],
                    border: theme.palette.mode === 'dark' ? '1px solid #555' : 'none'
                }}>
                    <TextField
                        fullWidth
                        placeholder="Message Task AI..."
                        variant="standard"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        InputProps={{
                            disableUnderline: true,
                            sx: {
                                fontSize: '1rem',
                            }
                        }}
                    />
                    <IconButton
                        onClick={handleSend}
                        disabled={!input.trim()}
                        sx={{
                            ml: 1,
                            bgcolor: input.trim() ? (theme.palette.mode === 'light' ? 'black' : 'white') : 'action.disabledBackground',
                            color: input.trim() ? (theme.palette.mode === 'light' ? 'white' : 'black') : 'action.disabled',
                            width: 36,
                            height: 36,
                            transition: 'all 0.2s',
                            '&:hover': {
                                transform: 'scale(1.05)'
                            }
                        }}
                    >
                        <SendIcon fontSize="small" />
                    </IconButton>
                </Paper>
            </Box>
        </Box>
    );
};

export default ChatBot;
