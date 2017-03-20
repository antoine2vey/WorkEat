import React, { Component } from 'react';
import RenderLoginBox from './RenderLoginBox';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false
    }
  }

  handleLogin(e) {
    e.preventDefault();
  }

  render() {
    const { isLoggingIn } = this.state;

    return (
      <div className="container" style={{
        marginTop: 10,
        marginBottom: 10  
      }}>
        <h1 className="title">I am the home page with the login form</h1>
        <RenderLoginBox isLoggingIn={isLoggingIn} />
        <h2 className="">Some pics</h2>
        <h3>Some text around there</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium officia laboriosam, vel incidunt nam impedit quia iste natus fuga culpa autem deleniti neque reiciendis? Saepe nihil quas dolorem expedita officia.     </p>
      </div>
    );
  }
}

export default Home;

