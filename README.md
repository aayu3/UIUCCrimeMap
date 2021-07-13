<h1><a href="https://uiuccrimemap.herokuapp.com/"> UIUC Crime Map</a> </h1>
<h2>Introduction</h2>
The goal of our project is to create a simple web application that displays crimes recorded on the <a href="https://police.illinois.edu/crime-reporting/daily-crime-log/">University Police Daily Crime Log</a>. Our goal is to provide members of the UIUC community with an easy way to identify areas where crimes are occuring so they can be avoided. We were initially inspired to do this because of the rise in Asian Hate Crimes occuring in neighborhoods we thought were safe. We wanted a way to bring awareness and promote safety in our communities and this seemed like the best way to do so.<br>
<br>
<h2>Design Process</h2>
In our project we used <code>react.js</code> to create a front end and display a map with <code>leaftlet.js</code> and <code>react-leaflet.js</code>. For our backend we used the <code>express.js</code> package, and for our database we used MongoDB Atlas. To fetch the pdf we use <code>selenium</code> and <code>beautifulsoup4</code>. For decrypting the pdf, we are using <code>tabula.py</code> in python, as well as Geocoding with the Google Maps API in order to convert street addresses to latitude and longitude for the front-end. Finally we are using <code>pymongo</code> to connect our python program with the MongoDB Atlas database.<br>
<br>
<h2>Features</h2>
As of now our features include a homepage with a map displaying markers with popups showing crime info. We also have a legend describing what each color of marker refers to and linking to maps that only have those markers displayed. We have a Time of Day Slider that can be used to see crimes withing a certain time range and a Crime Threshold Slider that can be used to set a custom date range the colors of the markers. We also have a brief description of the project on our about page as well as introductions to each of the team members on our team page.
<br>
<h2>How to Run</h2>
<h3>Backend (API)</h3>
<code>
yarn // to install dependencies in package.json </code><br>
<code>
yarn start // starts the backend server (no need to open this in a browser)  <br>
</code>

<h3>Frontend (Client)</h3>
Open a new terminal to make sure your backend is still running. <br>
<code>
cd mapclient </code><br>
<code>
yarn // to install dependencies in package.json  </code><br>
  <code>
yarn start // starts the frontend in a browser 
</code>





