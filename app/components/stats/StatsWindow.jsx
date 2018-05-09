import React                from 'react';
import ReactDOM             from 'react-dom';
import PropTypes            from 'prop-types';
import styled               from 'styled-components';
import {LineChart}          from 'react-d3-basic';


const colors = ['#ea5fa2', '#d3224f', '#7f1631', '#935999', '#65266d', '#3d1143','#dff2fc'];


export default class StatsWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          size: { w: 0, h: 0 },
        }
    }

    componentWillMount() {
    }

    render() {
        if (this.props.selectedStat === '' || this.props.selectedPlayers === []) {
            return this.renderEmptyStats();
        } else {
            return this.renderStatsWindow();
        }
    }

    renderEmptyStats = () => {
        let supplementaryText = this.props.selectedPosition === '' ? 'Position and' : '';
        return (
            <Container>
                <NoStats>
                    <Text>{`Select a ${supplementaryText} Stat to View its Visualization`}</Text>
                </NoStats>
            </Container>
        );
    };

    renderStatsWindow = () => {
      if (this.props.selectedPlayers.length === 0) {
        return this.renderEmptyStats();
      } else {
        let margins = {left: 25, right: 10, top: 50, bottom: 20};
        return (
          <Container>
            <LineChart
              title={"TITLE"}
              width={this.state.size.w - margins.left - margins.right}
              height={this.state.size.h - margins.top - margins.bottom}
              margins={margins}
              data={this.getChartData()}
              chartSeries={this.getChartSeries()}
              x={point => point.game}
              xScale={"ordinal"}
              xTicks={[2]}
              yTicks={[1]}
              xLabel={"Game Number"}
            />
          </Container>
        );
      }
    };

    componentDidMount() {
      window.addEventListener('resize', () => {this.handleResize()});
      this.handleResize();
    }

    componentWillReceiveProps() {
      this.handleResize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    // ========== Methods ===========

    handleResize() {
      let elem = ReactDOM.findDOMNode(this);
      const w = elem.offsetWidth;
      const h = elem.offsetHeight;
      const currentSize = this.state.size;
      if (w !== currentSize.w || h !== currentSize.h) {
        this.setState({
          size: { w, h },
        });
      }
    };

    getChartData = () => {
      console.log("Fetching data");

      return require('../../data/fake_data.json')
        .filter((item) => {
          return (
            item.stat.toLowerCase() === this.props.selectedStat.toLowerCase()
            && this.props.selectedPlayers.every(player => player in item));
        });
    };

    getChartSeries = () => {
      console.log("Extracting series");

      return this.props.selectedPlayers
        .map((player, index) => {
          return {
            field: player,
            name: player,
            color: colors[index],
          };
        });
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
    flex: 0.8;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
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

