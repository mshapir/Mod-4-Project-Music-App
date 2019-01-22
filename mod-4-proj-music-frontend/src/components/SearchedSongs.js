import React from 'react';

class SearchedSongs extends React.Component {
  render(){
    return(
      <div className="card">
        <div className="card-body">
        <img className="card-img-top cover-pic" src={this.props.image} alt="" />
        <h3 className="card-title">{this.props.name}</h3>
        <h4 className="card-text">{this.props.artist}</h4>
        <button onClick={()=>this.props.addToPlaylist(this.props)} type="button" className="btn btn-info">Add to My Playlist</button>
        <p>Preview:</p>
        {this.props.preview !== null ?
          <audio
            ref="audio_tag"
            src={this.props.preview}
            controls
          /> :
            <p>No preview available</p>
        }
        </div>
      </div>
    )
  }
}
export default SearchedSongs;
