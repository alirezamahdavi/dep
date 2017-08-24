import React, {Component} from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';


import '../CSSFiles/App.css';
////////////////////////////////////////////

class fit extends Component {

    constructor() {
        super();

        this.handleClickForFitBit=this.handleClickForFitBit.bind(this);
    }
    handleClickForFitBit(e) {
        e.preventDefault();
        console.log('The link was clicked to go to fitbit');
        const promise = axios.get('http://localhost:8080/authorize')
        promise.then((result)=>{
            console.log('succes!', result)
            window.location = result.data;
            // this.setState({
                
            // })
        })
        promise.catch( (error)=>{
            console.log('error!')
            console.log(error)
        })
    }
    render(){
        let Date;
        return(
            <div className='cssforfitbit'>
                <div className='deep'>
                    <h3 className='h3class'>Welcome!</h3>
                    <h3>Here some fun fatcts about FitBit:</h3>
                    <p>Fitbit (NYSE: <a rel="nofollow" class="external text" href="https://www.nyse.com/quote/XNYS:FIT" target="_blank">FIT</a>) is an American company headquartered in San Francisco, California, known for its products of the same name, which are activity trackers, wireless-enabled wearable technology devices that measure data such as the number of steps walked, heart rate, quality of sleep, steps climbed, and other personal metrics involved in fitness.</p>
                    <span>We are going to pull your data from FitBit database</span>
                    <span className="fitbitspan"></span>
                    <h4> <button onClick={this.handleClickForFitBit} className="btn btn-warning">Click</button> to start processing!</h4>
                </div>
            </div>
        )}
    }

export default fit;