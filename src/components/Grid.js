import React from "react";
import "../App.css";

class Grid extends React.Component {

  render(){

    return (
    <div className="big-container">
        {this.props.grid.map((row,i) => {
          return(
          <div key={i} className="lil-container flex">
            {row.map((item, j) => {
              return(
              <div key={j} className={`item cell${item}`}>
                <p className="number">{item}</p>
              </div>)
            })}
          </div>)
        })}
      </div>
    );
  }
}

export default Grid;
