import { useToolkit } from '../../utils/contexts/ToolkitContext';
import { useNavigate } from 'react-router-dom';

import './ErrorComp.css';

interface ErrorCompProps {
  message: string;
  origin: "prod" | "dev"
}

const ErrorComp: React.FC<ErrorCompProps> = ({ message, origin }) => {
    const { clearError } = useToolkit();
    const navigate = useNavigate();

    const handleErrors = () => {
        if (origin === 'dev') {
            clearError()
        } else {
            navigate('/')
        }
    }

    if (!message) return null;

    return (
        <div className='error-holder'>
            <div className="error-message">
                {message}
                <button className="clear-error-btn" onClick={handleErrors}>
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default ErrorComp;