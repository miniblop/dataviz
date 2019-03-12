// Exercice 1 Q2

var margin = {top: 80, right: 180, bottom: 80, left: 180},
    width = 973 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("article").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Exercice 1 Q3

d3.tsv("Data/population.tsv", function(error, data){    

    var elements = Object.keys(data[0])
	.filter(function(d){
	    return (d != "Country");
	});
    var selection = elements[0];// 1950
    
    var x = d3.scale.ordinal()
	.domain(data.map(function(d){ return d.Country;}))
	.rangeBands([0, width]);

    var y = d3.scale.linear()
	.domain([0, d3.max(data, function(d){
	    return +d[selection];
	})])
	.range([height, 0]);

    var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

    var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

    svg.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(0," + height + ")")
    	.call(xAxis)
    	.selectAll("text")
    	.style("font-size", "8px")
      	.style("text-anchor", "end")
      	.attr("dx", "-.8em")
      	.attr("dy", "-.55em")
      	.attr("transform", "rotate(-90)" );

    svg.append("g")
    	.attr("class", "y axis")
    	.call(yAxis);

    svg.selectAll("rectangle")
	.data(data)
	.enter()
	.append("rect")
	.attr("class","rectangle")
	.attr("width", width/data.length)
	.attr("height", function(d){
	    return height - y(+d[selection]);
	})
	.attr("x", function(d, i){
	    return (width / data.length) * i ;
	})
	.attr("y", function(d){
	    return y(+d[selection]);
	})
	.append("title")
	.text(function(d){
	    return d.Country + " : " + d[selection];
	});
    
// Exercice 1 Q4

    var selector = d3.select("#menu")
    	.append("select")
    	.attr("id","dropdown")
    	.on("change", function(d){
            selection = document.getElementById("dropdown");	    
            y.domain([0, d3.max(data, function(d){
    		return +d[selection.value];})]);	    
            yAxis.scale(y);	    
            d3.selectAll(".rectangle")
           	.transition()
    	        .attr("height", function(d){
    		    return height - y(+d[selection.value]);
    		})
    		.attr("x", function(d, i){
    		    return (width / data.length) * i ;
    		})
    		.attr("y", function(d){
    		    return y(+d[selection.value]);
    		})
           	.ease("linear")
           	.select("title")
           	.text(function(d){
           	    return d.Country + " : " + d[selection.value];
           	});
    	                d3.selectAll("g.y.axis")
           	.transition()
           	.call(yAxis);	    
        });

// Exercice 1 Q5

    selector.selectAll("option")
    	.data(elements)
    	.enter().append("option")
    	.attr("value", function(d){
            return d;
    	})
    	.text(function(d){
            return d;
    	})
});

