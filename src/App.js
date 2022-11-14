import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import './App.css'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: [],
    }
    this.counter = 0
    this.memory = 0
    this.time = 0
    this.size = 0
    this.input = React.createRef();
  }
  

  loadFile() {
    axios.get('/assets/'+this.input.current.value+'.xml', {
      "Content-Type": "application/xml; charset=utf-8"
    }).then(res => {
      const jsonDataFromXml = new XMLParser().parseFromString(res.data);
      this.setState({ name: jsonDataFromXml.getElementsByTagName('name') })
    });
  }
  render() {

    return (
      <>
        <div className="header">
          <h1>XML bomb tester</h1>
          <p>Counter: {this.counter}</p>
          <p>Memory used: {this.memory}</p>
          <p>Time elapsed: {this.time}</p>
          <p>Size of file: {this.size}</p>
          <input className="input" type="text" ref={this.input}></input>
          <button className="go" onClick={() => { this.loadFile() }}>Go</button>
        </div>
        <div className="container p-5">
          <ul className="list-group">
            {(
              this.state.name.map((item, index) => {
                this.counter = index + 1
                return (
                  <li key={index} className="list-group-item">{item.value}</li>
                )
              }
              ))}

          </ul>
        </div>
      </>
    )
  };
}

export default App;