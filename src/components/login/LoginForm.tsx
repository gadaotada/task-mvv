import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import ErrorComp from '../ui/ErrorComp';
import { getYear } from '../../utils/global-helpers';
import useDocumentTitle from '../../utils/hooks/seo';
import { useToolkit } from '../../utils/contexts/ToolkitContext';
import loginImage from '../../assets/login-hero-img.png';
import LoadingSpin from '../ui/LoadingSpin';
import './LoginForm.css';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [formErrors, setFormErrors] = useState<{ username: string; password: string }>({ username: '', password: '' });
    const [loading, setLoading] = useState<boolean>(false);

    useDocumentTitle('Login Page');

    const navigate = useNavigate();
    const { toolkitState } = useToolkit();

    const userNamePassValidation = (): boolean => {
        let usernameError = '';
        let passwordError = '';
    
        if (username.trim().length < 3) {
            usernameError = 'Username must be at least 3 characters.';
        }
    
        if (password.trim().length < 3) {
            passwordError = 'Password must be at least 3 characters and one uppercase letter.';
            // cyrillic support
        } else if (!/\p{Lu}/u.test(password)) {
            passwordError = 'Password must contain at least one uppercase letter.';
        }
    
        setFormErrors({ username: usernameError, password: passwordError });
    
        return !usernameError && !passwordError && !loading;
    };
    

    const isFormValid = (): boolean => {
        return username.trim().length > 0 && password.trim().length > 0 && !loading;
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const genDelay = toolkitState.apiDelay <= 0 ? 2000 : toolkitState.apiDelay 
        // Setting a loading state to prevent the user from sending multiple requests
        // Adds a navigation delay to simulate real time api calls
        const passValidation = userNamePassValidation()
        if (!passValidation) {
            return;
        } else {
            setLoading(true);
            setTimeout(() => {
                navigate('/table');
            }, genDelay);
            // In a real app we should be handeling errors here
        }
    };

    return (
        <div className='login-form-holder'>
            <form onSubmit={handleSubmit} className="login-form-card">
                <div className='login-hero-holder'>
                    <img src={loginImage} alt="Login" className="login-image" />
                    <h1 className='login-hero-text'>Sign in</h1>
                    <p className="form-error-message">
                        {formErrors.username && formErrors.username}
                    </p>
                    <p className="form-error-message p-e-m">
                        {formErrors.password && formErrors.password}
                    </p>
                    
                </div>
                {/* Loading spinner overlay here */}
                {loading && (
                   <LoadingSpin />
                )}
                {/* Errors part from the toolkit */}
                {toolkitState.error.type === 'login' && <ErrorComp message={toolkitState.error.message} origin='dev' />}

    
                <div className='inp-wrapper'>
                    <div className='inp-holder'>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="lucide lucide-user"
                        >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='inp-holder'>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="lucide lucide-lock"
                        >
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            enterKeyHint="send"
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={!isFormValid()}
                    >
                        Login
                    </button>
                    <p className='author-p'>{getYear()} MVV &trade;</p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
