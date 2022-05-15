import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LaunchPie = (props) => {

  let options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: props.shipName === "all" ? "SpaceX Launches 🚀" : "SpaceX Launches 🚀 : " + props.shipName
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Total Launches',
      colorByPoint: true,
      data: [...props.series]

      //     [{
      //   name: 'Chrome',
      //   y: 61.41,
      //   sliced: true,
      //   selected: true
      // }, {
      //   name: 'Internet Explorer',
      //   y: 11.84
      // }, {
      //   name: 'Firefox',
      //   y: 10.85
      // }, {
      //   name: 'Edge',
      //   y: 4.67
      // }, {
      //   name: 'Safari',
      //   y: 4.18
      // }, {
      //   name: 'Sogou Explorer',
      //   y: 1.64
      // }, {
      //   name: 'Opera',
      //   y: 1.6
      // }, {
      //   name: 'QQ',
      //   y: 1.2
      // }, {
      //   name: 'Other',
      //   y: 2.61
      // }]
    }]
  }


  return (
      <HighchartsReact
          highcharts={Highcharts}
          options={options}
      />
  )
}

export default LaunchPie