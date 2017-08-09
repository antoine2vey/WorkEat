import React, { Component } from 'react';
import moment from 'moment';

class Timer extends Component {
  constructor() {
    super();
    this.tmrw = moment().add(1, 'day').hours('10').minutes('30').seconds('00').format();
    this.before = moment().hours('7').minutes('00').seconds('00').format();
    this.after = moment().hours('11').minutes('30').seconds('00').format();
    this.date = moment().unix();
    this.tmrwTimestamp = moment(this.tmrw).unix();
    this.tstamp = moment((this.tmrwTimestamp - this.date) * 1000).format('HH:mm:ss');

    this.state = {
      tstamp: this.tstamp,
    };
  }

  componentDidMount() {
    setInterval(() => {
      // eslint-disable-next-line
      const tmrw = moment().add(1, 'day').hours('10').minutes('30').seconds('00').format();
      const before = moment().hours('7').minutes('00').seconds('00').format();
      const after = moment().hours('11').minutes('30').seconds('00').format();
      const date = moment().unix();
      const tmrwTimestamp = moment(tmrw).unix();
      // Si je suis entre 8h et 11h30
      if (moment().isAfter(before) && moment().isBefore(after)) {
        return this.setState({ tstamp: moment((tmrwTimestamp - date) * 1000).format('HH:mm:ss') });
      }

      this.setState({ tstamp: 'Reviens à partir de 8h!' });
    }, 1000);
  }

  render() {
    return (
      <p className="main-header-timer-content">
        <span id="timer" className="main-header-timer-content-time">
          {this.state.tstamp}
        </span>
      </p>
    );
  }
}

export default Timer;
