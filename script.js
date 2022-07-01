async function handleData() {
  let data = await d3.csv('2019.csv')

  // data = data.filter((prev, curr) => {
    
  // }, data)

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

  const graph = svg
    .append('g')

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

  // Scatter plot
  svg
  .append('g')
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', d => xscale(parseFloat(d.GDPPC)))
  .attr('cy', d => yscale(parseFloat(d.score)))
  .attr('r', 3)
  .style('fill', '#003800')

}

handleData()