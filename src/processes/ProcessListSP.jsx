import React from 'react';
import PropTypes from 'prop-types';

const ProcessList = ({processes}) => {
    return (
        <ul className="list-group">
            {processes.map(process =>
                <li className="list-group-item" key={process.processId}>
                    {process.name}
                </li>
            )}
        </ul>
    );
};

ProcessList.propTypes = {
    processes: PropTypes.array.isRequired
};

export default ProcessList;