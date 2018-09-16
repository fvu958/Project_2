import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


engine = create_engine("sqlite:///alcoholDB.sqlite")

Base = automap_base()
Base.prepare(engine, reflect=True)

Alcohol = Base.classes.alcohol
session = Session(engine)

app = Flask(__name__)

@app.route("/home")
def home():
    return render_template("index.html")

@app.route("/home")
def home():
    return 

@app.route("/viz")
def viz_route():
    return 


@app.route("/data")
def data_route():
    return 


if __name__ == '__main__':
    app.run()