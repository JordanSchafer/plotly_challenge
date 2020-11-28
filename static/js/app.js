//Updates the data in the sample metadata panel when passed a new patient
function updateMetadata(patient){
    //gets the json file and goes through it
    d3.json("samples.json").then((data)=>{
        console.log(patient);
        var metadata = data.metadata;
        console.log(metadata);
        var results = metadata.filter(patientObject => patientObject.id == patient);
        
        var result=results[0];
        //grabs the location to put the info
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key,value])=>{
            panel.append("h6").text(`${key}: ${value}`)
        });

        //Bonus pass wash freq to build Gaugechart
        updateGauge(result.wfreq);
    });
}

//Updates the charts when passed a new patient
function updateCharts(patient){
    //gets the json file and goes through it
    d3.json("samples.json").then((data)=>{
        
        var samples = data.samples;
        var results = samples.filter(patientObject => patientObject.id == patient);
        console.log(results)
        var result=results[0];
        
        var ids = result.otu_ids;
        var labels = result.otu_labels;
        var values = result.sample_values;

        //build a bar chart
        var barData = [{
                y:ids.slice(0,10).map(otuID=>`OTU ${otuID}`).reverse(),
                x:values.slice(0,10).reverse(),
                text:labels.slice(0,10).reverse(),
                type:"bar",
                orientation:"h"
        }];

        var barLayout={
            title:"10 Most Common Bacteria Found"
        }

        Plotly.newPlot("bar",barData,barLayout);

        //build bubble chart
        var bubbleData=[{
            type:"scatter",
            x:ids,
            y:values,
            text:labels,
            mode:"markers",
            marker:{
                color:ids,
                size:values
            }
        }];

        var bubbleLayout={
            xaxis:{title:"Id's"},
            hovermode:"closest"
        };

        Plotly.newPlot("bubble",bubbleData,bubbleLayout);
    });
}

function init(){
    
    var selector=d3.select("#selDataset");

    d3.json("samples.json").then((data)=>{
        var sampleNames = data.names;
        sampleNames.forEach((name)=>{
            selector.append("option")
                .text(name)
                .property("value",name);
        });

        //use the first sample to build initial plots
        updateCharts(sampleNames[0]);
        updateMetadata(sampleNames[0]);
    });
}

function optionChanged(newSample){
    updateMetadata(newSample);
    updateCharts(newSample);
}

init();