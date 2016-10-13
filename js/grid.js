var ztree = ztree || {};
var d3 = d3 || {};

var transformer = new ztree.Transformation(5);

var color_scale = d3.scaleLinear()
    .domain([0, 4])
    .range(["white", "steelblue"])
    .interpolate(d3.interpolateLab);
    
function clearGrid() {
	d3.select("#grid").selectAll(".row").selectAll(".square").style("fill", "#fff");
}

function gridData() {
	var data = new Array();
	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1;
	var width = 45;
	var height = 45;
	var click = 0;
	
	// iterate for rows	
	for (var row = 0; row < 16; row++) {
		data.push( new Array() );
		
		// iterate for cells/columns inside rows
		for (var column = 0; column < 16; column++) {
			data[row].push({
				x: xpos,
				y: ypos,
				width: width,
				height: height,
				click: click,
				i: row, j: column
			})
			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += width;
		}
		// reset the x position after a row is complete
		xpos = 1;
		// increment the y position for the next row. Move it down 50 (height variable)
		ypos += height;	
	}
	return data;
}

function highlightBlock(highlight, color){
	var row_0 = highlight[0], row_m = highlight[2],
		col_0 = highlight[1], col_m = highlight[3];
	d3.select("#grid").selectAll(".row").filter(function(d, i){
		return i>=row_0 && i<row_m ? this : null;
	}).selectAll(".square").filter(function(d, j){
		return j>=col_0 && j<col_m ? this : null;
	}).style("fill", color);
}

var gridData = gridData();

var grid = d3.select("#grid")
	.append("svg")
	.attr("width","730px")
	.attr("height","730px");
	
var row = grid.selectAll(".row")
	.data(gridData)
	.enter().append("g")
	.attr("class", "row");
	
var column = row.selectAll(".square")
	.data(function(d) { return d; })
	.enter().append("rect")
	.attr("class","square")
	.attr("x", function(d) { return d.x; })
	.attr("y", function(d) { return d.y; })
	.attr("width", function(d) { return d.width; })
	.attr("height", function(d) { return d.height; })
	.style("fill", "#fff")
	.style("stroke", "#000")
	.style("stroke-width", ".5px")
	.on('click', function(d) {
    //   d.click ++;
    //   if ((d.click)%4 == 0 ) { d3.select(this).style("fill","#fff"); }
	   //if ((d.click)%4 == 1 ) { d3.select(this).style("fill","#2C93E8"); }
	   //if ((d.click)%4 == 2 ) { d3.select(this).style("fill","#F56C4E"); }
	   //if ((d.click)%4 == 3 ) { d3.select(this).style("fill","#838690"); }
    })
    .on('mouseover', function(d) {
        clearGrid();
        var z_order = transformer.transform(d.i, d.j);
        var hierarchy = transformer.getHierarchy(z_order);
        for(var level = hierarchy.length-1; level>=0;--level)
        	highlightBlock(hierarchy[level].highlight, color_scale(hierarchy.length-level));
        current_label.text(z_order)
	        .attr("x", d.x+d.width/2).attr("y", d.y+d.height/2);
    });

var current_label = row.append("svg:text")
	.attr("text-anchor","middle")
	.attr("dy",".25em")
	.style("fill", "rgba(25, 25, 25, 0.82)")
	.style("font", '1.8em impact, georgia, times, serif')
	.style("text-rendering", "optimizeLegibility");

