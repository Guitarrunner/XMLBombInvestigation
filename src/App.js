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
    this.size = 0
    this.input = React.createRef();
  }

  handleChange(e) {
    var files = e.target.files;
    var file = files[0];
    this.setState({ size: file.size })
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = ()=> {
      const jsonDataFromXml = new XMLParser().parseFromString(reader.result);
      this.setState({ name: jsonDataFromXml.getElementsByTagName('name') })
    };
  };
  render() {

    return (
      <>
        <div className="header">
          <h1>XML bomb tester</h1>

          <input type="file" onChange={e => this.handleChange(e)} />
          <p>Counter: {this.counter}</p>
          <p>Size of file: {this.size}</p>
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
              )
              )
             }
            
          </ul>
        </div>
      </>
    )
  };
}

export default App;