import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '/* add your jsx here */',
      output: '',
      error: ''
    };

    this.update = this.update.bind(this)
  };

  update(e) {
    let code = e.target.value;
    try {
      this.setState({
        output: babel.transform(code, {
        stage: 0,
        loose: 'all'
        }).code
      })
    } catch(err) {
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <textarea onChange={this.update} defaultValue={this.state.input}></textarea>
          <pre>
            {this.state.output}
          </pre>
        </div>
      </div>
    );
  };

}

export default App;
