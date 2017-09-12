/**
 * @Author XieYang
 * @DateTime 2017/8/17 15:00
 * @Description
 * @LastModifiedBy
 * @LastModifiedTime
 */

function RadarChart(id, data, options) {
    var cfg = {
        w: 600,				//Width of the circle
        h: 600,				//Height of the circle
        margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
        levels: 3,				//How many levels or inner circles should there be drawn
        maxValue: 0, 			//What is the value that the biggest circle will represent
        labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
        opacityArea: 0.9, 	//The opacity of the area of the blob
        dotRadius: 1, 			//The size of the colored circles of each blog
        strokeWidth: 2, 		//The width of the stroke around each blob
        roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
        color: d3.scale.category10()	//Color function
    };

    //Put all of the options into a variable called cfg
    if ('undefined' !== typeof options) {
        for (var i in options) {
            if ('undefined' !== typeof options[i]) {
                cfg[i] = options[i];
            }
        }
    }

    //If the supplied maxValue is smaller than the actual one, replace by the max in the data
    var maxValue = Math.max(cfg.maxValue, d3.max(data, function (i) {
        return d3.max(i.map(function (o) {
            return o.value;
        }))
    }));

    var allAxis = (data[0].map(function (i, j) {
            return i.axis
        })),	                                //Names of each axis
        total = allAxis.length,					//The number of different axes
        radius = Math.min(cfg.w / 2, cfg.h / 2),//Radius of the outermost circle
        Format = d3.format('%'),
        num = total === 4 ? total : 2,//Percentage formatting
        angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"

    //Scale for the radius
    var rScale = d3.scale.linear()
        .range([0, radius])
        .domain([0, maxValue]);

    //Remove whatever chart with the same id/class was present before
    d3.select(id).select("svg").remove();

    //Initiate the radar chart SVG
    var svg = d3.select(id).append("svg")
        .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
        .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
        .attr("class", "radar" + id);
    //Append a g element
    var g = svg.append("g")
        .attr("transform", "translate(" + (cfg.w / 2 + cfg.margin.left) + "," + (cfg.h / 2 + cfg.margin.top) + ")");


    //add gradient filter
    var gradient = g.append('defs')
        .append('linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%')

    gradient.append('stop')
        .attr('offset', '0%')
        .attr('style', 'stop-color:#2445ec;stop-opacity:1')

    gradient.append('stop')
        .attr('offset', '100%')
        .attr('style', 'stop-color:#7819ef;stop-opacity:1')

    /////////////////////////////////////////////////////////
    /////////////// Draw the Circular grid //////////////////
    /////////////////////////////////////////////////////////

    //Wrapper for the grid & axes
    var axisGrid = g.append("g").attr("class", "axisWrapper");
    var arc = d3.svg.arc()

    //Draw the background circles
    axisGrid.selectAll(".levels")
        .data(d3.range(1, (cfg.levels + 1)).reverse())
        .enter()
        .append("path")
        .attr("class", "gridCircle")
        .attr("d", function (d) {
            arc
                .outerRadius(radius / (cfg.levels * 2) * d * 2)
                .innerRadius(radius / (cfg.levels * 2) * (d * 2 - 1))

            return arc({'startAngle': 0, 'endAngle': Math.PI * 2})
        })
        .style("fill", '#022567')
        .style("stroke", function (d, i) {
            if (d % 2 === 0) {
                return '#024eb0'
            }
        })

        .style('stroke-width', 2)

    /////////////////////////////////////////////////////////
    //////////////////// Draw the axes //////////////////////
    /////////////////////////////////////////////////////////

    //Create the straight lines radiating outward from the center
    var axis = axisGrid.selectAll(".axis")
        .data(data[0])
        .enter()
        .append("g")
        .attr("class", "axis");
    //Append the lines
    axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", function (d, i) {
            return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / num);
        })
        .attr("y2", function (d, i) {
            return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / num);
        })
        .attr("class", "line")
        .style("stroke", "#0053bb")
        .style("stroke-width", "2px");

    axis.append("path")
        .attr("class", "textLine")
        .attr('transform', function (d, i) {
            return 'translate(' + rScale(maxValue * 1.13) * Math.cos(angleSlice * i - Math.PI / num) + ',' + rScale(maxValue * 1.12) * Math.sin(angleSlice * i - Math.PI / num) + ')'
        })
        .style('fill', '#01779b')
        .attr('d', function (d, i) {
            var x = rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / num)
            var s = ''
            if (x >= 0) {
                s = ''
            } else {
                s = '-'
            }

            return 'M0,0 L' + s + '20,0 L' + s + '40,20 L' + s + '130,20 L' + s + '130,21 L' + s + '130,21 L' + s + '40,21 L' + s + '20,1 L0,1'
        })

    axis.append('path')
        .attr("class", "polygon")
        .style('fill', '#00ffff')
        .attr('transform', function (d, i) {
            return 'translate(' + rScale(maxValue * 1.12) * Math.cos(angleSlice * i - Math.PI / num) + ',' + rScale(maxValue * 1.12) * Math.sin(angleSlice * i - Math.PI / num) + ')'
        })
        .attr('d', 'M4.401,4.703 L-0.875,4.705 L-3.515,0.136 L-0.878,-4.434 L4.398,-4.436 L7.077,0.133 Z')

    //Append the labels at each axis
    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "20px")
        .attr("text-anchor", function (d, i) {
            if (rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / num) > 0) {
                return 'start'
            } else {
                return 'end'
            }
        })
        .attr("dy", "0.35em")
        .attr("x", function (d, i) {
            var x = rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / num)
            if (x > 0) {
                return x + 20
            } else {
                return x - 20;
            }
        })
        .attr("y", function (d, i) {
            var y = rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / num)
            if (y > 0) {
                return y - 20
            } else {
                return y + 25
            }
        })
        .style('fill', '#febf00')
        .each(function (d, i) {
            d3.select(this)
                .append('tspan')
                .text(d.axis)
            d3.select(this)
                .append('tspan')
                .attr('x', function () {
                    var x = rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / num)
                    if (x > 0) {
                        return x + 20
                    } else {
                        return x - 20
                    }
                })
                .attr('dy', '1.85em')
                .text(Format(d.value))
        })

    /////////////////////////////////////////////////////////
    ///////////// Draw the radar chart blobs ////////////////
    /////////////////////////////////////////////////////////

    //The radial line function
    var radarLine = d3.svg.line.radial()
        .interpolate("linear-closed")
        .radius(function (d) {
            return rScale(d.value);
        })
        .angle(function (d, i) {
            return i * angleSlice;
        });

    if (cfg.roundStrokes) {
        radarLine.interpolate("cardinal-closed");
    }

    //Create a wrapper for the blobs
    var blobWrapper = g.selectAll(".radarWrapper")
        .data(data)
        .enter().append("g")
        .attr("class", "radarWrapper");

    //Append the backgrounds
    blobWrapper
        .append("path")
        .attr("class", "radarArea")
        .attr("d", function (d, i) {
            return radarLine(d);
        })
        .style("fill", "url(#gradient)")
        .style("fill-opacity", cfg.opacityArea)
        .attr("transform", function () {
            if (total === 4) {
                return 'rotate(' + 180 / total + ')'
            } else {
                return ''
            }
        })
        .on('mouseover', function (d, i) {
            //Dim all blobs
            d3.selectAll(".radarArea")
                .transition().duration(200)
                .style("fill-opacity", 0.1);
            //Bring back the hovered over blob
            d3.select(this)
                .transition().duration(200)
                .style("fill-opacity", 0.7);
        })
        .on('mouseout', function () {
            //Bring back all blobs
            d3.selectAll(".radarArea")
                .transition().duration(200)
                .style("fill-opacity", cfg.opacityArea);
        });

    //Create the outlines
    blobWrapper.append("path")
        .attr("class", "radarStroke")
        .attr("d", function (d, i) {
            return radarLine(d);
        })
        .attr("transform", function () {
            if (total === 4) {
                return 'rotate(' + 180 / total + ')'
            } else {
                return ''
            }
        })
        .style("stroke-width", cfg.strokeWidth + "px")
        .style("stroke", '#0fb4f8')
        .style("fill", "none")

}