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
    return render_template("index.1.html")

@app.route("/data")
def data_route():
    response = session.query(Alcohol).all()
    results=[]
    for row in response:
        row_dict = {
            "Country": row.Country,
            "Total": row.Total,
            "Recorded_Consumption": row.Recorded_Consumption,
            "Unrecorded_Consumption": row.Unrecorded_Consumption,
            "Beer_Percent": row.Beer_Percent,
            "Wine_Percent": row.Wine_Percent,
            "Spirits_Percent": row.Spirits_Percent,
            "Other_Percent": row.Other_Percent,
            "Purchase_Age": row.Purchase_Age,
            "Country_Code": row.Country_Code,
            }
        results.append(row_dict)
    return jsonify(results)

if __name__ == '__main__':
    app.run()