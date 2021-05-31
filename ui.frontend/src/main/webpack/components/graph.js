$(function () {

function drawLineChart() {
  // Set the dimensions of the canvas / graph
  //https://codepen.io/nguyenbq/pen/QNOZWE
  var margin = { top: 30, right: 0, bottom: 30, left: 25 },
    width = 600 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

  // Parse the date
  var parseDate = d3.time.format("%Y").parse;

  // Set the ranges
  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  // Define the axes
  var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
  //var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

  // Define the line
  var valueline = d3.svg
    .line()
    .x(function (d) {
      return x(d.year);
    })
    .y(function (d) {
      return y(d.close);
    });

  // Adds the svg canvas
  var svg = d3
    .select("#line-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Get the data
  d3.json("/etc.clientlibs/vanguard/clientlibs/clientlib-site/resources/json/data.json", function (error, data) {
    data["posts"].forEach(function (d) {
      d.year = parseDate(d.year);
      d.close = +d.close;
    });
    data["posts2"].forEach(function (d) {
      d.year = parseDate(d.year);
      d.close = +d.close;
    });
    // Scale the range of the data
    x.domain(
      d3.extent(data["posts2"], function (d) {
        return d.year;
      })
    );
    y.domain([
      0,
      d3.max(data["posts2"], function (d) {
        return d.close;
      }),
    ]);

    // Add the valueline path.
    svg
      .append("path") // Add the valueline path.
      .attr("class", "line")
      .attr("d", valueline(data["posts"]))
      .transition()
      .duration(1000)
      .attr("d", valueline(data["posts2"]));

    // Add the valueline path.
    svg
      .selectAll("circle")
      .data(data["posts2"])
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("r", 7.5)
      .attr("cx", function (d) {
        return x(d.year);
      })
      .attr("cy", function (d) {
        return y(1);
      })
      .transition()
      .duration(1000)
      .attr("cx", function (d) {
        return x(d.year);
      })
      .attr("cy", function (d) {
        return y(d.close);
      });
    console.log(data["posts2"]);
    svg
      .append("text")
      .attr(
        "transform",
        "translate(" +
          (width + 3) +
          "," +
          y(data["posts2"][data["posts2"].length - 1].close) +
          ")"
      )
      .attr("dy", "-0.5em")
      .attr("text-anchor", "start")
      .style("fill", "black")
      .style("opacity", 0)
      .transition()
      .duration(5000)
      .style("opacity", 1)
      .text("64%");

    // Add the X Axis
    svg
      .append("g") // Add the X Axis
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    // Add the Y Axis
    // svg
    //   .append("g") // Add the Y Axis
    //   .attr("class", "y axis")
    //   .call(yAxis);
  });
}

  var scrollMagicController = new ScrollMagic.Controller({
    globalSceneOptions: {
      duration: 0,
      reverse: true,
      offset: 100,
      triggerHook: "onEnter",
    },
  });
  new ScrollMagic.Scene({
    triggerElement: ".line-chart",
    duration: $(".line-chart").height(),
  })
    .on("enter", function () {
      $(".line-chart").html("");
      $(".growth_info").hide();
      drawLineChart();
      setTimeout(function () {
        $(".growth_info").fadeIn();
      }, 1500);
    })
    .addTo(scrollMagicController);
});
