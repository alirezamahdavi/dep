import React, { Component } from 'react';
import {Link} from 'react-router';
import './CSSFiles/App.css';
////////////////////////////////////////

class App extends Component {

  render() {
    return (
        <div className="mynav">
            <nav className='navclass'>   
                <button className="btn btn-default"><Link to="home">Home </Link></button>
                <button className="btn btn-default"><Link to="fit">FitBit</Link></button>
                <button className="btn btn-default right"><Link to="about">About</Link></button>
            </nav>
            <div className='appclass'>
                  {this.props.children}   
            </div>
        </div>
    );
  }
}


export default App;

