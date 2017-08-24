import React from 'react'
import PropTypes from 'prop-types'
import Link from 'react-router-dom'
import ProcessListRow from './ProcessListRow'

import styles from './Processes.scss';
const Processes = ({processes}) => (
//<pre>{JSON.stringify(processes)}</pre>


  <ul className="ProcessesList">
     {processes.map((process, i) =>
         <ProcessListRow key={i} process={process}/>
     )}
  </ul>
)

Processes.propTypes = {
  processes: PropTypes.array.isRequired
}

export default Processes
