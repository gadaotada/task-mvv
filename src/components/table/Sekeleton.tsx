import './Skeleton.css';

const SkeletonTable: React.FC<{ hiddenColumns: { [key: string]: boolean } }> = ({ hiddenColumns }) => {
    const numberOfRows = 10; // Who doesn't like magic numbers ? :)

    return (
        <table className="skeleton-table">
            <thead>
                <tr>
                    {!hiddenColumns.name && <th className='th-n-c'>Name</th>}
                    {!hiddenColumns.mass && <th>Mass</th>}
                    {!hiddenColumns.height && <th>Height</th>}
                    {!hiddenColumns.hair_color && <th>Hair Color</th>}
                    {!hiddenColumns.skin_color && <th>Skin Color</th>}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: numberOfRows }).map((_, index) => (
                    <tr key={index}>
                        {!hiddenColumns.name && <td><div className="skeleton-box th-n-c"></div></td>}
                        {!hiddenColumns.mass && <td><div className="skeleton-box th-hm-c"></div></td>}
                        {!hiddenColumns.height && <td><div className="skeleton-box th-hm-c"></div></td>}
                        {!hiddenColumns.hair_color && <td><div className="skeleton-box th-hsa-c"></div></td>}
                        {!hiddenColumns.skin_color && <td><div className="skeleton-box th-hsa-c"></div></td>}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SkeletonTable;