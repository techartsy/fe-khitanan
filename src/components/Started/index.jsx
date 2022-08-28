import React from 'react';
import _ from 'lodash';
import piguraTop from '../../static/images/piguraTop.png';
import gunungan from '../../static/images/pigura.png';
import piguraBottom from '../../static/images/piguraBottom.png';
import classes from './style.module.scss';

const Started = ({ openInvitation, name }) => {

  return (
    <div className={classes.container}>
      <div className={classes.wraper}>
        <img className={classes.pigura} src={piguraTop} alt="frame" />
        <img className={classes.top} src={gunungan} alt="frame" />
        {!_.isEmpty(name) &&
          <div className={classes.toWraper}>
            <p>Teruntuk</p>
            <p className={classes.to}>{name}</p>
            <p>Di tempat</p>
          </div>
        }
        <div className={classes.btn} onClick={openInvitation}><strong>Buka Undangan</strong></div>
        <img className={classes.bottom} src={piguraBottom} alt="frame" />
      </div>
    </div>
  );
}

export default Started;
