import React from 'react';


class PlaylistForm extends React.Component {

  state = {
    name: "",
    userId: ""
  }

  changeHandler = (e) => {
    let userId = this.props.userInfo.id
    this.setState({
      name: e.target.value,
      userId: userId
    })
  }


  render() {
    return(
      <form onSubmit={(e) => this.props.submitPlaylistHandler(e, this.state)}>
        <h4>Create New Playlist </h4>
        <input type="text" placeholder="Playlist Name" onChange={this.changeHandler} value={this.state.playlistName} />
        <input type="hidden" value={this.state.userId} />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
export default PlaylistForm;
