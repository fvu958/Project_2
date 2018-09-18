

  d3.json('http://127.0.0.1:5000/data').then(function(data) {

    //Build a Bubble Chart using the sample data
    var trace1={
      x: data.Total,
      y: data.GDP,
      text: data.Country,
      type: "scatter",
      mode: "markers",
      marker: {
        size: data.Total,
        color: data.Total,
        colorscale: "Jet"
      }
    }
    var layout = {
      xaxis: { title: "OTU ID" },
      yaxis: { title: "OTU VALUES" },

    };   
    var data1=[trace1]
    Plotly.newPlot("bubble", data1, layout)
  }