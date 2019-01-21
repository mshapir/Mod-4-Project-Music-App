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

export default Popular;
