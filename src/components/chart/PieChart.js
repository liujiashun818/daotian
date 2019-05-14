import React from 'react';
import ReactHighcharts from 'react-highcharts';
import createReactClass from 'create-react-class';

const PieChart = createReactClass({
  render() {
    const { title, name, unit, data, subtitle, angle, innerSize } = this.props;
    let colors = [
      '#7ab4ee',
      '#7dc756',
      '#f9a455',
      '#7f82ec',
      '#ff6599',
      '#434348',
      '#c1c1c1',
      '#5cd1b7',
      '#ff5c50',
      '#ffd500'];

    // 判断无数据
    if (data.length === 0) {
      data.push({ name: '无数据', y: 1 });
      colors = ['#ccc'];
    }

    const chart = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        type: 'pie',
        height: 260,
      },
      colors,
      title: {
        text: String(title) || '',
        align: 'center',
        verticalAlign: 'middle',
        style: {
          fontSize: '20px',
        },
        x: 0,
        y: -10,
      },
      subtitle: {
        text: subtitle || '',
        align: 'center',
        verticalAlign: 'middle',
        x: 0,
        y: 20,
        style: {
          fontSize: '14px',
        },
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>',
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
            format: `{point.name}({point.y}${unit || ''})`,
            style: {
              fontWeight: 'bold',
              color: 'black',
            },
          },
          startAngle: -angle || -180,
          endAngle: angle || 180,
          center: ['50%', '50%'],
          showInLegend: true,
        },

      },

      series: [
        {
          name: name || '占比',
          colorByPoint: true,
          innerSize: innerSize || '80%',
          data,
        }],
    };

    return React.createElement(ReactHighcharts, { config: chart });
  },
});

export default PieChart;
