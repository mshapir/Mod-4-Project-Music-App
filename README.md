# Mod-4-Project-Music-App
Instructions:
Welcome to our Music App Mod-4 project, a single page web application that allows you to search songs using a Spotify Api and add your favorites to your playlist.
This version allows you to create, edit, and delete your user, but at the moment you cannot save your playlist to the database.

Instructions for use:

1. Fork and clone this repo.
2. In your terminal, within the directory you saved it in, enter: `cd Mod-4-Project-Music-App`
3. Then: `cd mod-4-proj-music-api`
4. Enter: `atom .` or your code editor of choice
5. You are now in the rails API file
6. In config/initializers/spotify_setup.rb add your `RSpotify::authenticate(<client_id>, <client_secrete>)`
7. Here in your terminal, because this is running on Postgres you need to run `rails db:create` and then `rails db:migrate`
8. Run `rails s -p 3001` to start the server (this will run the api on localhost:3001)
9. Switch to the frontend by typing `cd ..` and then `cd mod-4-proj-music-frontend`
10. Run `yarn install` then `yarn start` (this will run on localhost:3000)
Thank you for checking out our project! Have fun!
