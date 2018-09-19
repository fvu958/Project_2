// // Plot the default route once the page loads
// const defaultURL = "/data";
// d3.json(defaultURL).then(function(data) {
//   var data = [data];
//   var layout = { margin: { t: 30, b: 100 } };
//   Plotly.plot("pie", data, layout);
// });

// // Update the plot with new data
// function updatePlotly(newdata) {
//   Plotly.restyle("pie", "key", [newdata.x]);
//   Plotly.restyle("pie", "y", [newdata.y]);
// }

// // Get new data whenever the dropdown selection changes
// function getData(route) {
//   console.log(route);
//   d3.json(`/${route}`).then(function(data) {
//     console.log("newdata", data);
//     updatePlotly(data);
//   });
// }
function getCountryName() {
    var selector = document.getElementById('selDataset');
    var url = "/data";
    Plotly.d3.json(url, function (error, response) {
        if (error) return console.warn(error);
        var data = response;
        data.map(function (pieCountry) {
            var option = document.createElement('option')
            option.text = pieCountry
            option.value = pieCountry
            selector.appendChild(option)
        });
    });
};

getCountryName();

function countryChanged(pieCountry) {
    updatePie(pieCountry);
};

function updatePie(pieCountry) {
    var url = "/data"
    Plotly.d3.json(url, function (error, response) {
        if (error) return console.log(error);
        var labels = []
        var values = []
        var hovers = []
        for (i = 0; i < 180; i++) {
            var label = response[0].Country[i];
            labels.push(label);
            var value = response[1].Beer_Percent[i].Wine_Percent[i].Spirts_Percent[i].Other_Percent[i];
            values.push(value);
            var hover = response[2][label - 1];
            hovers.push(hover);
        };
        var trace = {
            values: values,
            labels: labels,
            type: "pie",
            text: hovers,
            hoverinfo: "label+text+value+percent",
            textinfo: "percent"
        };
        var data = [trace]
        var layout = {
            margin: {
                l: 10,
                r: 10,
                b: 10,
                t: 10,
                pad: 4
            }
        }

        Plotly.newPlot("pieChart", data, layout)
    });
};


function getCountryName() {
    var selector = document.getElementById('selDataset');
    var url = "/data";
    Plotly.d3.json(url, function (error, response) {
        if (error) return console.warn(error);
        var data = response;
        data.map(function (pieCountry) {
            var option = document.createElement('option')
            option.text = pieCountry
            option.value = pieCountry
            selector.appendChild(option)
        });
    });
};

getCountryName();