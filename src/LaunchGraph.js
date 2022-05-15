import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LaunchGraph = (props) => {

  let options = {
    chart: {
      type: 'column'
    },
    title: {
      text: props.shipName === "all" ? "SpaceX Launches 🚀" : "SpaceX Launches 🚀 : " + props.shipName
    },
    xAxis: {
      categories: [...props.bucket]
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total launches'
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: ( // theme
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color
          ) || 'gray'
        }
      }
    },
    legend: {
      align: 'left',
      x: 50,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [...props.series]
  }

  return (
      <HighchartsReact
          highcharts={Highcharts}
          options={options}
      />
  )
}

export default LaunchGraph
