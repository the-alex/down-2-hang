import React, {Component} from 'react';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      props: props
    }
  }

  render () {
    return (
      <h2>This is the `Home` component</h2>
    )
  }
}

export default Home;

