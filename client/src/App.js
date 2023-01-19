import React, { Component,useContext } from 'react';
import './App.css';
import Info from './info';
import WalletMenu from './menu';
import PopUpMenu from './popup';
import Sc from './sc';




class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      mod: null,
      inst: null,
      wallet:null,
    }
  }

  

  async componentDidMount() {
    
    let { instance, module } = await WebAssembly.instantiateStreaming(fetch("dero_wallet.wasm"), window.go.importObject)
    await window.go.run(instance)
    
    this.setState({
      mod: module,
      inst: instance
    })
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      message: e.target.value
    })
  }






  render() {
    return (
      <div className="App"> 
      <PopUpMenu/>
      <Info/>
      <Sc/>
      
        
       
      </div>
    )
  }
}

export default App;
