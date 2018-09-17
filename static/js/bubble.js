function buildMetadata(sample) {

  
  // Use d3 to select the panel with id of `#sample-metadata`
  var panel=d3.select("#alcohol")
  // Use `.html("") to clear any existing metadata
  panel.html("")
  //Use `d3.json` to fetch the metadata for a sample
  d3.json(`/alcohol/${sample}`).then(function(data) {
    console.log(data);
    //Use `Object.entries` to add each key and value pair to the panel
    Object.entries(data).forEach(([key, value]) => panel.append('h6')
    .text(`${key} : ${value}`));
  });

};

function buildCharts(sample) {

  //Use `d3.json` to fetch the sample data for the plots
  d3.json(`/alcoholDB/${sample}`).then(function(data) {

    //Build a Bubble Chart using the sample data
    var trace1={
      x: data.Total,
      y: data.GDP,
      text: data.Country_Code,
      type: "scatter",
      mode: "markers",
      marker: {
        size: data.Death_Rate,
        color: data.otu_ids,
        colorscale: "Jet"
      }
    }

    var layout = {
      xaxis: { title: "Consumption (Liters)" },
      yaxis: { title: "GDP" },

    };   
    var data1=[trace1]
    Plotly.newPlot("bubble", data1, layout)

  });

  };
   

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

// // Create an SVG wrapper, append an SVG group that will hold our scatter plot, and shift the latter by left and top margins.
// var svg = d3.select("#scatter")
// .append("svg")
// .attr("width", svgWidth)
// .attr("height", svgHeight);

// var chart = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);


// // Import data 
// d3.csv("assets/data/data.csv", function(err, healthdata) {
//   if (err) throw err;
 
//   // console.log(healthdata);

//  // Step 1: Parse Data/Cast as numbers
//  healthdata.forEach(function(d) {
//     d.poverty = +d.poverty;
//     d.healthcare= +d.healthcare;  
//   });

// // Step 2: Create scale functions
// var xLinearScale = d3.scaleLinear()
//   .domain([d3.min(healthdata, d => d.poverty)-0.5, d3.max(healthdata, d => d.poverty)+0.5, 30])
//   .range([0, width]);

// var yLinearScale = d3.scaleLinear()
//   .domain([d3.min(healthdata, d => d.healthcare)-1, d3.max(healthdata, d => d.healthcare)+1.1])
//   .range([height, 0]);
  
// // Create axis functions
// var bottomAxis = d3.axisBottom(xLinearScale);
// var leftAxis = d3.axisLeft(yLinearScale);

// //Append axes to the chart
// chart.append("g")
//   .attr("transform", `translate(0, ${height})`)
//   .call(bottomAxis);

// chart.append("g")
//   .call(leftAxis);

// //Create Circles
// var circlesGroup = chart.selectAll("circle").data(healthdata).enter();
  
// var cTip=circlesGroup
//   .append("circle")  
//   .classed("stateCircle", true)
//   .attr("cx", d => xLinearScale(d.poverty))
//   .attr("cy", d => yLinearScale(d.healthcare))
//   .attr("r", "15")
//   .attr("opacity", ".5");
  
// //Create text labels with state abbreviation for each circle
// circlesGroup.append("text")
//   .classed("stateText", true)
//   .attr("x", d => xLinearScale(d.poverty))
//   .attr("y", d => yLinearScale(d.healthcare))
//   .attr("stroke", "teal")
//   .attr("font-size", "10px")
//   .text(d => d.abbr)
    
  
// //Initialize tool tip

// var toolTip = d3.tip()
//     .attr("class", "d3-tip")
//     .offset([-8, 0])
//     .html(function(d) {
//       return (`${d.state}<br>Poverty: ${d.poverty}%<br>Healthcare: ${d.healthcare}%`);
//   });

// //Create tooltip in the chart
// cTip.call(toolTip);

// //Create event listeners to display and hide the tooltip
// cTip.on("mouseover", function(d) {
//   d3.select(this).style("stroke", "black")
//   toolTip.show(d, this);
// })
//   //on mouseout event
//   .on("mouseout", function(d, index) {
//     d3.select(this).style("stroke", "blue")
//     .attr("r", "10")
//     toolTip.show(d);
//   });

// // Create Y-axis and X-axis labels
// chart.append("text")
// .attr("transform", "rotate(-90)")
// .attr("y", 0 - margin.left + 40)
// .attr("x", 0 - (height / 2))
// .attr("dy", "1em")
// .attr("class", "axisText")
// .text("Lacks Healthcare (%)");

// chart.append("text")
// .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
// .attr("class", "axisText")
// .text("In Poverty (%)");
    
// });