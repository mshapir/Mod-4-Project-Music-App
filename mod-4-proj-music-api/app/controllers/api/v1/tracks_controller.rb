class Api::V1::TracksController < ApplicationController
  def index
    @tracks = Track.all

    render json: @tracks
  end

  def top_100
    # top 100 playlist for 2019 tracks
    # https://open.spotify.com/playlist/2kpoUUJ5a4Cw3feTkFJhZ2
    s_tracks = RSpotify::Playlist.find("1276640268","2kpoUUJ5a4Cw3feTkFJhZ2").tracks
    @tracks = s_tracks.map do |s_track|
      Track.new(
        name: s_track.name,
        artists: s_track.artists,
        image: s_track.album.images[0],
        duration: s_track.duration_ms,
        popularity: s_track.popularity,
        preview: s_track.preview_url
      )
    end

    render json: @tracks
  end

  def random
    # random playlist from spotify's featured playlists endpoint's tracks
    s_tracks = RSpotify::Playlist.browse_featured.first.tracks
    @tracks = s_tracks.map do |s_track|
      Track.new(
        name: s_track.name,
        artists: s_track.artists,
        image: s_track.album.images[0],
        duration: s_track.duration_ms,
        popularity: s_track.popularity,
        preview: s_track.preview_url
      )
    end

    render json: @tracks
  end

  def search
    s_tracks = RSpotify::Track.search(params[:q])
    @tracks = s_tracks.map do |s_track|
      Track.new(
        name: s_track.name,
        artists: s_track.artists,
        image: s_track.album.images[0],
        duration: s_track.duration_ms,
        popularity: s_track.popularity,
        preview: s_track.preview_url
      )
    end

    render json: @tracks
  end
end
