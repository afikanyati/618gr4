import React                from 'react';
import PropTypes            from 'prop-types';
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
        if (this.props.selectedStat == '') {
            return this.renderEmptyStats();
        } else {
            return this.renderStatsWindow();
        }
    }

    renderEmptyStats = () => {
        let supplementaryText = this.props.selectedPosition == '' ? 'Position and' : '';
        return (
            <NoStatsContainer>
                <Text>{`Select a ${supplementaryText} Statistic to View it's Visualization`}</Text>
            </NoStatsContainer>
        );
    }

    renderStatsWindow = () => {
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

    componentDidMount() {

    }

    // ========== Methods ===========

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

}

// ============= PropTypes ==============

StatsWindow.propTypes = {
    selectedPosition: PropTypes.string.isRequired,
    selectedStat: PropTypes.string.isRequired,
    selectedPlayers: PropTypes.array.isRequired
};

// ============= Styled Components ==============

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 60vw;
`;

const NoStatsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const Text = styled.h2`
    font-size: ${props => props.size};
    font-weight: 700;
    color: ${props => props.theme.black};
    text-align: center;
    padding: 0px;
    margin: 0;
    max-width: 500px;
`;

// ============= D3 ==============

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
