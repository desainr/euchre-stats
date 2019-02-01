# euchre-stats

## Outline
A simple score keeping app custom build for Euchre. Built with Ionic and using Firebase, this cross platform app allows a group of friends to keep a complete history of their euchre games, check up on standings, and view detailed info on their personal performance.


## Features List
*Italicized* features are not done or are WIP

**Bold** are components 
<hr/>

* Login Page/Auth
  * Login with Facebook authentication
  * Automatic login

* Game Log Tab
  * List of game summaries in order of most recent. Loads 10 initially, scroll down to load more.
  * Add new game
    * **Game Form** where user can enter a new game with pre-loaded Player names, the score, and notes
    * Saves GPS location of game
  * *Click on game (or button in game component) in list to view **Game Detail** such as location on a map, notes, and location notes*
    * *Click on player to view **Profile***
  * *Current users games are highlighted*
    
* Standings Tab
  * *Three subtabs, one for individual player standings, one for wildcard standings, one for team standings)*
  * Individual tab shows a table of each player with their wins, losses, and win percentage. Ordered by win percentage
    * *Click on player to view their **Profile***
  * *Wildcard standings show only players declared Wildcard in **Game Form***
  * *Team standings show top performing pairs of players, ordered by win percentage*

* *Individual Tab (profile page)*
  * *Shows personal info on the logged in user when clicked from tabs page*
  * *Shows info on selected user if clicked from **Game Detail***
  * *Displays record in last 10 games*
  * *Shows Win Percentage over time*
  * *Shows map of locations where user has played games*
  * *Shows top partners*
  
  
## Future Development
Currently, there is no way to add new users (done intentionally), and some manual manipulation of firebase is required.
Eventually I want to have this app be able to stand alone. A new user would sign up and then could create a "group" of friends, 
their friends could sign up and the original user could add them to the group, and the app would load information specific to that group. 
Could be used for leagues and such. 

This app has not been tested *at all* on Android devices. I have no idea if it will work or what it will look like. 

Other more "advanced" or additional ideas
* Have the app send notifications to a user when a new game is logged that included them as a player.
  
  
