var hist = hist || {};
var d3 = d3 || {};
var $ = $ || {};

function mk_hist(id){
    var superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹",
        formatPower = function(d) { return (d + "").split("").map(function(c) { return superscript[c]; }).join(""); };
    
    var margin = {top: 10, right: 10, bottom: 40.5, left: 40.5},
        width = 600 - margin.left - margin.right,
        height = 340 - margin.top - margin.bottom;
    
    var x = d3.scaleLinear()
        .domain([0, 300])
        .range([0, width]);
    
    var y = d3.scaleLog()
        .base(Math.E)
        .domain([Math.exp(0), Math.exp(9)])
        .range([height, 0]);
    
    var xAxis = d3.axisBottom(x);
    
    var yAxis = d3.axisLeft(y)
        .tickFormat(function(d) { return "e" + formatPower(Math.round(Math.log(d))); });
    
    var line = d3.line()
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); });
    
    var svg = d3.select(id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    svg.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", "translate(-10,0)")
        .call(yAxis);
    
    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + (height + 10) + ")")
        .call(xAxis);
        
    var z0 = svg.append("path")
        .datum(d3.range(300).map(function(x) { return [x, 1]; }))
        .attr("class", "line line0")
        .attr("d", line);
        
    var z1 = svg.append("path")
        .datum(d3.range(300).map(function(x) { return [x, 1]; }))
        .attr("class", "line line1")
        .attr("d", line);
        
    function updatePath(path, z){
        ++path.datum()[z][1];
        path.transition().attr("d", line);
    }
    
    var _pre_z = 0;
    
    return function(z){
        updatePath(z0, z);
        updatePath(z1, Math.abs(z-_pre_z));
        _pre_z = z;
    };
}

hist.visit_z_order = mk_hist("#hist");
hist.visit_row_oriented = mk_hist("#hist2");
