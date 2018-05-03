// Dependencies
import React            from 'react';
import PropTypes        from 'prop-types';
import styled           from 'styled-components';
import uuid             from 'uuid';
import date             from 'date-and-time';
import _                from 'lodash';

// Components
import Drill                from './Drill';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';



/**
 * The DrillSchedule component is a component used to
 */
export default class DrillSchedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          draggingSomething: false,
        }
    }

    componentWillMount() {
        // console.log("-----DrillSchedule");
    }

    render() {
        if (this.props.selectedPractice) {
            return this.renderDrillSchedule();
        } else {
            return this.renderPracticeSelectorMessage();
        }
    }

    componentDidMount() {
        // console.log("+++++DrillSchedule");
    }

    // ========== View Methods ===========

      renderDrillSchedule = () => {
        let timeBlocks = this.getTimeBlocks();

        return (
          <PracticeContainer>
            <TimeColumn>
              {
                timeBlocks.map((timeBlock, index) => {
                  let timeBlockString = this.timeBlockKey(timeBlock);
                  return (
                      <TimeBlockLabel
                        height={`${100/timeBlocks.length}%`}
                        numBlocks={timeBlocks.length}
                        key={uuid.v4()}
                      >
                        {timeBlockString}
                      </TimeBlockLabel>
                  );
                })
              }
            </TimeColumn>

            <DrillColumn>
              <this.drillListConstructor
                distance={0} // make sure we can get normal click events on child items, see documentation
                drills={this.props.selectedPractice.drills}
                height={`${this.props.selectedPractice.drillDuration * 100 / timeBlocks.length}%`}
                helperClass={"beingDragged"}
                lockAxis={"y"}
                lockToContainerEdges={true}
                onSortStart={() => this.setState({draggingSomething: true})}
                onSortEnd={this.onSortEnd}
                shouldCancelStart={this.shouldCancelStart}
              />
              <AddDrill
                onClick={this.addDrill}
                height={`${100 - this.props.selectedPractice.drillDuration * 100/timeBlocks.length}%`}
              >
                <AddDrillHelp>Click to add a Drill</AddDrillHelp>
              </AddDrill>
            </DrillColumn>

          </PracticeContainer>
        );
    };

    renderPracticeSelectorMessage = () => {
        return (
            <EmptySchedule>
                <Text>Activate Today's Practice<br/>to Create a Schedule</Text>
            </EmptySchedule>
        );
    };

    // ========== Methods ===========

    drillItemConstructor = SortableElement(({drill, drillIndex}) => (
      <Drill
        height={`${drill.duration * 100 / this.props.selectedPractice.drillDuration}%`}
        updateDrills={this.props.updateDrills}
        drill={drill}
        drillIndex={drillIndex}
        selectedPractice={this.props.selectedPractice}
        draggingSomething={this.state.draggingSomething}
      />)
    );

    drillListConstructor = SortableContainer(({drills, height}) => (
      <DrillList height={height}>
        {
            drills.map((drill, index) => <this.drillItemConstructor
                key={`item-${index}`}
                index={index}
                drill={drill}
                drillIndex={index}
            />)
        }
      </DrillList>)
    );

    shouldCancelStart = (e) => {
      // Cancel sorting if the event target is an `input`, `textarea`, `select` or `option`
      const disabledElements = ['input', 'textarea', 'select', 'option', 'button'];
      if (disabledElements.indexOf(e.target.tagName.toLowerCase()) !== -1) {
        return true; // cancel sorting
      }
      if (e.target.classList.contains('notDragTarget')) {
        return true; // cancel sorting
      }
    };

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({draggingSomething: false});
        this.props.selectedPractice.drills = arrayMove(this.props.selectedPractice.drills, oldIndex, newIndex);
        this.props.updateDrills();
    };

    getTimeBlocks = () => {
      let startTime = this.props.selectedPractice.startTime;
      let endTime = this.props.selectedPractice.endTime;
      let duration = date.subtract(endTime, startTime).toMinutes();
      return _.range(0, duration, this.props.timeIncrements).map((offset) => {return date.addMinutes(startTime, offset)})
    };

    timeBlockKey = (timeBlock) => { return date.format(timeBlock, 'h:mm A') };

    addDrill = () => {
        if (this.props.selectedPractice.drillDuration >= this.props.selectedPractice.practiceDuration) {
            return;
        }

        let drills = this.props.selectedPractice.drills;
        drills.push({
          name: "Drill",
          duration: 1,
        });
        this.props.selectedPractice.drillDuration += 1;

        this.props.updateDrills();
    }
}

// ============= PropTypes ==============

DrillSchedule.propTypes = {
    selectedPractice: PropTypes.object,
    timeIncrements: PropTypes.number.isRequired,
    updateDrills: PropTypes.func.isRequired,
};

// ============= Styled Components ==============

const PracticeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex: ${props => 'calc(1/' + props.numBlocks + ')'};
    height: 100%;
    width: 100%;
`;

const TimeColumn = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const TimeBlockLabel = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    border-right: 1px solid #e0e0e0;
    height: ${props => props.height};
    width: 100px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
`;

const DrillColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.lightGray};
`;

const DrillList = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  height: ${props => props.height};
  cursor: grab;
`;

const AddDrill = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${props => props.height};
    
    &:hover>*{
        visibility: visible;
    }
`;

const AddDrillHelp = styled.h2`
    font-size: ${props => props.size};
    font-weight: 700;
    color: ${props => props.theme.black};
    text-align: center;
    padding: 0px;
    margin: 0;
    visibility: hidden;
`;

const EmptySchedule = styled.div`
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
`;
