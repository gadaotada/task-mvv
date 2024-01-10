import { useState } from 'react';

import ColorBox from './ColorDiv';
import './TableComp.css';

type SwPerson = {
    name: string;
    height: string
    mass: string;
    hair_color: string;
    skin_color: string;
} | null


const TableComp: React.FC<{ people: SwPerson[], hiddenColumns: { [key: string]: boolean }}> = ({people, hiddenColumns}) => {
    const [activeColorBox, setActiveColorBox] = useState<string | null>(null);

    const handleColorBoxTouch = (identifier: string | undefined) => {
        if (identifier) {
            setActiveColorBox(activeColorBox === identifier ? null : identifier);
        }
    };
   

    return (
        <div className="table-main-holder">
            {people.length === 0 ? <><p className='no-result'>Sorry, No Results to be shown...</p></> :
            <div className='table-r-h'>
                <table>
                    <thead>
                        <tr>
                            {!hiddenColumns.name && <th>Name</th>}
                            {!hiddenColumns.mass && <th>Mass</th>}
                            {!hiddenColumns.height && <th>Height</th>}
                            {!hiddenColumns.hair_color && <th>Hair Color</th>}
                            {!hiddenColumns.skin_color && <th>Skin Color</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {people && people.map(person => (
                            <tr key={person?.name}>
                                {!hiddenColumns.name && <td>{person?.name}</td>}
                                {!hiddenColumns.mass && <td>{person?.mass}</td>}
                                {!hiddenColumns.height && <td>{person?.height}</td>}
                                {!hiddenColumns.hair_color && 
                                    <td>
                                        <div className='content'>
                                            <ColorBox 
                                                color={person?.hair_color}
                                                isActive={activeColorBox === `${person?.name}-hair`}
                                                onTouch={() => handleColorBoxTouch(`${person?.name}-hair`)}
                                            />
                                            <span className='lg-t'>
                                                {person?.hair_color}
                                            </span>
                                        </div>
                                    </td>
                                }
                                {!hiddenColumns.skin_color && 
                                    <td>
                                        <div className='content'>
                                            <ColorBox 
                                                color={person?.skin_color}
                                                isActive={activeColorBox === `${person?.name}-skin`}
                                                onTouch={() => handleColorBoxTouch(`${person?.name}-skin`)}
                                            />
                                            <span className='lg-t'>
                                                {person?.skin_color}
                                            </span>
                                        </div>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        }
        </div>
    );
};

export default TableComp;