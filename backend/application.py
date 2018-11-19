import json
import os, glob
import logging
from flask import Flask, request, render_template, send_from_directory, redirect, url_for, flash, send_file, jsonify, session, Response
from flask_cors import CORS, cross_origin

application = Flask(__name__)
Flask.current_app = application
application.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
application.config['CORS_HEADERS'] = 'Content-Type'

CORS(application,supports_credentials=True)

@application.route("/getPhysicians")
def getPhysicians():
	# print "gettingPhysicians"
	with open('data/physicians.json') as f:
		data = json.load(f)
	print data
	return json.dumps(data)

@application.route("/getAppointments/<physId>")
def getAppointments(physId):
	print "getAppointments", physId
	idx = int(physId)-100
	with open('data/appointments.json') as f:
		data = json.load(f)
	print data
	return json.dumps(data[physId])


if __name__ == '__main__':
	application.run(host='0.0.0.0', debug=True)