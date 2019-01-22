import React from 'react';
import Popular from './Popular'

class PopTrack extends React.Component {


  render() {

    return(
      <div className="container">
        {this.props.topHits.map(track => (
          <Popular
            key={track.name}
            name={track.name}
            artist={track.artists}
            image={track.image}
            popularity={track.popularity}
            preview={track.preview}
            duration={track.duration}
            spotify_id={track.spotify_id}
            addToPlaylist={this.props.addToPlaylist}
          />
        ))}
      </div>
    )
  }
}
export default PopTrack;
