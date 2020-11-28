//bonus section build a gauge display

function updateGauge(washes){

    var traceGauge = {
        type:"pie",
        hole:0.4,
        rotation:90,
        values:[1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        text:['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
        direction: 'clockwise',
        textinfo:'text',
        textposition:'inside',
        marker:{
            colors: ['#F8F3EC','#F4F1E5','#E9E6CA','#E2E4B1','#D5E49D','#B7CC92','#8CBF88','#8ABB8F','#85B48A','white'],
            labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
            hoverinfo:"label"
        },
        hoverinfo:"skip",
        showlegend:false
    };

    var dot = {
        type:"scatter",
        x:[0],
        y:[0],
        marker:{
            size:12,
            color:"#FF0000"
        },
        showlegend:false,
        hoverinfo:"skip"
    }

    var degree =180-(20*parseFloat(washes));
    var radius = 0.5;
    var radians=degree*Math.PI/180;
    
    var x = radius*Math.cos(radians);
    var y = radius*Math.sin(radians);

    var path=`M 0 -0.05 L 0 0.05 L ${x} ${y} Z`;

    var gaugeLayout={
        title:"<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
        shapes:[{
            type:"path",
            path:path,
            fillcolor:'#FF0000',
            line:{color:'#FF0000'}
        }],
        xaxis:{
            zeroline:false,
            showticklabels:false,
            showgrid:false,
            range:[-1,1],
            fixedrange:true
        },
        yaxis:{
            zeroline:false,
            showticklabels:false,
            showgrid:false,
            range:[-1,1],
            fixedrange:true
        }
    };
    Plotly.newPlot("gauge",[traceGauge,dot],gaugeLayout);
}