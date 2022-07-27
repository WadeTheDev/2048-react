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
      possible: false,
      etat: '',
      victory: false,
      Move: "",
      direction:"",
      fin: false
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
              Move: "oui"
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
              score : scoreState + gridClone[i][j],
              direction: "",
              fin:true
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
          possible: test,
          Move:""
        })
        

        if (this.state.direction!==""){
          this.setState({
            direction:"oui",

          })
        }

    }

    // Function left
    left =  () =>{
      this.compressGridLeft()
    }

    // Update

    componentDidUpdate(prevProps, prevState){
      if (this.state.Move === "oui"){
        this.mergeSameNumbersRow()
      }

      if(this.state.possible){
        this.addNumberRandom()
      }

      if (this.state.direction==='Up'){
        this.left()
      }

      if (this.state.direction==='Down'){
        this.right()
      }

      if (this.state.direction==='oui'){
        this.rotateRight()
      }

      if (this.state.fin){
        this.victoire()
      }

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
        grid : gridVide,
        Move: "oui"
      })
    }

    // Function right
    right =  () =>{
      this.compressGridRight()
    }

    // rotate left the current grid and push left that will give the up and rotate right again

    // Grid rotate left
    rotateLeft = (direction) =>{
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

      if (direction==='Up'){
        this.setState({
          grid: gridVide,
          direction: 'Up'
        })
      }else if (direction==='Down'){
        this.setState({
          grid: gridVide,
          direction: 'Down'
        })
      }
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
        grid: gridVide,
        direction:"" 
      })
    }

    // function up
    up = (up) =>{
      this.rotateLeft(up)
    }

    // Function Down
    down = (down) =>{
      this.rotateLeft(down)
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
      this.setState({
        grid: gridClone,
        possible:false
        })
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
          this.up('Up')
          break;
        case 'ArrowDown':
          this.down('Down')
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
            etat: 'Victoire',
            fin:false
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
        <section onKeyDown={this.onKeyDown}>
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
