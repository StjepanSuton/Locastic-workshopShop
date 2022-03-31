# LOCASTIC TINEL ZADATAK

### About
A small workshop shop with an option to purchase workshops and view details of a single workshop

There are two branches:
The master branch strictly only usses what is required by the task and follows the design,
and the additional-features branch adds a few of my ideas:
- Added a scroll to top button at the bottom of the gallery after scrolling Y-axis 300px.
- Added a cart quantity counter in the notification badge in tablet and mobile viewport.
- Added a toast notification if a user tries to add more than 99 of a single workshop with a info message.
- Added support for local storage for the cart so when a user vists the page again or reloads the page cart state is not lost

### Deployment

master branch deployment:
https://locastic-default.web.app/workshop

additional-features branch deployment:
https://locas-de21f.web.app/workshop

### How to run on a local machine

Clone the app run npm i.
After all the dependecies have been installed open a second terminal and run json-server --watch db.json
On your initial terminal run npm start


