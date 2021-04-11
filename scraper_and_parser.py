import tabula
import googlemaps
import pandas as pd
import numpy as np
import csv
from bs4 import BeautifulSoup
from contextlib import closing
from requests_html import HTMLSession
from selenium import webdriver
import urllib
import time 

url = 'https://police.illinois.edu/crime-reporting/daily-crime-log/'

f = open('crime-log.html', 'w')
driver = webdriver.Firefox()
driver.get(url)
time.sleep(5)
full_text = driver.execute_script("return document.getElementsByTagName('html')[0].innerHTML")

print(full_text)
f.write(full_text)
f.close()




with open("crime-log.html") as fp:
	soup = BeautifulSoup(fp, 'html.parser')
	link_div = soup.find("div", class_="topic-title")
	
	link_a = link_div.a
	response = urllib.request.urlopen(link_a.get('href'))

	webContent = response.read()
	f = open('crime-log.pdf', 'wb')
	f.write(webContent)
	f.close()

tabula.convert_into("crime-log.pdf", "illinoisCrime.csv", output_format="csv", pages='all')

gmaps = googlemaps.Client(key='insert Google Maps API key here')

file = "illinoisCrime.csv"
location_bias_long = 88.2272
location_bias_lat = 40.1020
location_bias_radius = 500
locations_long_lat=[]
csvFile = pd.read_csv(file, encoding="utf8")
csvFile["Longitude"]=np.nan
csvFile["Latitude"]=np.nan
with open('illinoisCrime.csv','w', newline='', encoding='utf-8') as out:
	csv_out=csv.writer(out)
	csv_out.writerow(["Incident ID", "Location", "Date", "Crime", "Adress", "Longitude", "Latitude"])
	for index, row in csvFile.iterrows():
		if row["General Location"].split()[-1].lower() not in ["urbana", "champaign", "chicago", "il"]:
			row["General Location"] += " Urbana champaign"
		place_candidate = gmaps.find_place(row["General Location"], 'textquery',location_bias="circle:"+str(location_bias_radius)+"@"+str(location_bias_lat)+","+str(location_bias_long))
		if place_candidate['status']=="OK":
			location = gmaps.reverse_geocode(place_candidate['candidates'][0]['place_id'])
			csv_out.writerow((row["Incident"], row["General Location"], row["Date occurred"],row["Crime Description"], location[0]["formatted_address"],location[0]["geometry"]["location"]["lng"], location[0]["geometry"]["location"]["lat"]))
driver.quit()