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
             data= {chartData}
             chartSeries= {chartSeries}
             x= {this.x}
           />
            </Container>
        );
    }
    x = (i) => {
      return i.index;
    }

    componentDidMount() {

    }

}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: yellow;
    width: 60vw;


`;

var Chart = require('react-d3-core').Chart;
// require `react-d3-basic` for Line chart component.
var LineChart = require('react-d3-basic').LineChart;


var chartData = require('../../data/user_sample.json');


var chartSeries = [
    {
      field: 'age',
      name: 'Age',
      color: '#935999',
      style: {
        "stroke-width": 2,
        "stroke-opacity": .2,
        "fill-opacity": .2
      }
    }
  ];
