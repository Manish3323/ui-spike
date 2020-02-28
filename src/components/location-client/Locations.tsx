import * as React from "react";
import { LocationApi } from "./api";

const locationApi = new LocationApi("localhost", 7654);

export class Locations extends React.Component {
  state = {
    locations: new Array()
  };
  async componentDidMount() {
    let locations = await locationApi.list();
    this.setState({
      locations
    });
  }

  render() {
    return (
      <div>
        <h1> Locations </h1>
        <div>
          <ul>
            {this.state.locations.map(loc => (
              <li id={loc.prefix}>{loc.prefix}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
