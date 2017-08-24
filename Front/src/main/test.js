import React, {Component} from 'react';
import axios from 'axios';

import '../CSSFiles/App.css';

class main extends Component {

    constructor() {
        super();


        this.handleClickForFitBit=this.handleClickForFitBit.bind(this);
    }

    handleClickForFitBit(e) {
        e.preventDefault();
        console.log('The link was clicked to go to fitbit');
        const promise = axios.get('http://localhost:8080/authorize')
        promise.then((result)=>{
            console.log('succes!')
            console.log(result)
            // this.setState({
                
            // })
        })

        promise.catch( (error)=>{
            console.log('error!')
            console.log(error)
        })
    }


    componentDidMount(){
        
        const promise = axios.get('http://localhost:8080/passtothefront')
        promise.then((result)=>{
            console.log('succes!')
            // this.setState({
                
            // })
        })

        promise.catch( (error)=>{
            console.log('error!')
            console.log(error)
        })
    }

    render(){
        return(
            <div>
                <h3><p href onClick={this.handleClickForFitBit}>Click </p> to pull data from FitBit WebSite!</h3>
            </div>
        )}
    }

export default main;