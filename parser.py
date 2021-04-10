import tabula
import googlemaps
import pandas as pd
import numpy as np
import csv
gmaps = googlemaps.Client(key='AIzaSyBM_dmjhaZwcGNYkQrAr1MLyRKz3tgQ95U')

file = "illinoisCrime.csv"
location_bias_long = 88.2272
location_bias_lat = 40.1020
location_bias_radius = 500
locations_long_lat=[]
csvFile = pd.read_csv(file, encoding="utf8")
csvFile["Longitude"]=np.nan
csvFile["Latitude"]=np.nan
with open('output.csv','w', encoding='utf-8') as out:
	csv_out=csv.writer(out)
	csv_out.writerow(["Incident ID", "Location", "Date", "Crime", "Adress", "Longitude", "Latitude"])
	for index, row in csvFile.iterrows():
		print("New location")
		print(row["General Location"])
		if row["General Location"].split()[-1].lower() not in ["urbana", "champaign"]:
			row["General Location"] += " Urbana champaign"

		place_candidate = gmaps.find_place(row["General Location"], 'textquery',location_bias="circle:"+str(location_bias_radius)+"@"+str(location_bias_lat)+","+str(location_bias_long))

		if place_candidate['status']=="OK":
			location = gmaps.reverse_geocode(place_candidate['candidates'][0]['place_id'])
			# print(reverse_location_geocode)
			# location = gmaps.geocode(reverse_location_geocode)
			csv_out.writerow((row["Incident"], row["General Location"], row["Date occurred"],row["Crime Description"], location[0]["formatted_address"],location[0]["geometry"]["location"]["lng"], location[0]["geometry"]["location"]["lat"]))
			# place_candidate["Longitude"]=
	