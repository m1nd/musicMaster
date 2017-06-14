import React, { Component } from "react";
import "./App.css";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import Profile from "./Profile";
import Gallery from "./Gallery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null,
      tracks: []
    };
  }
  // https://developer.spotify.com/web-api/console/get-search-item/
  search() {
    console.log(this.state);
    const BASE_URL = "https://api.spotify.com/v1/search?";
    const ALBUM_URL = "https://api.spotify.com/v1/artists/";
    const accessToken =
      "BQAbNEpCSM2FUdf50LxN4xe-JtVoRjrGpbYiaRvj2TQ5PtfvpAnBiuLXtUpmmLWEMlW442n-qb7TSMPBINSdarJFAWEGBmbE-xZzq5WezA__-br0Frsnwp-xGhUSd7i161cdp3TZlijp3N32RlvC6mi5zfHH7K0";
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;

    fetch(FETCH_URL, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken }
    })
      .then(resp => resp.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({ artist });
        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
        fetch(FETCH_URL, {
          method: "GET",
          headers: { Authorization: "Bearer " + accessToken }
        })
          .then(resp => resp.json())
          .then(json => {
            console.log(json);
            const { tracks } = json;
            this.setState({ tracks });
          });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => {
                this.setState({ query: event.target.value });
              }}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.search();
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {this.state.artist !== null
          ? <div>
              <Profile artist={this.state.artist} />
              <Gallery tracks={this.state.tracks} />
            </div>
          : <div />}
      </div>
    );
  }
}

export default App;
