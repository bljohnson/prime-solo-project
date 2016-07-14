#Prime Solo Project: Search & Rescue - A Dog Adoption Aid

###Application Overview

Search & Rescue is a full stack (MEAN stack) Javascript-based application that allows users to find adoptable dogs based on search criteria they provide, including but not limited to age, breed, energy level, good with children, and etc. This application utilizes the Rescue Groups API, and the data pulled is intentionally scoped to adoptable dogs from shelters and rescues as a means of advocating for adoption and rescue. The data pulled for each dog will also include contact information for the shelter/rescue when available (e.g. link to their website), so the user has the ability to contact them directly regarding adoption. Passport local authentication will be implemented to enable multiple users to have unique profiles, search criteria, and Favorites lists.

Once a search has been initiated, the resulting data is displayed on the screen one dog at a time using the AngularJS directives ng-repeat and ng-show. This initial, basic view only lists basic information about the dog (name, age, and breed) as well as an image. At this point, the user can click on the "More" button at the bottom of the container to open a modal with more details about the dog (e.g. house trained, adoption fee, a full biography if available, additional images if available, and etc). In both the basic and modal views, the user will have the option to click a button to bypass the dog, or another button to save it to their Favorites list. They must click either button in order to advance to the next dog in their search results. Clicking the ‘pass’ button removes the dog from the search results and allows the user to view the next dog in their search results. If the user clicks the 'like' button, the dog will be removed from the search results, and all the detailed information from the dog’s modal view will be saved to the user's Favorites list. The dogs in the Favorites list will be stored in a database using MongoDB, so the user has the ability to go back and reference them later.

###Installation

You will need to install the following after completing "npm init".

npm install express express-session body-parser mongoose angular angular-ui-router bootstrap passport passport-local bcrypt angular-material angular-material-icons angular-ui-bootstrap --save
