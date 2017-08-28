import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import fileDownload from 'react-file-download';

class Prestataire extends Component {
  constructor() {
    super();

    this.state = {
      date: moment().format('YYYY-MM-DD'),
    };

    this.changeDate = this.changeDate.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);
  }

  downloadCSV() {
    const { date } = this.state;

    axios.post('/api/csv', { date }, {
      headers: {
        Authorization: `Bearer ${localStorage._token}`,
      },
    })
    .then(({ status, data: { fileContent, fileName } }) => {
      if (status === 200) {
        fileDownload(fileContent, fileName);
      }
    })
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
        <input type="date" onChange={this.changeDate} defaultValue={this.state.date} />
        <button onClick={this.downloadCSV}>downloadCSV</button>
      </div>
    );
  }
}

export default Prestataire;

