import React from 'react';
import PropTypes from 'prop-types';

import styles from './Processes.scss';
const ProcessPage = ({process}) => (
//<pre>{JSON.stringify(processes)}</pre>


    <div className="col-md-8 col-md-offset-2">
        <h1>{process.name}</h1>
        <p>description: {process.description}</p>
        <p>owner: {process.owner}</p>
        <p>lastUpdated: {process.lastUpdated}</p>

    </div>
)

ProcessPage.propTypes = {
    process: PropTypes.array.isRequired
}

export default ProcessPage

