import json
import os, glob
import logging
from flask import Flask, request, render_template, send_from_directory, redirect, url_for, flash, send_file, jsonify, session, Response

application = Flask(__name__)
Flask.current_app = application


data={
	"physicians": [
		{
			"id": 100,
			"contactInfo": {
				"firstName": "Julius",
				"lastName": "Hibbert",
				"email": "hibbert@notablehealth.com"
			},
			"appointments":[
				{
					"id":1,
					"type": "New Patient",
					"time": "8:00AM",
					"name": "Sterling Archer"
				},
				{
					"id":2,
					"type": "Follow Up",
					"time": "8:30AM",
					"name": "Cyril Figis"
				},
				{
					"id":3,
					"type": "Follow Up",
					"time": "9:00AM",
					"name": "Ray Gilette"
				},
				{
					"id":4,
					"type": "New Patient",
					"time": "9:30AM",
					"name": "Lana Kane"
				},
				{
					"id":5,
					"type": "New Patient",
					"time": "10:00AM",
					"name": "Pam Poovey"
				}
			]
		},
		{
			"id": 101,
			"contactInfo": {
				"firstName": "Algernop",
			"lastName": "Krieger",
			"email": "krieger@notablehealth.com"
			}
		},
		{
			"id": 102,
			"contactInfo": {
				"firstName": "Nick",
				"lastName": "Riviera",
				"email": "riveiera@notablehealth.com"
			}
		}
	],
}


@application.route("/getPhysicians")
def getPhysicians():
	print "gettingPhysicians"
	with open('data/physicians.json') as f:
		physicians = json.load(f)
	print physicians
	return json.dumps({"data":physicians})

@application.route("/getAppointments/<physId>")
def getAppointments(physId):
	print "getAppointments", physId
	idx = int(physId)-100
	with open('data/physicians.json') as f:
		physicians = json.load(f)
	print physicians["data"][idx]["appointments"]
	return json.dumps({"data":physicians})


if __name__ == '__main__':
	application.run(host='0.0.0.0', debug=True)