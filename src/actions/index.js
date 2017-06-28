export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'
export const REQUEST_PROCESSES = 'REQUEST_PROCESSES'
export const RECEIVE_PROCESSES = 'RECEIVE_PROCESSES'
export const SELECT_PROCESS_SUBSET = 'SELECT_PROCESS_SUBSET'
export const INVALIDATE_PROCESS_SUBSET = 'INVALIDATE_PROCESS_SUBSET'

export const selectProcessSubset = processSubset => ({
    type: SELECT_PROCESS_SUBSET,
    processSubset
})

export const invalidateProcessSubset = processSubset => ({
    type: INVALIDATE_PROCESS_SUBSET,
    processSubset
})

export const requestProcesses = processSubset => ({
    type: REQUEST_PROCESSES,
    processSubset
})

export const receiveProcesses = (processSubset, json) => ({
    type: RECEIVE_PROCESSES,
    processSubset,
    processes: json,
    // processes: json.map(process => process.data),
    receivedAt: Date.now()
})

const fetchProcesses = processSubset => dispatch => {
    dispatch(requestProcesses(processSubset))
    return fetch(`https://dev.shareproc.com/frontend/processes?filter= ${processSubset}`)
        .then(response =>  response.json())
        .then(json => {console.log("respo" , json);dispatch(receiveProcesses(processSubset, json))})
}

const shouldFetchProcesses= (state, processSubset) => {
    const processes = state.processesBySubset[processSubset]
    if (!processes) {
        return true
    }
    if (processes.isFetching) {
        return false
    }
    return processes.didInvalidate
}
export const fetchProcessesIfNeeded = processSubset => (dispatch, getState) => {
    if (shouldFetchProcesses(getState(), processSubset)) {
        return dispatch(fetchProcesses(processSubset))
    }
}

//-------------------------------

export const selectReddit = reddit => ({
  type: SELECT_REDDIT,
  reddit
})

export const invalidateReddit = reddit => ({
  type: INVALIDATE_REDDIT,
  reddit
})

export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit
})

export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,
  reddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchPosts = reddit => dispatch => {
  dispatch(requestPosts(reddit))
  return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(reddit, json)))
}

const shouldFetchPosts = (state, reddit) => {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), reddit)) {
    return dispatch(fetchPosts(reddit))
  }
}
