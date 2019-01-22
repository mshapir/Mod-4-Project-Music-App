import React from 'react';
import PlaylistForm from './PlaylistForm'


class Playlist extends React.Component {

  render() {
    console.log(this.props.playlist)
    return(
      <div>
        <h1>My Playlist</h1>
        {this.props.playlist.map(track=> (
          <div className="card">
            <div className="card-body">
              <img className="card-img-top cover-pic" src={track.image} alt="" />
              <h3 className="card-title">{track.name}</h3>
              <h4 className="card-text">{track.artist}</h4>
              <p>Preview:</p>
              {track.preview !== null ?
                <audio
                  ref="audio_tag"
                  src={track.preview}
                  controls
                /> :
                  <p>No preview available</p>
              }
              <br/><button type="button" className="btn btn-danger" onClick={()=>this.props.removeSong(track)}>Remove Song</button>
          </div>
        </div>
        ))}
      </div>
    )
  }

}
export default Playlist;
