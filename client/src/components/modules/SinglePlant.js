import React, { Component } from "react";
import { Link } from "react-router-dom";
import { post } from "../../utilities";
import "./SinglePlant.css";
import { PLANT_STAGES } from "./PlantStages.js";

/**
 *
 * Proptypes
 * @param {string} _id of the plant
 * @param {string} plantName
 * @param {string} creator_id
 * @param {number} plantType
 * @param {number} stage
 */

class SinglePlant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteText: "delete",
    };
    this.deletePlant = this.deletePlant.bind(this);
  }

  async deletePlant() {
    if (this.state.deleteText === "delete") {
      this.setState({ deleteText: "confirm?" });
      setTimeout(() => {
        if (this.state.deleteText !== "deleting...") {
          this.setState({ deleteText: "delete" });
        }
      }, 3000);
    } else if (this.state.deleteText === "confirm?") {
      this.setState({ deleteText: "deleting..." });
      await post(`/api/plant/delete`, { plantId: this.props._id });
      //console.log(this.props._id);
      window.location.reload();
    }
  }

  render() {
    //console.log(PLANT_STAGES);
    const plantComplete = this.props.stage == 4;
    return (
      <div className="SinglePlant-plantContainer">
        <div className="btn btn-primary tooltip">
          <Link to={`/home/${this.props.userId}/study/${this.props._id}`}>
            <img
              className={plantComplete ? `SinglePlant-plantGreen` : `SinglePlant-plant u-no-select`}
              src={PLANT_STAGES[this.props.stage][this.props.plantType]}
            />
          </Link>
          <div className="bottom">
            <h3>{this.props.subject}</h3>
            <p>{this.props.plantName}</p>
            {plantComplete && <p className="bottom-grown">fully grown!</p>}
            <div className="SinglePlant-buttonContainer">
              <div>
                <button className="cancelButton studyButton u-pointer" onClick={this.deletePlant}>
                  {this.state.deleteText}
                </button>
              </div>
            </div>
            <i />
          </div>
        </div>
      </div>
    );
  }
}

export default SinglePlant;
