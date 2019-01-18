class Api::V1::PlaylistsController < ApplicationController

  def index
    @playlists = Playlist.all
    render json: @playlists
  end

  def show
  end

  def create
    # see if this track exists in the db
    track = Track.find_by(spotify_id: params[:spotify_track_id])
    unless track
      # find the spotify song from the api
      s_track = RSpotify::Track.find(params[:spotify_track_id])
      # create a new track
      track = Track.create_from_spotify_track(s_track)
    end

    @playlist = Playlist.create(
      name: params[:name],
      user_id: params[:user_id],
      track_id: track.id
    )
    render json: @playlist
  end

  def update
    @playlist.update(playlist_params)
    render json: @playlist
  end

  def destroy
    @playlists = Playlist.all
    @playlist.destroy
    render json: @playlists
  end

  private
  def find_playlist
    @playlist = Playlist.find(params[:id])
  end

  def playlist_params
    params.permit(:name, :user_id, :spotify_track_id)
  end
end
