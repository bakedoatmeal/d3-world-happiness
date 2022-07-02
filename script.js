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

  // // line generator
  // const linegen = d3.line()
  // .x(d => xscale(d.GDPPC))
  // .y(d => yscale(d.score))
  // .curve(d3.curveLinear)

  const svg = d3
  .select('#svg')
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


  //   // line generator
  // const linegen = d3.line() // create a line generator
  // .x((d) => xscale(parseFloat(d.GDPPC))) // map the x to the index
  // .y(d => yscale(parseFloat(d.score))) // map y to percipitation
  // .curve(d3.curveLinear) // apply a curve type

  // graph
  // .append('path') // append a path
  // .attr('d', linegen(data)) // generate a line
  // .attr('stroke-width', 3)
  // .attr('stroke', 'cornflowerblue')
  // .attr('fill', 'none')

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

}

handleData()