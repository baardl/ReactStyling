import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as processActions from './ProcessAction';
import ProcessList from './ProcessListSP';

class ProcessesPage extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return(
            <div className="col-md-12">
                <h1>Processes</h1>
                <div className="col-md-4">
                    <ProcessList cats={this.props.processes} />
                </div>
                <div className="col-md-8">
                    {this.props.children}
                </div>
            </div>
        );
    }
}


ProcessesPage.PropTypes = {
    processes: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    // state = {processes: [{"processId" ...},{"processId"....}]
    return {
        processes: state.processes
    };

}

export default connect(mapStateToProps)(ProcessesPage);