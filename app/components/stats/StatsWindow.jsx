import React                from 'react';
import styled               from 'styled-components';
import date                 from 'date-and-time';


export default class StatsWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {

    }


    render() {
        return (
            <Container>
            <LineChart
             width= {600}
             height= {500}
             showXGrid= {false}
             data= {this.getChartData()}
             chartSeries= {chartSeries}
             x= {this.x}
           />
            </Container>
        );
    }
    x = (i) => {
      return i.index;
    }

    getChartData = () => {
      console.log(this.props);
      var data = require('../../data/fake_data.json');
      var chartData = [];
      console.log(data);
      if (this.props.selectedStat != "") {
        for (var p in data) {
          var point = data[p];
          if (point.stat == this.props.selectedStat) {
            chartData.push(point)
          }
        }
      }
      console.log(chartData);
      return chartData;
    }



    componentDidMount() {

    }

}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 60vw;

`;


var Chart = require('react-d3-core').Chart;
// require `react-d3-basic` for Line chart component.
var LineChart = require('react-d3-basic').LineChart;

var chartSeries = [
    {
      field: 'value',
      color: '#935999',
      style: {
        "stroke-width": 2,
        "stroke-opacity": .2,
        "fill-opacity": .2
      }
    }
  ];