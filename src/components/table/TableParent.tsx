import { useState } from 'react';

import { useToolkit } from '../../utils/contexts/ToolkitContext';
import useFetchPeople from '../../utils/hooks/data-fetching';
import useDocumentTitle from '../../utils/hooks/seo';
import ErrorComp from '../ui/ErrorComp';
import TableComp from './TableComp';
import Pagination from './Pagination';
import SkeletonTable from './Sekeleton';
import SearchBar from './SearchBar';

type ColumnDisplayNames = {
    [key: string]: string;
};

const columnDisplayNames: ColumnDisplayNames = {
    name: "Name",
    mass: "Mass",
    height: "Height",
    hair_color: "Hair Color",
    skin_color: "Skin Color",
    action: "Action",
};

const TableParent: React.FC = () => {
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hiddenColumns, setHiddenColumns] = useState<{ [key: string]: boolean }>({
        name: false,
        mass: false,
        height: false,
        hair_color: false,
        skin_color: false,
    });
    const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { data: people, isLoading, error, total } = useFetchPeople(currentPage, searchQuery);
    const { toolkitState } = useToolkit();

    useDocumentTitle('Table Page');
    
    const pageSize = 10;

    const handlePageChange = async (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const toggleColumnVisibility = (column: string) => {
        setHiddenColumns(prevState => ({
            ...prevState,
            [column]: !prevState[column]
        }));
    };
    
    return (
        <>
            <SearchBar isLoading={isLoading} onSearch={handleSearch}/>
            <div className="filter-dropdown">
                <button onClick={() => setShowFilterDropdown(!showFilterDropdown)}>Filter</button>
                {showFilterDropdown && (
                    <div className="filter-options" style={showFilterDropdown ? {display: "flex", flexDirection: "column"} : { display: "none"}}>
                        {Object.keys(hiddenColumns).map(column => (
                            <label key={column}>
                                <input
                                    type="checkbox"
                                    checked={!hiddenColumns[column]}
                                    onChange={() => toggleColumnVisibility(column)}
                                />
                                {columnDisplayNames[column] || column}
                            </label>
                        ))}
                    </div>
                )}
            </div>
           
            {isLoading && 
                <div className='table-main-holder'>
                    <div className='table-r-h'>
                        <SkeletonTable hiddenColumns={hiddenColumns} />
                    </div>
                </div>
            }
            
            {toolkitState.error.type === 'api' && <ErrorComp message={toolkitState.error.message} origin='dev' />}
            {error && <ErrorComp message={error} origin='prod' />}
            {!isLoading && !error && (
                <>
                    <TableComp 
                        people={people} 
                        hiddenColumns={hiddenColumns}
                    />
                </>
            )}
            {!error && people.length > 0 && (
            <Pagination 
                page={currentPage} 
                total={total} 
                pageSize={pageSize} 
                onPageChange={handlePageChange} 
                loading={isLoading}
            />
            )}
        </>
    );
};

export default TableParent;