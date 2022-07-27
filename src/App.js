import React, { useEffect } from "react";
import './App.css';
import Grid from "./components/Grid";
let init = 0
let test = false


class App extends React.Component {
  constructor(){
    super()

    this.state = {
      score : 0,
      grid: [
        ["","","",""],
        ["","","",""],
        ["","","",""],
        ["","","",""]
      ],
      possible: true,
      etat: '',
      victory: false
    }

  }

  // Function reset grid
  reset = () => {
    this.setState({score : 0,
      grid: [
        ["","","",""],
        ["","","",""],
        ["","","",""],
        ["","","",""]
      ],
      etat: '',
      victory: false
  })
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
      const gridState = [...this.state.grid]

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
              grid : gridVide,
      })
    }

    // Function merge same numbers and add the score
    mergeSameNumbersRow = () => {
      const gridClone = [...this.state.grid]
      const scoreState = this.state.score

      gridClone.map((row, i) => {
        row.slice(0, row.length-1).map((item, j) => {
          if(gridClone[i][j] !== "" &&
          gridClone[i][j] === gridClone[i][j+1]){
            gridClone[i][j] = gridClone[i][j]*2
            gridClone[i][j+1] = ""

            this.setState({
              score : scoreState + gridClone[i][j]
            })
          }
        })
      })

      test=false

      gridClone.forEach((row,i)=>{
        row.forEach((element,j)=>{
          if (this.state.grid[i][j] !== element){
            test=true
          }
        })
      })

        this.setState({
          grid: gridClone,
          possible: test
        })

    }

    // Function left
    left = async () =>{
      let wait = await this.compressGridLeft()
        let wait1 = await this.mergeSameNumbersRow()
      if(this.state.possible){
        wait = await this.compressGridLeft()
        let wait3 = await this.victoire()
        this.addNumberRandom()
        console.log(wait, wait1,wait3);
      }
      this.setState({
        possible:true
      })
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
      // if (this.state.possible){
        wait = await this.compressGridRight()
      let wait3 = await this.victoire()
      this.addNumberRandom()
      console.log(wait, wait1,wait3);
      // }
      // this.setState({
      //   possible:true
      // })
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
  }

  // victoire

  victoire = () =>{
    let result=0
    let vide=0
    let rowTest=0
    this.state.grid.forEach((row)=>{
      row.forEach((element)=>{
        if (element === 2048){
          result++
        }
        if (element===""){
          vide++
        }
        if (result > 0 && !this.state.victory){
          this.setState({
            etat: 'Victoire'
          })
        }
      })
      if (vide===0){
        rowTest++
      }
    }
    )
    if (rowTest === 4 ){
      this.setState({
        etat: 'Defaite'
      })
    }
  }

  // continue

  continue = () =>{
    this.setState({
      etat: '',
      victory: true
    })
  }

    render(){


    return (
      <>
        {this.state.etat==='' &&
        <section className="right" onKeyDown={this.onKeyDown}>
          <button onClick={this.start}>start</button>
          <p className="white">Score : {this.state.score}</p>
          <Grid grid={this.state.grid}/>
        </section>}
        {this.state.etat==='Victoire' && <section>
          <h2>Victoire</h2>
          <button onClick={this.start}>restart</button>
          <button onClick={this.continue}>Continuer</button>
        </section>}
         {this.state.etat==='Defaite' && <section>
          <h2>Tu sais pas jouer Jack, t'es mauvais</h2>
          <button onClick={this.start}>Fait mieux!</button>
          </section>}
      </>
    );
  }
}

export default App;
