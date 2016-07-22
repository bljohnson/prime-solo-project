#Prime Solo Project: Search & Rescue - A Dog Adoption Aid

###Application Overview

Search & Rescue is a full stack (MEAN stack) Javascript-based web application that allows users to find adoptable dogs based on search criteria they provide, including but not limited to age, breed, energy level, and etc. This application utilizes the Rescue Groups API, and the data pulled is intentionally scoped to adoptable dogs from shelters and rescues only as a means of advocating for adoption and rescue. The data pulled for each dog will also include contact information for the shelter/rescue when available (e.g. link to their website), so the user has the ability to contact them directly regarding adoption.

Once the user has entered their search criteria and a search has been initiated, the resulting data is displayed on the screen in stripped down format. At this point, the user can click on the middle Description button for any given dog to open a modal with more details about the dog (e.g. house trained, adoption fee, a full biography if available, and etc). They can also click the Remove button to indicate lack of interest in that dog, removing it from their search results. If the user clicks the Favorite button, that dog's information will be saved to the user's Favorites list. The dogs in the Favorites list will be stored in a database using MongoDB, so the user has the ability to go back and reference them later. The user can also delete dogs from their list.

###Technologies Used
* MongoDB & mongoose
* Express.js
* AngularJS & Angular Material
* Node.js
* Git
* Bootstrap & UI Bootstrap
* Heroku

###Installation

You will need to install the following after completing "npm init". Copy and paste the following line.

npm install express body-parser mongoose angular angular-ui-router bootstrap angular-material angular-material-icons angular-ui-bootstrap angular-sanitize --save

###Future Version Updates:
* Implement Passport local authentication to enable multiple users, so each can have unique search criteria and Favorites lists (will need to npm install express-session, passport, passport-local, and bcrypt in addition to the above requirements)
* Display only one dog at a time from search results and require user to click Remove button or Favorite button before next dog is displayed
* Expand to include other species from Rescue Groups API
* Expand search criteria options
* If dog has multiple photos in API, display all
* Mobile support and swipe capabilities for Remove and Favorite buttons in search results
