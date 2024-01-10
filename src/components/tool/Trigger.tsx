import { ChangeEvent, useState } from "react";
import { useLocation } from "react-router-dom";

import { useToolkit } from '../../utils/contexts/ToolkitContext';
import "./Trigger.css";

const Trigger = () => {
    const [delay, setDelay] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const location = useLocation();
    const { triggerError, setApiDelay, clearCache } = useToolkit();

    const handleLoginError = () => {
        triggerError('login', 'Invalid username or password!');
    };
    
    const handleApiError = () => {
        triggerError('api', 'API error, please try again');
    };

    const handleCache = () => {
        clearCache();
        setIsOpen(!isOpen);
    }

    const errorButton = location.pathname === "/" ? (
        <button
            type="button"
            aria-label="Trigger Error"
            onClick={() => handleLoginError()}
            className="tg-btn"
        >
            Login
        </button>
    ) : location.pathname === "/table" ? (
        <>
            <button
                type="button"
                aria-label="Trigger Error"
                onClick={() => handleApiError()}
                className="tg-btn"
            >
                API
            </button>
            <button
                type="button"
                aria-label="Clear Cache"
                onClick={() => handleCache()}
                className="tg-btn cache"
            >
                Clear Cache
            </button>
        </>
    ) : null;

    const handleOpen = () => {
        if (location.pathname === '/' || location.pathname === '/table') {
            setIsOpen(!isOpen);
        } else {
            return
        }
    }

    const handleDelayChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {

            if (!isNaN(parseInt(event.target.value))) {
                const tNum = parseInt(event.target.value) < 0 ? 0 : parseInt(event.target.value) > 10 ? 10 : parseInt(event.target.value)
                setDelay(tNum);
            }
        }
    }

    const SetDelay = () => {
        setApiDelay(delay * 1000)
        setIsOpen(!isOpen);
    }

    return (
        <>
            <button className="toolkit-btn" onClick={handleOpen}>
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
                    className="lucide lucide-wrench"
                >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
            </button>
            {isOpen && (
                <div className="trigger-main-holder">
                    <h1 className="trigger-h">Dev Tool Kit</h1>
                    <div className="tg-h">
                        <span>
                            Trigger an Error for:
                        </span>
                        {errorButton}
                    </div>
                    <div className="tg-h">
                        <span>
                            APIs response Delay
                        </span>
                        <div className="tg-api">
                            <input 
                                type="number"
                                min={0}
                                max={10}
                                name="apiDealy"
                                autoComplete="off"
                                value={delay}
                                onChange={handleDelayChange}
                                placeholder="Delay Api Response by:"
                            />
                            <button
                                type="button"
                                aria-label="API Delay"
                                className="tg-btn apidelay"
                                onClick={() => SetDelay()}
                            >
                                SET
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default Trigger;