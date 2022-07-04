async function handleData() {
  let data = await d3.csv('2019.csv')

  const margin = {top: 10, right: 30, bottom: 30, left: 60}

  const GDPPCextent = d3.extent(data, d => parseFloat(d.GDPPC))
  console.log(GDPPCextent)
  const xscale = d3.scaleLinear()
    .domain(GDPPCextent) // number of values
    .range([0, 1000]) // width of #svg

  const scoreExtents = d3.extent(data, d => parseFloat(d.score))
  console.log(scoreExtents)
  const yscale = d3.scaleLinear()
    .domain(scoreExtents)
    .range([500, 0])

  const svg = d3
  .select('#svg')
  .append('svg')
    .attr('width', 1090)
    .attr('height', 540)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
  }

  var mousemove = function(e, data) {
    tooltip
      .html( `Country: ${data.region}<br>Happiness Score: ${data.score}<br>GDP per Capita: ${data.GDPPC}`)
      .style("left", `${d3.pointer(e)[0]}px`) // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      .style("top",  `${d3.pointer(e)[1]+150}px`)
  }

  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  var mouseleave = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }


  const bottomAxis = d3.axisBottom(xscale)
  const leftAxis = d3.axisLeft(yscale)

 
  // Scatter plot
  svg
  .append('g')
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
    .attr('cx', d => xscale(parseFloat(d.GDPPC)))
    .attr('cy', d => yscale(parseFloat(d.score)))
    .attr('r', 8)
    .style('fill', '#003800')
    .style('opacity', 0.3)
  .on('mouseover', mouseover)
  .on('mousemove', (e, data) => mousemove(e, data))
  .on('mouseleave', mouseleave)

  svg
  .append('g')
  // Position the group
  .attr('transform', `translate(0, 500)`)
  // generate the axis in the group
  .call(bottomAxis)

svg
  .append('g')
  .attr('transform', `translate(0, 0)`)
  .call(leftAxis)

  var tooltip = d3.select("#svg")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("position", "absolute")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px")

}

handleData()