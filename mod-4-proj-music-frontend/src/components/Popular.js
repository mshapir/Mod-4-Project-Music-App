<<<<<<< HEAD
import React from 'react';

class Popular extends React.Component {
  render(){
    return(
      <div className="card">
        <div className="card-body">
        <h1>Top Hits</h1>
        <img className="card-img-top cover-pic" src={this.props.image} alt="" />
        <h3 className="card-title">{this.props.name}</h3>
        <h4 className="card-text">{this.props.artist}</h4>
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
=======
import React from 'react'

class Popular extends React.Component {

  render() {
    console.log('Pop', this.props);
    return (
      <div> {this.props.topHits.map(song => {
        return (<div>
          <h4>Song: {song.name}</h4>
          <h5>Artist: {song.artists}</h5> 
          </div>)
      })}</div>
    )
  }
}

>>>>>>> Manny-Shapir
export default Popular;
