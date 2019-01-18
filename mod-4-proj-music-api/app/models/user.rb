class User < ApplicationRecord
  has_many :playlists
  has_many :tracks, through: :playlists
end
