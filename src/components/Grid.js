import React from "react";

class Grid extends React.Component {

  render(){

    return (
    <div className="big-container border">
        {this.props.grid.map((row,i) => {
          return(
          <div key={i} className="lil-container flex">
            {row.map((item, j) => {
              return(
              <div key={j} className="item border">
                <p>{item}</p>
              </div>)
            })}
          </div>)
        })}
      </div>
    );
  }
}

export default Grid;
