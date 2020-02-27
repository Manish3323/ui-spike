import * as React from "react";
import { LocationApi } from "./api";

const locationApi = new LocationApi("localhost", 7654);

export class Locations extends React.Component {
  async componentDidMount() {
    let locations = await locationApi.list();
    this.onReceiveData(locations);
  }

  onReceiveData(locations: any) {
    alert(locations);
  }

  render() {
    return <h1> hello </h1>;
  }
}
