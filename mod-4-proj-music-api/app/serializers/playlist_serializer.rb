class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :spotify_id
end
