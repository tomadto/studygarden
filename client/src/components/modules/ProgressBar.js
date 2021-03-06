import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../pages/StudyPage.css";
class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  hr(time){
    const out = time === 1 ? "hour" : "hours"
    return out
  }

  minutes(time){
    const out = time === 1 ? "minute" : "minutes"
    return out
  }

  render() {
    const width =
      this.props.studyTimeCumul >= this.props.goalTime
        ? "100%"
        : "" + (this.props.studyTimeCumul * 100) / this.props.goalTime + "%";
    const style = {
      width: width,
    };
    let number;
    if (Math.floor(10*(this.props.studyTimeCumul/(60**2)))/10 < this.props.goalTime/(60**2)){
      number = "time studied: " + String(Math.floor((this.props.studyTimeCumul/(60**2)))) + " " + //num hours
      this.hr(Math.floor((this.props.studyTimeCumul/(60**2)))) + //"hours" or "hour"
      " and " + 
      String(Math.floor(this.props.studyTimeCumul/60-60*Math.floor((this.props.studyTimeCumul/(60**2))))) + //num minutes
      " "+
      this.minutes(Math.floor(this.props.studyTimeCumul/60-60*Math.floor((this.props.studyTimeCumul/(60**2))))) + // "minutes" or "minute"
      " | goal: "+ 
      String(this.props.goalTime/(60**2)) +" "+ //goal num hours
      String(this.hr(this.props.goalTime/(60**2))) //"hours" or "hour"
    } else {
      number = String(this.props.goalTime/(60**2)) +" hour goal reached";
    }
    //  console.log(width);
    //console.log(style);
    return (
      <div className="ProgressBar-container">
        <div className="ProgressBar" style={style}>
          <div className="ProgressBar-studyTime"/>
        </div>
        <div className="ProgressBar-top"/>
        <div className="ProgressBar-goal">{number /*{(Math.round(10*(this.props.studyTimeCumul/(60**2)))/10} out of {this.props.goalTime/(60**2)} {this.hr(this.props.goalTime/(60**2))}*/}</div>
      </div>
    );
  }
}

export default ProgressBar;
