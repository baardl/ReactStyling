import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import { selectReddit, fetchPostsIfNeeded, invalidateReddit, selectProcessSubset, fetchProcessesIfNeeded,invalidateProcessSubset } from '../actions'
import { selectProcessSubset, fetchProcessesIfNeeded,invalidateProcessSubset } from '../actions'
import Picker from '../components/Picker'
// import Posts from '../components/Posts'
import Processes from '../components/Processes'

class ProcessSelector extends Component {
  static propTypes = {
    selectedProcessSubset: PropTypes.string.isRequired,
    processes: PropTypes.array.isRequired,
    // selectedReddit: PropTypes.string.isRequired,
    // posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

    componentDidMount() {
        const { dispatch, selectedProcessSubset } = this.props
        dispatch(fetchProcessesIfNeeded(selectedProcessSubset))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedProcessSubset !== this.props.selectedProcessSubset) {
            const { dispatch, selectedProcessSubset } = nextProps
            dispatch(fetchProcessesIfNeeded(selectedProcessSubset))
        }
    }

    handleChange = nextProcessSubset => {
        this.props.dispatch(selectProcessSubset(nextProcessSubset))
    }

    handleRefreshClick = e => {
        e.preventDefault()

        const { dispatch, selectedProcessSubset } = this.props
        dispatch(invalidateProcessSubset(selectedProcessSubset))
        dispatch(fetchProcessesIfNeeded(selectedProcessSubset))
    }
    render() {
        const { selectedProcessSubset, processes, isFetching, lastUpdated } = this.props
        const isEmpty = processes.length === 0
        return (
            <div>
              <Picker value={selectedProcessSubset}
                      onChange={this.handleChange}
                      options={[ 'all', 'mine', 'recommended to me' ]} />
              <p>
                  {lastUpdated &&
                  <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                      {' '}
            </span>
                  }
                  {!isFetching &&
                  <button onClick={this.handleRefreshClick}>
                    Refresh
                  </button>
                  }
              </p>
                {isEmpty
                    ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                    : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                      <Processes processes={processes} />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { selectedProcessSubset, processesBySubset } = state
    const {
        isFetching,
        lastUpdated,
        items: processes
    } = processesBySubset[selectedProcessSubset] || {
        isFetching: true,
        items: []
    }

    return {
        selectedProcessSubset,
        processes,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(ProcessSelector)

  // componentDidMount() {
  //   const { dispatch, selectedReddit } = this.props
  //   dispatch(fetchPostsIfNeeded(selectedReddit))
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.selectedReddit !== this.props.selectedReddit) {
  //     const { dispatch, selectedReddit } = nextProps
  //     dispatch(fetchPostsIfNeeded(selectedReddit))
  //   }
  // }

  // handleChange = nextReddit => {
  //   this.props.dispatch(selectReddit(nextReddit))
  // }

  // handleRefreshClick = e => {
  //   e.preventDefault()
  //
  //   const { dispatch, selectedReddit } = this.props
  //   dispatch(invalidateReddit(selectedReddit))
  //   dispatch(fetchPostsIfNeeded(selectedReddit))
  // }

//   render() {
//     const { selectedReddit, posts, isFetching, lastUpdated } = this.props
//     const isEmpty = posts.length === 0
//     return (
//       <div>
//         <Picker value={selectedReddit}
//                 onChange={this.handleChange}
//                 options={[ 'reactjs', 'frontend' ]} />
//         <p>
//           {lastUpdated &&
//             <span>
//               Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
//               {' '}
//             </span>
//           }
//           {!isFetching &&
//             <button onClick={this.handleRefreshClick}>
//               Refresh
//             </button>
//           }
//         </p>
//         {isEmpty
//           ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
//           : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
//               <Posts posts={posts} />
//             </div>
//         }
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   const { selectedReddit, postsByReddit } = state
//   const {
//     isFetching,
//     lastUpdated,
//     items: posts
//   } = postsByReddit[selectedReddit] || {
//     isFetching: true,
//     items: []
//   }
//
//   return {
//     selectedReddit,
//     posts,
//     isFetching,
//     lastUpdated
//   }
// }
//
// export default connect(mapStateToProps)(App)
