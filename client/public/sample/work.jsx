import React from 'react';

class Work extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'kumar' };
  }

  render() {
    return (
      <>
        <h1>Hello, {this.state.name}!</h1>
      </>
    );
  }
}



export default Work ;
