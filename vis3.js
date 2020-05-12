function vis3(worldGeo2,countries_data,div)
{
    const lightgray = '#dcdcdc';

  const margin = {top: 0, right: 0, bottom: 0, left: 0};
  const visWidth = 900 - margin.left - margin.right; 
  const visHeight = 800 - margin.top - margin.bottom;
 
  const svg = d3.select("#vis3")
	.append("svg")
		.attr("width",visWidth + margin.left + margin.right + 1000)
		.attr("height",visHeight + margin.top + margin.bottom );


  const g1 = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const g2 = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  // draw map
  
  const countries = countries_data.map(d=> d.country)
  
  const projection =  d3.geoNaturalEarth1()
      .fitSize([visWidth, visHeight], worldGeo2);

  const x = d3.scalePoint()
      .domain(countries)
      .range([0, visWidth]);
  
  
  const path = d3.geoPath().projection(projection);
  const outerRadius = x.step()/3;
  
  const color = d3.scaleOrdinal()
    .domain(countries)
    .range(['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e']);
  
    const pie = d3.pie()
      .value(d => d.count);

  const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(outerRadius);

  
const pieGroups = g2.selectAll('.pieGroup')
    .data(worldGeo2.features.filter(d=> d.purpose_name !=null))
    .join('g')
      .attr('class', 'pieGroup')
      .attr('transform', d => `translate(${path.centroid(d)})`);

  pieGroups.selectAll('path')
    .data(d => pie(d.purpose_name))
    .join('path')
      .attr('d', d => arc(d))
      .attr('fill', d => color(d.data.purpose_name))  
  
  g1.selectAll('.border')
    .data(worldGeo2.features)
    .join('path')
       .attr('class', 'border')
       .attr('d', path)
      .attr('fill',lightgray)
       .attr('stroke', 'gray')
 
    g1.append('text')
      .attr('x', visWidth / 2 )
      .attr('y', -margin.top +50)
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'hanging')
      .text('Visualisation 3');
  

// Legend
 const data_purpose=['Higher education','Material relief assistance and services','Multisector aid','Social/ welfare services','Strengthening civil society']

  
 /* const g3 = svg.append('g')
     // .attr('transform', `translate(${margin.left}, ${margin.top})`);
      .attr("transform", `translate(${visWidth - 50},20)`)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("g")
    .data(data_purpose)
    .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 15})`);


  
  g3.append("circle")
      .attr("cx", -10)
      .attr("cy", function(d,i){ return 0 + i*15}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .attr("fill",color);

 
  g3.append("text")
      .attr("x", -24)
      .attr("y", 5)
      .attr("dy", function(d,i){ return 0 + i*15})
      .text(d => d);*/
  
  
  const g3 = svg.append('g')
      .attr("transform", `translate(${visWidth - 50},20)`)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("g")
    .data(data_purpose)
    .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

  g3.append("rect")
      .attr("x", -10)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", color);

  g3.append("text")
      .attr("x", -24)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .text(d => d);

  

}