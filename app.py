import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
pd.set_option('display.max_rows', 500)

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

alcohol_df = pd.read_html('https://en.wikipedia.org/wiki/List_of_countries_by_alcohol_consumption_per_capita')

len(alcohol_df)

alcohol_df = alcohol_df[0]

alcohol_df.rename(columns={1:"Country",2:"Total",3:"Recorded Consumption",4:"Unrecorded Consumption",5:"Beer (%)",6:"Wine (%)",7:"Spirits (%)",8:"Other (%)"},inplace=True)
alcohol_df = alcohol_df.drop(alcohol_df.index[0])

alcohol_df = alcohol_df.drop(columns=[0, 9])

alcohol_df = alcohol_df.fillna(value=0)

alcohol_df.head()

gdp_df = pd.read_html("https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)")

len(gdp_df)

gdp_df = gdp_df[2]

gdp_df.rename(columns={1:"Country",2:"GDP (US$MM)"},inplace=True)
gdp_df = gdp_df.drop(gdp_df.index[:2])

gdp_df.at[3, 'Country'] = "China"
gdp_df.at[13, 'Country'] = "Russia"
gdp_df.at[70, 'Country'] = "Syria"
gdp_df.at[70, 'GDP (US$MM)'] = 77460

gdp_df = gdp_df.drop(columns=[0])

gdp_df = gdp_df.reset_index()

gdp_df = gdp_df.drop(columns=["index"])

gdp_df.head()

gdp_df.at[170, 'Country'] = "Saint Lucia"
gdp_df.at[177, 'Country'] = "Gambia"
gdp_df.at[178, 'Country'] = "Saint Kitts and Nevis"
gdp_df.at[181, 'Country'] = "Saint Vincent and the Grenadines"
gdp_df.at[92, 'Country'] = "Ivory Coast"
gdp_df.at[145, 'Country'] = "Republic of the Congo"

combined_df = alcohol_df.merge(gdp_df, how='outer', on="Country")

combined_df.at[6, 'GDP (US$MM)'] = 3013
combined_df.at[62, 'GDP (US$MM)'] = 10
combined_df.at[96, 'GDP (US$MM)'] = 183
combined_df.at[109, 'GDP (US$MM)'] = 80713
combined_df.at[125, 'GDP (US$MM)'] = 7834
combined_df.at[128, 'GDP (US$MM)'] = 12380
combined_df.at[133, 'GDP (US$MM)'] = 102
combined_df.at[180, 'GDP (US$MM)'] = 6217

combined_df = combined_df.dropna(axis=0, how='any')

combined_df.head()

drinking_df = pd.read_csv("drinking_age.csv")

drinking_df.head()

new_combined_df = combined_df.merge(drinking_df, how='outer', on="Country")

new_combined_df = new_combined_df[:190]

new_combined_df.head()

death_df = pd.read_csv("DeathRate.csv")

death_df = death_df.rename(columns={"Country Name":"Country"})

final_df = new_combined_df.merge(death_df, how='outer', on="Country")

final_df = final_df.dropna(how="all", subset=["Death Rate Per 100,000"]).reset_index(drop=True)

final_df = final_df[:180]

final_df

engine = create_engine("sqlite:///dataTable.sqlite")

final_df.to_sql('alcohol', con = engine, if_exists='append', index=False)

engine.execute("SELECT * FROM alcohol").fetchall()

app = Flask(__name__)

@app.route("/home")
def home():
    return "Welcome to the home page!"


@app.route("/viz")
def viz_route():
    return "Welcome to the visuals page!"


@app.route("/data")
def data_route():
    return "Welcome to the data page!"


if __name__ == '__main__':
    app.run()