#Prime Solo Project: Search & Rescue - A Dog Adoption Aid

###Application Overview

Search & Rescue is a full stack (MEAN stack) Javascript-based application that allows users to find adoptable dogs based on search criteria they provide, including but not limited to age, breed, energy level, good with children, and etc. This application utilizes the Rescue Groups API, and the data pulled is intentionally scoped to adoptable dogs from shelters and rescues as a means of advocating for adoption and rescue. The data pulled for each dog will also include contact information for the shelter/rescue when available (e.g. link to their website), so the user has the ability to contact them directly regarding adoption.

Once a search has been initiated, the resulting data is displayed on the screen in stripped down format. At this point, the user can click on the middle button at the bottom of the container to expand it for more details about the dog (e.g. house trained, adoption fee, a full biography if available, and etc). They can also click the button of the left that indicates lack of interest in that dog, removing it from the screen. If the user clicks the button on the right, this dog's information will be saved to the user's Favorites list. The dogs in the Favorites list will be stored in a database using MongoDB, so the user has the ability to go back and reference them later.

###Installation

You will need to install the following after completing "npm init". Copy and paste this line.

npm install express body-parser mongoose angular angular-ui-router bootstrap angular-material angular-material-icons angular-ui-bootstrap angular-sanitize --save

###Future Version Updates:
*Passport local authentication to enable multiple users to have unique search criteria and Favorites lists (will need to npm install express-session, passport, passport-local, and bcrypt in addition to the above requirements)
*Update to display one dog at a time from search results, requiring user to click Remove button or Favorite button before next dog is displayed
*Expand to other species
*Expand search criteria options
