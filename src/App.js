import React from "react";
import './App.css';
import Grid from "./components/Grid";

class App extends React.Component {
  constructor(){
    super()

    this.state = {
      score : 0,
      gameOver : false,
      message : '',
      grid: [
        ["","","",""],
        ["","","",""],
        ["","","",""],
        ["","","",""]
      ],
      init: 0
    }
  }

    reset = () => {
      this.setState({grid: [
        ["","","",""],
        ["","","",""],
        ["","","",""],
        ["","","",""]
      ]})
    }

    randomNumber = () => {
      let array = [2,4]
      let random = Math.floor(Math.random()* 2)
      let randomRow = Math.floor(Math.random()* 4)
      let randomColumn = Math.floor(Math.random()* 4)
      let gridClone = [...this.state.grid]
      if (gridClone[randomRow][randomColumn] === "") {
        gridClone[randomRow][randomColumn] =  array[random]
        this.setState({grid: gridClone, init: this.state.init++})
        if (this.state.init === 1) {
          this.randomNumber()
        }else{
          this.setState({init: 0})
        }
      }else(
        this.randomNumber()
      )
    }

  start = async () => {
    const waitReset = await this.reset()
    this.randomNumber()
  }
  
  render(){
    return (
      <>
        <section>
          <button onClick={this.start}>start</button>
          <Grid grid={this.state.grid}/>
        </section>
      </>
    );
  }
}

export default App;
