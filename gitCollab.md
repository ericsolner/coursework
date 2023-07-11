# Git Collaboration

## Nominate a GitHub Repo Owner
* Create a repo
* Add Setup collaborators (Settings > Collaboration)
* Restrict the master branch (Settings > Branches)

## All Collaborators
* Accept collaboration
* Clone the repo locally
* Each user to create a branch via the github UI named: feature/YOUR_FEATURE_NAME (as an example)
* From the terminal do: git pull
* Go into the newly created branch: git checkout <branch name>
* Assign a user to create a file (index.html, styles.css, app.js)
* Commit your changes
* git push origin feature/YOUR_FEATURE_NAME
* Each individual contributer create a pull-request
* Repo owner responsible for merging the pull-request

## NOTES
* Don't re-use branches!
* Test branches before merging