import { combineReducers } from 'redux'
import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS,
    SELECT_PROCESS_SUBSET,INVALIDATE_PROCESS_SUBSET,
    REQUEST_PROCESSES,RECEIVE_PROCESSES
} from '../actions'

const selectedProcessSubset = (state = 'recommended to me', action) => {
    switch (action.type) {
        case SELECT_PROCESS_SUBSET:
            return action.processSubset
        default:
            return state
    }
}

const processes = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case INVALIDATE_PROCESS_SUBSET:
            return {
                ...state,
                didInvalidate: true
            }
        case REQUEST_PROCESSES:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_PROCESSES:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.processes,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}
const processesBySubset = (state = { }, action) => {
    switch (action.type) {
        case INVALIDATE_PROCESS_SUBSET:
        case RECEIVE_PROCESSES:
        case REQUEST_PROCESSES:
            return {
                ...state,
                [action.processSubset]: processes(state[action.processSubset], action)
            }
        default:
            return state
    }
}
//----------------------
/*
const selectedReddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsByReddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.reddit]: posts(state[action.reddit], action)
      }
    default:
      return state
  }
}
*/

const rootReducer = combineReducers({
    processesBySubset,
    selectedProcessSubset
})

export default rootReducer
