function vis1(json_data,div)
{
	console.log(json_data);
  const margin = ({top: 40, right: 60, bottom: 50, left: 60});
  
  const barHeight = 25;
  
  const height = Math.ceil((json_data.length + 0.1) * barHeight) + margin.top + margin.bottom ;
  
  const width = 850;
  
  // const svg = d3.create("svg")
    //		  .attr("viewBox", [0, 0, width, height]);
  
  
  
  
  const svg = d3.select("#vis1")
	.append("svg")
		.attr("width",width + margin.left + margin.right)
		.attr("height",height + margin.top + margin.bottom + 100)
		.attr("transform", `translate(${margin.left-10}, ${margin.top})`);
  //const svg=svg.append('g')
	//.attr('transform', `translate(${0}, ${0})`);

  const x = d3.scaleLinear()
    .domain(d3.extent(json_data, d => d.net_amount))
    .rangeRound([margin.left, width - margin.right]);
  
  const y = d3.scaleBand()
    .domain(d3.range(json_data.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1);
  
  const xAxis = g => g
    .attr("transform", `translate(0,${height-margin.bottom+30})`)
    .call(d3.axisTop(x).ticks(width /80).tickFormat(tickFormat))
    // .call(d3.axisBottom(x).ticks(width / 80).tickFormat(tickFormat))
    // .call(g => g.select(".domain").remove())
      .append("text")
      .attr("fill", "black")
       .attr("font-family", "sans-serif")
       .attr("x", width/2)
      .attr("y", 20)
      .text("Net amount(Donated amount- Received Amount)");


const xAxis2 = g => g
    .attr("transform", `translate(0,${margin.top-20})`)
    // .call(d3.axisTop(x).ticks(width /80).tickFormat(tickFormat))
    .call(d3.axisBottom(x).ticks(width / 80).tickFormat(tickFormat))
    // .call(g => g.select(".domain").remove())
      .append("text")
      .attr("fill", "black")
       .attr("font-family", "sans-serif")
       .attr("x", width/2)
      .attr("y", -10)
      .text("Net amount (Donated amount- Received Amount)");

	
  const yAxis = g => g
    .attr("transform", `translate(${x(0)},0)`)
    .call(d3.axisLeft(y).tickFormat(i => json_data[i].name).tickSize(0).tickPadding(6))
    .call(g => g.selectAll(".tick text").filter(i => json_data[i].value < 0)
        .attr("text-anchor", "start")
        .attr("x", 6));  
 const tickFormat =  d3.formatPrefix(".1", 1e10) ;
  
  const extent=d3.extent(json_data,d=>d.net_amount)
  
  const linear = d3.scaleLinear()
  .domain([0,-36606,3397,4000])
  .range(["rgb(165, 0, 40)","rgb(251, 180, 104)","rgb(239, 246, 168)", "rgb(0, 105, 55)"]);

		
  svg.append("g")
    .selectAll("rect")
    .data(json_data)
    .join("rect")
      .attr("fill", d => d3.interpolateRdBu([d.net_amount > 0 ? 1 :-8]))
      // .attr("fill", d => d3.scaleDiverging().domain([extent[0],0,extent[1]]).interpolator(d3.interpolatePuOr))
      .attr("x", d => x(Math.min(d.net_amount, 0)))
      .attr("y", (d, i) => y(i))
      .attr("width", d => Math.abs(x(d.net_amount) - x(0)))
      .attr("height", y.bandwidth());

    svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("text")
    .data(json_data)
    .join("text")
      .attr("text-anchor", d => d.net_amount < 0 ? "end" : "start")
      .attr("x", d => x(d.net_amount) + Math.sign(d.net_amount) * 4)
      .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text(d => d.country);

  svg.append("g")
      .call(xAxis);
	  
	svg.append("g")
	  .call(xAxis2);	

  svg.append("g")
      .call(yAxis);

 svg.append('text')
  .attr('x', 225)
  .attr('y',margin.top +30 )
  .attr('font-family', 'sans-serif')
  .attr('text-anchor', 'middle')
  .attr('dominant-baseline', 'hanging')
  .text('Visualisation 1');

}