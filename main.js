Promise.all([
  d3.json('word_geo.json'),
  d3.json("Export_DataFrame.json"),
  d3.json('world-geo2.json'),
  d3.json('countries_data.json')
]).then(([worldGeo, json_data,worldGeo2,countries_data]) => {
  vis1(json_data, d3.select('#vis1'));
  vis2(worldGeo, json_data, d3.select('#vis2'));
  vis3(worldGeo2,countries_data,d3.select('#vis3'));
});
