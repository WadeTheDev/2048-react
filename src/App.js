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

    // dushen

    compressGrid = () => {
      const gridVide = [
        ["","","",""],
        ["","","",""],
        ["","","",""],
        ["","","",""]
      ]

      this.state.grid.map((row, i) => {
        let colNum = 0

        row.map((item, j) => {
          if(this.state.grid[i][j] !== ""){
            gridVide[i][colNum] = this.state.grid[i][j];
            colNum++
          }
        })
      })

      this.setState({
        grid : gridVide
      })
    }

    mergeSameNumbers = () => {
      const gridClone = [...this.state.grid]

      gridClone.map((row, i) => {
        row.slice(0, row.length-1).map((item, j) => {
          if(gridClone[i][j] !== "" &&
          gridClone[i][j] === gridClone[i][j+1]){
            gridClone[i][j] = gridClone[i][j]*2
            gridClone[i][j+1] = ""
          }
        })
      })

      this.setState({
        grid: gridClone
      })
    }


    // dushen

    left = () => {
      this.state.grid.forEach((row) => {

      })
    }

    render(){
    return (
      <>
        <section>
          <button onClick={this.compressGrid}>compress</button>
          <button onClick={this.mergeSameNumbers}>merge</button>
          <button onClick={this.start}>start</button>
          <Grid grid={this.state.grid}/>
        </section>
      </>
    );
  }
}

export default App;
