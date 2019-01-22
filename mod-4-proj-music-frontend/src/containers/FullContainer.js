import React from 'react';
import User from '../components/User';
import Popular from '../components/Popular'
import Search from '../components/Search'
import Loading from '../components/Loading'

class FullContainer extends React.Component {

  state={
    topHits: [],
    userList: [],
    searched: []
  }

  fetchSearchedSongs = (query = 'thank you') => {
		fetch(`http://localhost:3000/api/v1/tracks/search?q=${query}`)
		.then(r => r.json())
		.then(data => {
			this.setState({
				topHits: data
			})
		})
	}

  render() {
    return this.state.topHits.length > 0  ?
    (<div><Search fetchSongs={this.fetchSearchedSongs}/>
    <Popular topHits={this.state.topHits}/></div>)
    :
    (
      <div>
        <Loading />

      </div>
    )
  }
}
export default FullContainer;
