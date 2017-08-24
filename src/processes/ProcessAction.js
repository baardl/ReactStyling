import processApi from './ProcesessApi';
import * as types from '../common/ActionTypes';

export function loadProcesses() {
    return function(dispatch) {
        return processApi.getAllProcesses().then(processes => {
            dispatch(loadProcessesSuccess(processes));
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadProcessesSuccess(processes) {
    return {type: 'LOAD_PROCESSES_SUCCESS', processes};
}