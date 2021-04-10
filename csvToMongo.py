# I'm going to try to go from the output csv to mongodb
# we almost certainly should remove the csv, but I don't think the parser code is up to date, so I won't touch that

#from datetime import datetime
import pymongo 
from pymongo import MongoClient
import csv


cluster = MongoClient("mongodb+srv://pythonPDFInfo:lKskN2Po6b480C7B@uiuccrimedatabase.vg06i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = cluster["Crime-DB"]
collection = db["Crime-Data"]

file = "output (1).csv"

# I'm not totally sure why some of the data from the pdf is missing in the csv, but I'll put some default values

with open(file) as csvfile:
    #reader = csv.reader(csvfile)#, delimiter=',', quotechar='\"')
    reader = csv.DictReader(csvfile)
    for row in reader:
        #print(row)
        if collection.find_one(filter={"CaseID":row['Incident ID']}) is None:
            formattedrow = {
                "CaseID":row['Incident ID'],
                "DateReported" :row['Date'],
                "TimeReported": "12:00",
                "DateOccurred": row['Date'],
                "TimeOccurred": "12:00",
                "Latitude": float(row["Latitude"]),
                "Longitude" : float(row["Longitude"]),
                "StreetAddress": row["Address"], # I could also use row["Location"], but I think this one is better
                "Description": row["Crime"],
                "Disposition": "UNKNOWN"
            }
            print("Added: %s,%s"%(row['Incident ID'],row['Crime']))
            collection.insert_one(formattedrow)
        else:
            print("Skipped: %s:%s"%(row['Incident ID'],row['Crime']))

# collection.insert_one({"CaseID":"CC2109632",
#                        "DateReported" :"4/6/2021",
#     "TimeReported": "8:06",
#     "DateOccurred": "4/5/2021",
#     "TimeOccurred": "18:51",
#     "Latitude": 40.111100,
#     "Longitude" :-88.239540,
#     "StreetAddress": "55 E HEALEY ST, CHAMPAIGN",
#     "Description": "BURGLARY",
#     "Disposition": "REPORTED TO OTHER AGENCY"})

# print(collection.find_one(filter={"CaseID":"UU2105449"}))
# print(collection.find_one(filter={"CaseID":"??"}))
