import React from 'react';

import styles from './Processes.scss';
const ProcessPage = (props) =>  {
    console.log("Match: ", processes);
    // console.log("Process: ", process);
    let process = {};
    let processId = props.match.params.processId;
    let processes = props.processes;


    for (var i = 0; i < processes.length; i++){
        if (processes[i].processId == processId){
            process = processes[i];
        }
    }

    return (
        <div className="col-md-8 col-md-offset-2">
            <h1>{process.name}</h1>
            <p>description: {process.description}</p>
            <p>owner: {process.owner}</p>
            <p>lastUpdated: {process.lastUpdated}</p>

        </div>

    )
}


export default ProcessPage

