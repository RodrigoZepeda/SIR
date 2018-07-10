/*
MIT LICENSE 
    Copyright 2018 Rodrigo Zepeda
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
    associated documentation files (the "Software"), to deal in the Software without restriction, 
    including without limitation the rights to use, copy, modify, merge, publish, distribute, 
    sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
    is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial 
    portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
    INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
    PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var margin = {top: 10, right: 10, bottom: 10, left: 10}, 
    padding = {top: 30, right: 30, bottom: 60, left: 60},
    xdomain      = {min: 0, max: 50},
    ydomain      = {min: 0, max: 100},
    debug        = false;
var sline, iline, rline, stext, itext, rtext;
      
function setPlot(margin, padding, xdomain, ydomain){

    //Custom heights for d3js plot
    var outerHeight  = 0.7*Math.max(document.documentElement['clientHeight'], document.body['scrollHeight'], document.documentElement['scrollHeight'], document.body['offsetHeight'], document.documentElement['offsetHeight']);
        outerWidth   = Math.max(0.975*document.getElementById("canvasplot").clientWidth, 300);
        innerWidth   = outerWidth - margin.left - margin.right,
        innerHeight  = outerHeight - margin.top - margin.bottom,
        width        = innerWidth - padding.left - padding.right,
        height       = innerHeight - padding.top - padding.bottom;
    

    // Create svg margins
    var outer = d3.select('#canvasplot').append('svg')
    .attr('width', outerWidth)
    .attr('height', outerHeight);

    if(debug){
        outer.append("rect")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr('fill', "green")
    }

    var inner = outer.append("g")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

    if(debug){
        inner.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr('fill', "blue");
    };

    //X.axis
    Xscale = d3.scaleLinear()
    .domain([xdomain.min, xdomain.max])
    .range([0, width]);
        
    axisX  = inner.append("g")
        .attr("transform", "translate(" + 0 + "," + height + ")")
        .attr("id","xaxis")
        .style("stroke-width", 2)
        .call(d3.axisBottom(Xscale));               

    //Y-axis
    Yscale = d3.scaleLinear()
        .domain([-ydomain.min, ydomain.max])
        .range([height, 0]);
        
    axisY = inner.append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .attr("id","yaxis")
        .style("stroke-width", 2)
        .call(d3.axisLeft(Yscale)); 

    //Create X axis label
    outer.append('text')
        .attr('x', innerWidth / 2 )
        .attr('y',  innerHeight - padding.top/2)
        .style('text-anchor', 'middle')
        .style('font-family', 'sans-serif')
        .text("Days since the start of the outbreak");

    //Create Y axis label
    outer.append('text')
        .attr('y', 0)
        .attr('x', 0)
        .attr('transform', 'translate(' + 0 + ',' + innerHeight/2 + ') rotate(-90)')
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-family', 'sans-serif')
        .text("Percent of the population");         

    // define the line
    var SusceptibleLine = d3.line()
        .x(function(d) { return Xscale(Math.max(d.t,0)); })
        .y(function(d) { return Yscale(Math.min(Math.max(100*d.s,0),100)); }) //Controlling for any numerical error
        .curve(d3.curveBasis);

    // define the line
    var InfectedLine = d3.line()
        .x(function(d) { return Xscale(Math.max(d.t,0)); })
        .y(function(d) { return Yscale(Math.min(Math.max(100*d.i,0),100)); }) //Controlling for any numerical error
        .curve(d3.curveBasis);

    // define the line
    var RemovedLine = d3.line()
        .x(function(d) { return Xscale(Math.max(d.t,0)); })
        .y(function(d) { return Yscale(Math.min(Math.max(0,100*(1 - d.s - d.i)),100)); })
        .curve(d3.curveBasis);  
        
    return {"inner": inner, "SusceptibleLine": SusceptibleLine, "InfectedLine": InfectedLine, "RemovedLine": RemovedLine};
  
};

function setPlotdata(plotparams, mydata){
    
    stext = plotparams["inner"].append('text')
    .text('S')
    .attr('fill',"purple")
    .attr('text-anchor', 'middle')  
    .attr('x', Xscale(mydata[mydata.length-1].t + 1))
    .attr('y', Yscale(100*mydata[mydata.length-1].s));
    
    sline = plotparams["inner"].append("path")
    .attr("class", "functionpath")
    .datum(mydata)
    .attr("d", plotparams["SusceptibleLine"])
    .style("stroke", "purple")
    .style("stroke-width", 3)
    .style("fill", "none")
    .attr("transform", null);

    itext = plotparams["inner"].append('text')
    .text('I')
    .attr('fill',"red")
    .attr('text-anchor', 'middle')  
    .attr('x', Xscale(mydata[mydata.length-1].t + 1))
    .attr('y', Yscale(100*mydata[mydata.length-1].i));

    iline = plotparams["inner"].append("path")
    .attr("class", "functionpath")
    .datum(mydata)
    .attr("d", plotparams["InfectedLine"])
    .style("stroke", "red")
    .style("stroke-width", 3)
    .style("fill", "none")
    .attr("transform", null); 

    rtext = plotparams["inner"].append('text')
    .text('R')
    .attr('fill',"deepskyblue")
    .attr('text-anchor', 'middle')  
    .attr('x', Xscale(mydata[mydata.length-1].t + 1))
    .attr('y', Yscale(100*(1 -mydata[mydata.length-1].s - mydata[mydata.length-1].i)));

    rline = plotparams["inner"].append("path")
    .attr("class", "functionpath")
    .datum(mydata)
    .attr("d", plotparams["RemovedLine"])
    .style("stroke", "deepskyblue")
    .style("stroke-width", 3)
    .style("fill", "none")
    .attr("transform", null);

};

function removePlotdata(){
    sline.remove();
    rline.remove();
    iline.remove();
    stext.remove();
    rtext.remove();
    itext.remove();
}


window.onload = function(){ 
    var plotparams = setPlot(margin, padding, xdomain, ydomain);
    setsliders(Initial_Values, Ranges, suffixes, plotparams);
    
    //Initial plot
    setPlotdata(plotparams, SIR(Initial_Values["S"]/100, Initial_Values["I"]/100, Initial_Values["Beta"], Initial_Values["Gamma"]));
         
    };    