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

    // left

    compressGridLeft = () => {
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

    mergeSameNumbersRow = () => {
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

    left = async () =>{
      let wait = await this.compressGridLeft()
      let wait1 = await this.mergeSameNumbersRow()
      wait = await this.compressGridLeft()
      this.addNumberRandom()
      console.log(wait, wait1);
    }

    // right

    compressGridRight = () => {
      const gridVide = [
        ["","","",""],
        ["","","",""],
        ["","","",""],
        ["","","",""]
      ]

      this.state.grid.map((row, i) => {
        let colNum = 3

        row.map((item, j) => {
          if(this.state.grid[i][j] !== ""){
            gridVide[i][colNum] = this.state.grid[i][j];
            colNum--
          }
        })
      })

      this.setState({
        grid : gridVide
      })
    }

    Right = async () =>{
      let wait = await this.compressGridRight()
      let wait1 = await this.mergeSameNumbersRow()
      wait = await this.compressGridRight()
      this.addNumberRandom()
      console.log(wait, wait1);
    }

    // Up

    compressGridUp = () => {
      const gridVide = [
        ["","","",""],
        ["","","",""],
        ["","","",""],
        ["","","",""]
      ]

      this.state.grid.map((row, i) => {
        let rowNum = 0

        row.map((item, j) => {
          if(this.state.grid[i][j] !== ""){
            gridVide[rowNum][j] = this.state.grid[i][j];
            rowNum++
          }
        })
      })

      this.setState({
        grid : gridVide
      })
    }

    mergeSameNumbersColumn = () => {
      const gridClone = [...this.state.grid]

      gridClone.map((row, i) => {
        row.slice(0, row.length-1).map((item, j) => {
          if(gridClone[i][j] !== "" &&
          gridClone[i][j] === gridClone[i+1][j]){
            gridClone[i][j] = gridClone[i][j]*2
            gridClone[i+1][j] = ""
          }
        })
      })

      this.setState({
        grid: gridClone
      })
    }

    Up = async () =>{
      let wait = await this.compressGridUp()
      let wait1 = await this.mergeSameNumbersColumn()
      wait = await this.compressGridUp()
      this.addNumberRandom()
      console.log(wait, wait1);
    }
  
    // dushen le bg

    addNumberRandom = () =>{
      let array = [2,4]
      let random = Math.floor(Math.random()* 2)
      let randomRow = Math.floor(Math.random()* 4)
      let randomColumn = Math.floor(Math.random()* 4)
      let gridClone = [...this.state.grid]
      if (gridClone[randomRow][randomColumn] === "") {
      gridClone[randomRow][randomColumn] =  array[random]
      this.setState({grid: gridClone})
      }else{
        this.addNumberRandom()
      }
    }

    render(){
    return (
      <>
        <section>
          <button onClick={this.left}>Left</button>
          <button onClick={this.Right}>Right</button>
          <button onClick={this.Up}>Up</button>
          <button onClick={this.start}>start</button>
          <Grid grid={this.state.grid}/>
        </section>
      </>
    );
  }
}

export default App;
