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
            <Container>
                <NoStats>
                    <Text>{`Select a ${supplementaryText} Statistic to View it's Visualization`}</Text>
                </NoStats>
            </Container>
        );
    }

    renderStatsWindow = () => {
        return (
            <Container>
                <LineChart
                 title= {"TITLE"}
                 width= {600}
                 height= {500}
                 margins= {margins}
                 data= {this.getChartData()}
                 chartSeries= {this.getChartSeries()}
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
      console.log("getting data");
      var data = require('../../data/fake_data.json');
      var chartData = [];
      if (this.props.selectedStat != "") {
        for (var p in data) {
          var point = data[p];
          if (point.stat == this.props.selectedStat.toLowerCase()) {
            chartData.push(point)
          }
        }
      }
      return chartData;
    }

    getChartTitle = () => {
      console.log("getting Title");
      var players = "";
      for (var player in this.props.selectedPlayers) {
        players = players + player + ", ";
        var series = {
          field: 'value',
          name: player,
          color: '#935999',
        }
        chartSeries.push(series);
      }

      var title = this.props.selectedStat + "Stats for " + players + "\\";
      console.log(title);
      return title;
    }

    getChartSeries = () => {
      console.log("getting Series");
      var chartSeries = [];
      for (var player in this.props.selectedPlayers) {
        console.log(this.props.selectedPlayers);
        var series = {
          field: 'value',
          name: this.props.selectedPlayers[player],
          color: colors[player],
        }
        chartSeries.push(series);
      }
      return chartSeries;
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

const NoStats = styled.div`
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

"use strict"
var Chart = require('react-d3-core').Chart;
// require `react-d3-basic` for Line chart component.
var LineChart = require('react-d3-basic').LineChart;
var margins = {left: 100, right: 100, top: 50, bottom: 50};
var colors = ['#ea5fa2', '#d3224f', '#7f1631', '#935999', '#65266d', '#3d1143','#dff2fc']


