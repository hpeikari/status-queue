import React from 'react';
import PropTypes from 'prop-types';

import NoIcon from '../assets/ic-none.svg';
import FailIcon from '../assets/ic-fail.svg';
import CompleteIcon from '../assets/ic-success.svg';
import InfeasibleIcon from '../assets/ic-warning.svg';

import styles from '../styles/ScenarioStatusQueue.scss';


const ScenarioStatus = ({
  scenarioName,
  modelName,
  status,
  time
}) => {

  const statusTypes = [{
    type: 'complete',
    color: '#008a2f', //green
    icon: <CompleteIcon />
  }, {
    type: 'failed',
    color: '#d30028', //red
    icon: <FailIcon />
  }, {
    type: 'infeasible',
    color: '#ffa500', //orange
    icon: <InfeasibleIcon />
  }];

  const getStatusColor = (stType) => {
    const foundColor = statusTypes.find(({type}) => type.toUpperCase() === stType.toUpperCase());
    return foundColor ? {'color': foundColor.color} : {};
  }

  const getStatusIcon = (stType) => {
    const foundIcon = statusTypes.find(({type}) => type.toUpperCase() === stType.toUpperCase());
    return foundIcon ? foundIcon.icon : <NoIcon />;
  }

  return (
    <div className={styles.ScenarioStatusWrapper || 'ScenarioStatusWrapper'}>
      <div className={styles.iconWrapper || 'iconWrapper'}>
        {
          getStatusIcon(status)
        }

      </div>

      <div className={styles.scenarioInfoWrapper || 'scenarioInfoWrapper'}>
        <div className={styles.scenarioName || 'scenarioName'}>
          {scenarioName || 'No Scenario Name!'}
        </div>
        <div className={styles.modelName || 'modelName'}>
          {modelName || 'No Model Name!'}
        </div>
      </div>

      <div className={styles.statusWrapper || 'statusWrapper'}>
        <div>
          Status -
          <span
            className={styles.statusStyle || 'statusStyle'}
            style={getStatusColor(status)}
          >
            { status || 'No Status!' }
          </span>
        </div>
        <div>
          Time Running - {time || 'No Time!'}
        </div>
      </div>

    </div>
  );
}

ScenarioStatus.propTypes = {
  scenarioName: PropTypes.string.isRequired,
  modelName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
};

export default ScenarioStatus;
