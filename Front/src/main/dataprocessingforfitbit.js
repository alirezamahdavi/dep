import React, {Component} from 'react';
import axios from 'axios';
/////////////////
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
///////////////////////////////////////
import '../CSSFiles/App.css';
//////////////////////////////////////////////

class dataproc extends Component{
    constructor() {
        super();
        this.state = {
            profile : {},
            sleepGoal : {},
            weigth : {},
            foodGoal : {},
            hear :{},
            success : false,
            open : false,
            openforpopover : false,
            anchorEl : false
        }
    }

    afterLoading (){
        return(
        <div className='displayinfo'>
            {console.log(this.state)}
            <MuiThemeProvider>
            <div className='dataproc'>
                <RaisedButton label="Click to see your profile data" onClick={this.handleToggle}/>
                <Drawer open={this.state.open}>
                    <MenuItem>Average daily steps: {this.state.profile.averageDailySteps}</MenuItem>
                    <MenuItem>Total distance walked:{this.state.profile.topBadges[1].value}</MenuItem>
                    <MenuItem>User since: {this.state.profile.memberSince}</MenuItem>
                    <MenuItem><p>Times walked passed 20K steps<br/> 
                    in one day : {this.state.profile.topBadges[0].timesAchieved}</p></MenuItem>
                </Drawer>
                <p></p>
                <RaisedButton onClick={this.handleTouchTap} label="Click to see Sleep data"/>
                <Popover open={this.state.openforpopover}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}>
                        <Menu>
                            <MenuItem primaryText={"Typical WakeUp Time: " + this.state.sleepGoal.consistency.typicalWakeupTime } />
                            <MenuItem primaryText={"Recommended sleep(hour): " + this.state.sleepGoal.consistency.recommendedSleepGoal/60 } />
                            <MenuItem primaryText={"Average Sleep Time: " + Math.floor(this.state.sleepGoal.consistency.typicalDuration/60) } />
                        </Menu>
                </Popover>
            </div>
            </MuiThemeProvider>
        </div>
        )
    }
    componentDidMount (){
        //////////////////&&&&&&&&&&&&&&&&&&&&&&&/////////////////////////
        axios.get('/passed?code='+ this.props.location.query.code).then(res=>{
        //console.log(res);
        //console.log(res.data)
        this.setState({
			success : true, profile : res.data.profile.user, sleepGoal : res.data.sleepGoal, weigth : res.data.weight, foodGoal : res.data.foodGoal, heart :res.data.heart 
		})
        })
    }
    handleToggle = () => this.setState({open: !this.state.open});
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
          openforpopover: true,
          anchorEl: event.currentTarget,
        });
      };

      handleRequestClose = () => {
        this.setState({
          openforpopover: false,
        });
      };
////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
    render(){
        let myRenderedHtml;
        if (!this.state.success) {
            myRenderedHtml = 'Your data is being porcessed!'
        } else if (this.state.success) {
            myRenderedHtml = this.afterLoading();
        }
        return(
            <div className='maindataproc'>
              { myRenderedHtml }
            </div>
        )
    };
};
export default dataproc;