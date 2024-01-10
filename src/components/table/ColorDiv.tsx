import { getColorRepresentation } from '../../utils/global-helpers';

const ColorBox: React.FC<{ color: string | undefined; isActive: boolean; onTouch: () => void }> = ({ color, isActive, onTouch }) => {
    const backgroundColor = getColorRepresentation(color);
    
    const isSpecialColor = color === 'n/a' || color === 'none' || color === 'unknown';
    const boxStyle = isSpecialColor ? {
        background: 'repeating-linear-gradient(45deg, #808080, #808080 10px, #A9A9A9 10px, #A9A9A9 20px)',
        border: '1px solid black',
        width: '20px', 
        height: '20px', 
        display: 'inline-block', 
        marginRight: '5px',
        cursor: 'pointer',
        position: 'relative' as 'relative'
    } : {
        background: backgroundColor,
        border: '1px solid black',
        width: '20px',
        height: '20px',
        display: 'inline-block',
        marginRight: '5px',
        cursor: 'pointer',
        position: 'relative' as 'relative'
    };

    return (
        <div 
            style={boxStyle}
            onTouchStart={onTouch} // for touch devices so the user can still view the color text value like dark blue etc
            title={color}
        >
            {isActive && 
                <div 
                    style={{ 
                        position: 'absolute', 
                        backgroundColor: '#fff', 
                        bottom: "-16px",
                        right: "-30px",
                        color: "black",
                        padding: "4px",
                        textAlign: "center",
                        fontSize: "smaller",
                        width: 'fit',
                        wordBreak: 'keep-all',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {color}
                </div>
            }
        </div>
    );
};

export default ColorBox;
