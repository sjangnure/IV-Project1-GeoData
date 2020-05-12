function vis2(worldGeo,json_data,div)
{

  const lightgray = '#dcdcdc';
  const margin = {top: 0, right: 0, bottom: 0, left: 0};
  const width = 1000 - margin.left - margin.right; 
  const height = 700 - margin.top - margin.bottom;

  const svg = d3.select("#vis2")
	.append("svg")
		.attr("width",width + margin.left + margin.right + 1000)
		.attr("height",height + margin.top + margin.bottom );

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
 
const country_to_net = Object.fromEntries(new Map(json_data.map(d => [d.country, d.net_amount])));
	const countries_list = worldGeo.features.map(d => d.properties.name) ;
const used_countries = json_data.map(d => d.country);
  const extent = d3.extent(json_data, d => d.net_amount);
  const changemean=d3.mean(json_data, d => d.net_amount);
   
  // draw map
  //const tickFormat =  d3.formatPrefix(".1", 1e10) ;

  
  const projection =  d3.geoNaturalEarth1()
      .fitSize([width, height], worldGeo);

  const path = d3.geoPath().projection(projection);
	const net_array=json_data.map(d=>d.net_amount);
	console.log(typeof net_array)
	
	var x = d3.scaleLinear()
    .domain([-1, 1])
    .range([0, 960]);



	
  const color = d3.scaleQuantile().domain(net_array)
.range(['#a50026','#d73027','#f46d43','#fdae61','#fee08b','#d9ef8b','#a6d96a','#66bd63','#1a9850','#006837']);

		
		
		const lineardiv = d3.scaleDiverging().domain(json_data.map(d=>d.net_amount))
//.range(['#a50026','#d73027','#f46d43','#fdae61','#fee08b','#d9ef8b','#a6d96a','#66bd63','#1a9850','#006837']);
   .interpolator(d3.interpolateRdBu);
		
		const linear = d3.scaleLinear()
	.domain(net_array)
  //.domain([-4000,-36606,3397,4000])
  .range(['#a50026','#d73027','#f46d43','#fdae61','#fee08b','#d9ef8b','#a6d96a','#66bd63','#1a9850','#006837']);

 


svg.append("g")
  .attr("class", "legendLinear")
  .attr("transform", "translate(20,0)");

var legendLinear = d3.legendColor()
  .shapeWidth(75)
  .orient('horizontal')
  .cells(9)
  .scale(color);

svg.select(".legendLinear")
.call(g => g.select(".domain").remove())
  .call(legendLinear);

//legend end
data=['Higher education','Material relief assistance and services','Multisector aid','Social/ welfare services','Strengthening civil society']




  g.selectAll('.border')
    .data(worldGeo.features)
    .join('path')
       .attr('class', 'border')
       .attr('d', path)
       .attr('fill', d => used_countries.indexOf(d.properties.name) == -1 ? lightgray : color(country_to_net[d.properties.name]))
       .attr('stroke', 'gray')
      .attr('stroke-width',0.5);
	  
	 g.append('text')
      .attr('x', width/2)
      .attr('y',margin.top + 100)
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'hanging')
      .text('Visualisation 2');
	  
}