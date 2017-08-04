import React, { Component } from 'react';
import axios from 'axios';

class Prestataire extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date().toISOString(),
    };

    this.changeDate = this.changeDate.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);
  }

  downloadCSV() {
    const { date } = this.state;

    axios.post('/api/csv', { date })
    .then(res => console.log(res))
    .catch(({ response }) => console.error(response));
  }

  changeDate(event) {
    const { valueAsDate } = event.target;

    this.setState({
      date: valueAsDate.toISOString(),
    });
  }

  render() {
    return (
      <div style={{ paddingTop: 100 }}>
        <input type="date" onChange={this.changeDate} />
        <button onClick={this.downloadCSV}>downloadCSV</button>
      </div>
    );
  }
}

export default Prestataire;

