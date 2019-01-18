class Api::V1::TracksController < ApplicationController
  def index
    s_tracks = RSpotify::Track.search(params[:q])

    @tracks = s_tracks.map do |s_track|
      Track.new(name: s_track.name, artists: s_track.artists, image: s_track.image, duration: s_track.duration_ms, popularity: s_track.popularity, preview: s_track.preview_url)
    end

    render json: @tracks
  end
end
