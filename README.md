<h1><a href="https://uiuccrimemap.herokuapp.com/"> UIUC Crime Map</a> </h1>
<h2>Introduction</h2>
The goal of our project is to create a simple web application that displays crimes recorded on the <a href="https://police.illinois.edu/crime-reporting/daily-crime-log/">UIUC Daily Crime Log</a>. Our goal is to provide members of the UIUC community with an easy way to identify areas where crimes are occuring so they can avoid them. We were initially inspired to do this because of the rise of Asian Hate Crimes occuring in neighborhoods we thought were safe. We wanted a way to bring awareness and promote safety to our communities and this seemed like the best way to do so.<br>
<br>
<h2>Design Process</h2>
In our project we used React.js to create a front end and display a map with leaftlet and react-leaflet. For our backend we used the Express.js package, and for our database we used MongoDB Atlas. For decrypting the pdf, we are using tabula in python, as well as Geocoding in order to convert street addresses to latitude and longitude coordinates for the front-end. Finally we are using pymongo to connect our python program with the MongoDB Atlas database.<br>
<br>
<h2>Features</h2>
As of now our features are pretty barebone, we have a <a href="https://uiuccrimemap.herokuapp.com/">homepage</a> and an <a href="https://uiuccrimemap.herokuapp.com//about">about section</a>. As the weekend continues we want to add more features, such as color coding markers by crime type or by date. One ambitious goal we have is allowing users to report crimes that will be added to the database.<br>
<br>
<h2>How to Run</h2>

<h3>Frontend (Client)</h3>
<br>

<h3>Backend (API)</h3>
<code>
yarn // to install dependencies in package.json <br>
yarn start // starts the backend server (no need to open this in a browser)  <br>
</code>
<br>
<code>
cd mapclient <br>
yarn // to install dependencies in package.json  <br>
yarn start // starts the frontend in a browser  <br>
</code>

