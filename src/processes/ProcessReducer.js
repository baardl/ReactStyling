import * as types from '../common/ActionTypes';
import initialState from '../common/InitialState';

export default function processReducer(state = initialState.processes, action) {
    switch(action.type) {
        case types.LOAD_PROCESSES_SUCCESS:
            return action.processes;
        default:
            return state;
    }
}