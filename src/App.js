import React, { useEffect } from "react";
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

  // Function reset grid
  reset = () => {
    this.setState({grid: [
      ["","","",""],
      ["","","",""],
      ["","","",""],
      ["","","",""]
    ]})
  }

  // Function create random space
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

    // Function start
    start = async () => {
      const waitReset = await this.reset()
      this.randomNumber()
      console.log(waitReset)
    }

    // Compress grid left
    compressGridLeft = () => {
      const gridVide = [
        ["","","",""],
        ["","","",""],
        ["","","",""],
        ["","","",""]
      ]
      const gridState = this.state.grid

      gridState.map((row, i) => {
        let colNum = 0
        row.map((item, j) => {
          if(gridState[i][j] !== ""){
            gridVide[i][colNum] = gridState[i][j];
            colNum++
          }
        })
      })

      this.setState({
        grid : gridVide
      })
    }

    // Function merge same numbers
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

    // Function left
    left = async () =>{
      let wait = await this.compressGridLeft()
      let wait1 = await this.mergeSameNumbersRow()
      wait = await this.compressGridLeft()
      this.addNumberRandom()
      console.log(wait, wait1);
    }

    // Compress grid right
    compressGridRight = () => {
      const gridVide = [
        ["","","",""],
        ["","","",""],
        ["","","",""],
        ["","","",""]
      ]
      const gridState = this.state.grid

      gridState.map((row, i) => {
        let colNum = 3
        row.map((item, j) => {
          if(gridState[i][j] !== ""){
            gridVide[i][colNum] = gridState[i][j];
            colNum--
          }
        })
      })

      this.setState({
        grid : gridVide
      })
    }

    // Function right
    right = async () =>{
      let wait = await this.compressGridRight()
      let wait1 = await this.mergeSameNumbersRow()
      wait = await this.compressGridRight()
      this.addNumberRandom()
      console.log(wait, wait1);
    }

    // rotate left the current grid and push left that will give the up and rotate right again

    // Grid rotate left
    rotateLeft = () =>{
      const gridVide = [
        ["","","",""],
        ["","","",""],
        ["","","",""],
        ["","","",""]
      ]
      const gridState = this.state.grid

      gridState.map((row, i) => {
        row.map((item, j) => {
          gridVide[i][j] = gridState[j][gridState[i].length - 1 - i]
        })
      })

      this.setState({
        grid: gridVide
      })
    }

    // Grid rotate right
    rotateRight = () => {
      const gridVide = [
        ["","","",""],
        ["","","",""],
        ["","","",""],
        ["","","",""]
      ]
      const gridState = this.state.grid

      gridState.map((row, i) => {
        row.map((item, j) => {
          gridVide[i][j] = gridState[gridState[i].length - 1 - j][i]
        })
      })

      this.setState({
        grid: gridVide
      })
    }

    // function up
    up = async () =>{
      let wait = await this.rotateLeft()
      let wait1 = await this.left()
      let wait2 = await this.rotateRight()
      console.log(wait, wait1, wait2);
    }

    // Function Down
    down = async () =>{
      let wait = await this.rotateLeft()
      let wait1 = await this.right()
      let wait2 = await this.rotateRight()
      console.log(wait, wait1, wait2);
    }

    // Add random number
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

   onKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          this.left()
          break;
        case 'ArrowRight':
          this.right()
          break;
        case 'ArrowUp':
          this.up()
          break;
        case 'ArrowDown':
          this.down()
          break;
      
        default:
          break;
      }
      
      console.log(e.key)

  }

    render(){

      
    return (
      <>
        <section onKeyDown={this.onKeyDown}>
          <button onClick={this.start}>start</button>
          <Grid grid={this.state.grid}/>
        </section>
      </>
    );
  }
}

export default App;
