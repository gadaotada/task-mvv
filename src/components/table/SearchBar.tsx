import { useState } from "react";
import "./SearchBar.css"

interface SearchBarProps {
    isLoading: boolean;
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({isLoading, onSearch}) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };
    // Can be improved specially with validating max chars per query
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const sliceVal = searchValue.slice(0, 60) // basic handeling for long string inpts
            onSearch(sliceVal);
        }
    };
    const handleSearchClick = () => {
        const sliceVal = searchValue.slice(0, 60)
        onSearch(sliceVal);
    };

    return (
        <div className="search-holder">
            <input
                placeholder='Search for names'
                name="search-ppl"
                className='seach-bar'
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                disabled={isLoading}
            />
            <button
                type="button"
                aria-label="search-btn"
                className={"s-btn" + (isLoading ? " disabled-sb" : "")}
                disabled={isLoading}
                onClick={handleSearchClick}
            >
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
                    className="lucide lucide-search"
                >
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                </svg>
            </button>
        </div>
    )
}

export default SearchBar;