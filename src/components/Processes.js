import React from 'react'
import PropTypes from 'prop-types'

import styles from './Processes.scss';
const Processes = ({processes}) => (
//<pre>{JSON.stringify(processes)}</pre>

  <ul className="Processes">
     {processes.map((process, i) =>
       <li key={i}>{process.name}, {process.description}</li>
     )}
  </ul>
)

Processes.propTypes = {
  processes: PropTypes.array.isRequired
}

export default Processes
