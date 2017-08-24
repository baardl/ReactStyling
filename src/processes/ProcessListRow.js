import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const ProcessListRow = ({process}) => {
  return (
   <li><Link to={`/processes/${process.processId}`}>{process.name}</Link>, {process.description}</li>
  );
};

ProcessListRow.propTypes = {
  process: PropTypes.object.isRequired
};

export default ProcessListRow;
