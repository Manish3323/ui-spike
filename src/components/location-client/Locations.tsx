import * as React from "react";
import { LocationApi } from "./api";
import { TypedLocation } from "./types/Location";
const locationApi = new LocationApi("localhost", 7654);

export class Locations extends React.Component {
  state = {
    locations: new Array()
  };
  async componentDidMount() {
    let locations: Array<TypedLocation>  = await locationApi.list();
    this.setState({locations});
  }

  render() {
    return (
      <div>
        <h1> Locations </h1>
        <div>
          <ul>
            {!!this.state.locations && this.state.locations.length > 0 && this.state.locations.map(loc => (
              <li key={loc.connection.prefix}>{loc.connection.prefix}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
