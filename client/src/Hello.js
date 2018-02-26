import React, {Component} from 'react';
import axios from 'axios';

class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  getHello() {
    axios.get('/api/hello').then(result => {
      console.log(result);
      this.setState({
        text: result.data,
      });
    });
  }

  componentDidMount() {
    this.getHello();
  }

  render() {
    return (
      <div>
        <code>API is serving: {this.state.text}</code>
      </div>
    );
  }
}

export default Hello;
