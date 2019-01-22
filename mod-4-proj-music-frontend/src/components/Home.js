import React from 'react';
import Search from './Search'
import SearchedSongs from './SearchedSongs'
import Loading from './Loading'

class Home extends React.Component{

  render(){
    return(
      <div className="home">
      <h1>Home</h1>

      {this.props.login ? (
        <div className="container">
        <h2>Search For Your Favorite Song:</h2>
        <Search fetchSearchedSongs={this.props.fetchSearchedSongs} />
        {this.props.searchedSongs.length === 0 && this.props.loading ? (<Loading />) :
        this.props.searchedSongs.map((track, i) => (
          <SearchedSongs
            key={i}
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
    ) : (<h2>Welcome to Music App! Please Log in!</h2>)
  }

      </div>
    )
  }
}
export default Home;
