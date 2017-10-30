import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/ScenarioStatusQueue.scss';
import ScenarioStatus from './ScenarioStatus';

import { fetchScenarioStatusQueue } from '../actions';

const NoScenarioQueue = ({}) => (
  <div className={styles.emptyQueue || 'emptyQueue'}>
    No Scenario Status is Available!
  </div>
);

const DisplayScenarioQueueStack = ({queue}) => (
  <span>
    {
      queue && queue.map((q,idx) =>
        idx < 10 && // TODO: only top 10 - requirements may change in future
        <ScenarioStatus
          key={idx}
          scenarioName={q.scenarioName || ''}
          modelName={q.modelName || ''}
          status={q.status || ''}
          time={q.time || ''}
        />
      )
    }
  </span>
);

class ScenarioStatusQueue extends Component {
  componentDidMount() {
    this.props.fetchScenarioStatusQueue();
  }

  render() {
    return (
      <div className={styles.ScenarioStatusQueueWrapper || 'ScenarioStatusQueueWrapper'}>
        <div className={styles.ScenarioQueueHeader || 'ScenarioQueueHeader'}>
          { this.props.headerText || 'Scenario Status Queue'}
        </div>
        {
          (this.props.queue && Array.isArray(this.props.queue) && this.props.queue.length > 0) ?
            <DisplayScenarioQueueStack queue={this.props.queue}/> :
            <NoScenarioQueue />
        }
      </div>
    );
  }
}

ScenarioStatusQueue.propTypes = {
  fetchScenarioStatusQueue: PropTypes.func.isRequired,
  headerText: PropTypes.string,
  queue: PropTypes.array,
};

const mapStateToProps = (state) => {
  if (!state.scenarioStatusQueueReducer) {
    console.error('Did you forget to include the scenario-status-queue package\'s reducer in your main application?');
  }

  return {
    queue: state.scenarioStatusQueueReducer && state.scenarioStatusQueueReducer.queue || []
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({fetchScenarioStatusQueue}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScenarioStatusQueue);
