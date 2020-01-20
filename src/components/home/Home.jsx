import React from "react";
import ResultTable from "../table/ResultTable";
import InputTable from "../table/InputTable";
import axios from "axios";
import { API_GET } from "../settings/api";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reportData: {},
      isLoaded: false,
      isLaunched: false
    };

    this.lanuchRun = this.lanuchRun.bind(this);
  }

  lanuchRun(event) {
    axios
      .get(API_GET)
      .then(result => {
        console.log(result);
        this.setState({ reportData: result.data, isLaunched: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    // Initial API call
    console.log("api call in mount");

    // Check internet, or pass initial value to input, or extra 'Current Setting' components
    axios.get(API_GET).then(result => {
      console.log(result);
      this.setState({ reportData: result.data, isLoaded: true });
    });
  }

  render() {
    const { reportData, isLaunched, isLoaded } = this.state;
    console.log(reportData);
    return (
      <React.Fragment>
        {isLoaded ? (
          isLaunched ? (
            <ResultTable reportData={reportData}></ResultTable>
          ) : (
            <InputTable lanuchRun={this.lanuchRun}></InputTable>
          )
        ) : (
          "Fetching Data..."
        )}
      </React.Fragment>
    );
  }
}

export default Home;
