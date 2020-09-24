function buildMetadata(sample){
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleobj =>
        sampleobj.id == sample );
        var result = resultArray[0];
        var panel =d3.select("#sample-metadata");

        panel.HTML("");

        Object.defineProperties(result).forEach(([key,value])=>{
            panel.append("h6").text(`${key.touppercase()}:${value}`);
        });

        buildgauge(result.wfreq);

    });
}


function buildMetadata(sample){
    d3.json("samples.json").then((data)=> {
        var samples = data.samples;
        var resultArray = samples.filter(sampleobj => sample);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels= result.otu_labels;
        var sample_values = result.sample-sample_values;

        var bubblelayout = {
            title : "bacteria cultures per sample",  
            margin : {t:0},
            hovermode : "closest",
            xaxis:{title: "otu id" },
            margin : {t:30}
        };

        var bubbleData = [
            {
                x :  otu_ids,
                y : sample_values,
                text: otu_labels,
                mode : "marker",
                marker : {
                    size :sample_values,
                    color: otu_ids,
                    colorsclae: "Earth"


                }

            }
        ];

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

        var barLayout = {
            title : "top 10 bacteria Cultures Found",
            
            margin : { t: 30 , l: 150} 
        };

        Plotly.newPlot("bar" , barData , barLayout);
    });
}



function init() { 
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
        var samplesNames = data.names;

        samplesNames.forEach((sample)=> {
            seclector .append("option") .property("value" , sample) .text(sample);

        });
        
        var firstSample = sampleNames[0];
        buildCharts(firstsample);
        buildMetadata(firstsample);
    });
}



function optionchanged(newsample){
    buildCharts(newsample);
    buildMetadata(newsample);
}

init();