import { useTheme } from '../../utils/contexts/ThemeProvider';
import './ThemeToggler.css';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    const handleModes = (currTheme: string) => {
        if (currTheme === "dark") {
            return (
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-moon"
                >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>)
        } else {
            return (
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
                    className="lucide lucide-sun"
                >
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2"/><path d="M12 20v2"/>
                    <path d="m4.93 4.93 1.41 1.41"/>
                    <path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/>
                    <path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/>
                    <path d="m19.07 4.93-1.41 1.41" />
                </svg>)
        }
    }

    return (
        <button 
            type='button'
            className='toggler-btn'    
            onClick={toggleTheme}
            aria-label="Theme Toggler"
        >
            {handleModes(theme)}
        </button>
    );
};

export default ThemeToggle;