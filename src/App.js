import React from "react";
import './App.css';
import Grid from "./components/Grid";

let init = 0
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
        this.setState({grid: gridClone})
        init++
        if (init === 1) {
          this.randomNumber()
        }else{
          init = 0
        }
      }else(
        this.randomNumber()
        )
      }
      
      start = async () => {
        const waitReset = await this.reset()
        this.randomNumber()
        console.log(waitReset)
      }

      left = () => {
        this.state.grid.forEach((row) => {
          
        })
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
