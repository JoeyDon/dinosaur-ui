import React from "react";
import "./InputTable.scss";
import axios from "axios";
import { API_PUT } from "../settings/api";

class InputTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number_of_eggs: 0,
      sequence: "#",
      rotation_amount: 0,
      inputValidated: false,
      errorMessage: ""
    };

    this.eggsChange = this.eggsChange.bind(this);
    this.rotationsChange = this.rotationsChange.bind(this);
    this.sequenceChange = this.sequenceChange.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  eggsChange(event) {
    this.setState({ number_of_eggs: event.target.value });
  }
  rotationsChange(event) {
    this.setState({ rotation_amount: event.target.value });
  }
  sequenceChange(event) {
    this.setState({ sequence: event.target.value });
  }

  validateSequence() {
    let result = true;
    for (let i = 0; i < this.state.sequence.length; i++) {
      // Every first char is a digit?
      if (i % 2 === 0) {
        if (!/^[0-9]$/.test(this.state.sequence[i])) {
          console.log(i);
          result = false;
        }
      } else {
        // Every second char is a space?
        if (this.state.sequence[i] !== " ") {
          console.log(i);
          result = false;
        }
      }
    }

    return result;
  }

  saveSettings() {
    // Reset
    this.setState({
      errorMessage: "",
      inputValidated: false
    });

    // Validate numbers of eggs
    if (this.state.number_of_eggs > 20 || this.state.number_of_eggs < 1) {
      this.setState({
        errorMessage:
          "Invalid input: Number of eggs must be in the range of 0 - 20."
      });
      return;
    }

    // Validate rotation amout
    if (this.state.rotation_amount < 1 || this.state.rotation_amount > 100) {
      this.setState({
        errorMessage:
          "Invalid input: Rotation amount must be in the range of 0 - 100%."
      });
      return;
    }

    // Validate sequence
    let sequenceValidated = this.validateSequence();
    if (!sequenceValidated) {
      this.setState({
        errorMessage:
          "Invalid input: Sequence has to be in format of '1 3 2 4 5 7 4', digit space digit"
      });
      return;
    }

    this.sendPutRequest();
  }

  sendPutRequest() {
    axios
      .put(
        `${API_PUT}?eggCounts=${this.state.number_of_eggs}
      &rotatePercent=${this.state.rotation_amount / 100}
      &sequence=${this.state.sequence}
      `
      )
      .then(result => {
        console.log(result);

        // Update local state
        this.setState({
          inputValidated: true
        });
      })
      .catch(error => {
        this.setState({
          errorMessage: "Failed in submitting. Check internet connections."
        });
      });
  }

  render() {
    const { errorMessage } = this.state;
    const { lanuchRun } = this.props;

    return (
      <div>
        <h1>{errorMessage}</h1>
        <h1>
          {this.state.inputValidated &&
            "Successfully Saved, now you can run it."}
        </h1>
        <div>
          <h2> Number of eggs </h2>
          <input
            type="number"
            className="textfield"
            onChange={this.eggsChange}
          />
        </div>
        <div>
          <h2> Rotation amount </h2>
          <input
            type="number"
            className="textfield"
            onChange={this.rotationsChange}
          />
          %
        </div>
        <div>
          <h2> Sequence </h2>
          <input
            type="text"
            className="textarea"
            onChange={this.sequenceChange}
          />
        </div>
        <div>
          <button className="btn" onClick={this.saveSettings}>
            Save
          </button>
        </div>
        <div>
          {this.state.inputValidated && (
            <button className="btn" onClick={lanuchRun}>
              Run
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default InputTable;
