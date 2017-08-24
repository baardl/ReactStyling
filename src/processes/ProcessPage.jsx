import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class ProcessPage extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return(
            <div className="col-md-8 col-md-offset-2">
                <h1>{this.props.process.name}</h1>
                <p>description: {this.props.process.description}</p>
                <p>owner: {this.props.process.owner}</p>
                <p>lastUpdated: {this.props.process.lastUpdated}</p>
            </div>
        );
    }
}


ProcessPage.PropTypes = {
    process: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    // state = {processes: [{"processId" ...},{"processId"....}]
        let process = {processId: '', name: '',snippet: '',owner: '',description: '',created: '',lastUpdated: '',
            imageUrl: ''};

        const processId = ownProps.params.processId;
        if (state.processes.length > 0) {
            process = Object.assign({}, state.processes.find(process => process.processId ==  processId));
        }
        return {process: process};

}

export default connect(mapStateToProps)(ProcessPage);