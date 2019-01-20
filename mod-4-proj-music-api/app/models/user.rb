require 'bcrypt'
class User < ApplicationRecord
  has_many :playlists
  has_many :tracks, through: :playlists
  has_secure_password
  validates :username, uniqueness: { case_sensitive: false }
  validates :name, :username, :password_digest, presence: :true
end
