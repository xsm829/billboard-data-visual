// 立即执行函数，防止变量污染 (function() {})();

// 柱状图模块1
(function () {
  // 1.实例化对象
  const data = [23,22,20,14,11,8,8,8,7,7,6,6,5,5,4,4,4,23,22,18,18,11,9,8,7,7,7,5,5];

  const xS = d3.scaleBand().domain([ "Novak Djokovic", "Rafael Nadal", "Roger Federer", "Pete Sampras", "Björn Borg", "James Connors", "Ivan Lendl","John McEnroe","Mats Wilander","Boris Becker", "Stefan Edberg","Rodney Laver", "John Newcombe","Kenneth Rosewall","Jim Courier","Guillermo Vilas","Serena Williams","Steffi Graf","Martina Navratilova","Chris Evert","Margaret Court","Monica Seles","Billie Jean King","Venus Williams","Evonne Goolagong Cawley","Justine Henin","Maria Scharapova","Martina Hingis"]).range([0, 1450]);
  const yS = d3.scaleLinear().domain([0,200]).range([200,0]);

  function initCanvas() {
      //定义画布空间
      d3.select('.bar .chart')
          .append('svg')
          .attr('width', 1500)
          .attr('height', 350)
          .attr('class', 'svg')
  }

  function drawX() {
      const xAxis = d3.axisBottom(xS)
          .ticks(7) //控制坐标轴上的刻度个数
          .tickSize(3) //控制刻度的大小
          .tickPadding(3) //设置标签数字与坐标轴的距离
          .tickFormat(d => {
              return d
          }) //设置标签数字的格式

      d3.select('.svg').append('g')
          .attr('transform', 'translate(25,200)')
          .attr('class', 'x-axis')
          .attr('stroke', 'rgb(255, 213, 0)')
          .call(xAxis)
  }


  function drawY() {
      const yAxis = d3.axisLeft(yS)
          .ticks(7) //控制坐标轴上的刻度个数
          .tickSize(3) //控制刻度的大小
          .tickPadding(3) //设置标签数字与坐标轴的距离
          .tickFormat(d => {
              return d
          }) //设置标签数字的格式

      d3.select('.svg').append('g')
          .attr('transform', 'translate(25,10)')
          .attr('class', 'y-axis')
          .attr('stroke', 'rgb(255, 213, 0)')
          .call(yAxis)
  }


  function drawRect() {
      //绘制柱状图的柱子 使用svg的rect标签绘制
      //还是绘制再坐标轴生成得.tick容器里面 基点是x坐标轴的位置
      //1. x = 0;
      //2. y = -height;
      //3. width = 20;
      //4. height = data[i]个
      const rect = d3.selectAll('.x-axis .tick')
          .append('rect')
          .attr('class', 'rect')
          .attr('transform', `translate(-10, 0)`)
          .attr('x', 0)
          .attr('width', 20)
          .attr('height', 0) //为了动画先置为0
          .attr('y', 0) //height过渡了y也要进行同样的过渡
          .attr('fill', '#2e6be6')
          .attr('cursor','pointer')

      rect.transition()
          .duration(2000) //添加持续时间
          .delay((d, i) => 200 * i) //持续过渡时间**叠加**
          .ease(d3.easeBounce) //过渡效果
          .attr('height', (d, i) => data[i])
          .attr('y', (d, i) => -data[i])

  }

  function drawText() {
      //绘制柱状图的柱子文本
      //还是绘制再坐标轴生成得.tick容器里面 基点是x坐标轴的位置
      const text = d3.selectAll('.x-axis .tick')
          .append('text')
          .attr('class', 'text')
          .attr('transform', `translate(0, 0)`)
          .attr('x', 0)
          .attr('y', 0)
          .text((d, i) => data[i])
          .attr('fill', '#2e6be6');

      //text也要进行相应的过渡
      text.transition()
          .duration(2000) //添加持续时间
          .delay((d, i) => 200 * i) //持续过渡时间**叠加**
          .ease(d3.easeBounce) //过渡效果
          .attr('y', (d, i) => -data[i] - 5)
  }

  //添加事件
  function addRectEvent() {
      d3.selectAll('.x-axis .tick .rect')
          .on('mouseover', (d, i) => {
              //绘制一个十字交错的tip, 也是往tick里面添加，就不用关心坐标位置的。

              //+2的目的是:nth-child是重1开始的，然后在咱们的dom结构中第一个是一个path
              //绘制横坐标
              d3.selectAll(`.x-axis .tick:nth-child(${i + 2})`)
                  .append('line')
                  .attr('class', 'tip-line')
                  .attr('x1', 0)
                  .attr('y1', 0)
                  .attr('x2', 0)
                  .attr('y2', -430)
                  .attr('stroke', 'rgb(255, 213, 0)')
                  .attr('fill', 'red');

              d3.select(`svg`)
                  .append('line')
                  .attr('class', 'tip-line')
                  .attr('x1', 50)
                  .attr('y1', d3.event.clientY)
                  .attr('stroke-dasharray', '2')
                  .attr('x2', 150)
                  .attr('y2', d3.event.clientY)
                  .attr('stroke', 'rgb(255, 213, 0)')
                  .attr('fill', 'red');

              d3.select(`svg`)
                  .append('text')
                  .attr('width', '50')
                  .attr('height', '50')
                  .attr('fill', 'red')
                  .attr('class', 'tip-line')
                  .attr('x', d3.event.clientX)
                  .attr('y', d3.event.clientY)
                  .text((d) => data[i])
          })
          .on('mouseout', () => {
              d3.selectAll('.tip-line').remove();
          })
  }

  (async function () {
      await initCanvas();
      await drawX();
      await drawY();
      await drawText();
      await drawRect();
      await addRectEvent();
  })();

})();





 