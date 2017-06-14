import React, { Component } from "react";
import App from "./App";

import "./Background.css";

class Background extends Component {
  render() {
    return (
      <div className="Background">
        <video
          id="my-video"
          autoPlay={true}
          loop="loop"
          muted=""
          width="300"
          height="150"
        >
          <source src="videoplayback.mp4" type="video/mp4" />
        </video>
        <App />
      </div>
    );
  }
}

export default Background;
