// Dependencies
import React                from 'react';
import PropTypes            from 'prop-types';
import styled               from 'styled-components';
import uuid                 from 'uuid';
import date             from 'date-and-time';
import InputRange from 'react-input-range';

// Components
import 'react-input-range/lib/css/index.css';

// Settings
const minStartTime = new Date(1,1,1,16,0);
const maxEndTime = new Date(1,1,1,22,0);
const timeIncrements = 30;  // in minutes
const defaultTimeRange = {
  min: Math.max(0, date.subtract(new Date(1,1,1,17,0), minStartTime).toMinutes()),
  max: Math.min(
    date.subtract(maxEndTime, minStartTime).toMinutes(),
    date.subtract(maxEndTime, new Date(1,1,1,19,0)).toMinutes()
  ),
};

/**
 * The Practice component is a component used to
 */
export default class Practice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        // console.log("-----Practice");
    }

    render() {
        if (!this.props.selectedPractice && this.description) {
            this.description.value = "";
        } else if (this.props.selectedPractice && this.description) {
            this.description.value = this.props.selectedPractice.description;
        }
        return (
            <Container>
                <Header>
                    <Text
                        size={'1.5em'}
                        center={true}>
                        Practice
                    </Text>
                </Header>
                <PracticeButtonContainer>
                    <PracticeButton
                        active={this.props.selectedPractice}
                        onClick={() => {this.togglePractice(true)}}>Yes</PracticeButton>
                    <PracticeButton
                        active={!this.props.selectedPractice}
                        onClick={() => {this.togglePractice(false)}}>No</PracticeButton>
                </PracticeButtonContainer>
                <AddPracticeContainer active={true}>
                    <Text
                        size={'1em'}
                        center={true}>
                        Time
                    </Text>
                    <TimeInputContainer>
                        <InputRange
                          disabled={!this.props.selectedPractice}
                          draggableTrack={true}
                          formatLabel={this.formatTimeLabel}
                          maxValue={date.subtract(maxEndTime, minStartTime).toMinutes()}
                          minValue={0}
                          step={timeIncrements}
                          value={!this.props.selectedPractice ? defaultTimeRange : {
                              min: date.subtract(this.props.selectedPractice.startTime, minStartTime).toMinutes(),
                              max: date.subtract(this.props.selectedPractice.endTime, minStartTime).toMinutes(),
                            }}
                          onChange={timeRange => this.setPracticeTime(timeRange)} />
                    </TimeInputContainer>
                    <Label
                        for="Description"
                        center={false}>
                        Description:
                    </Label>
                    <Description
                        disabled={!this.props.selectedPractice}
                        width={"150px"}
                        innerRef={description => this.description = description}
                        name="description"
                        type="text"
                        placeholder={!this.props.selectedPractice ? "Enable practice to enter description..." : "What is the focus of this practice?"}
                        defaultValue={this.props.selectedPractice ? this.props.selectedPractice.description : ""}
                        onChange={() => this.props.setPracticeDescription(this.description.value)} />
                </AddPracticeContainer>
            </Container>
        );
    }

    componentDidMount() {
        // console.log("+++++Practice");
    }

    // ========== Methods ===========

     formatTimeLabel = (value, type) => {
       return date.format(date.addMinutes(minStartTime, value), 'h:mm');
     };

     setPracticeTime = (timeRange) => {
       this.props.setPracticeTime(
          date.addMinutes(minStartTime, timeRange.min),
          date.addMinutes(minStartTime, timeRange.max)
       );
     };

     togglePractice = (on) => {
        if (on) {
            this.props.setPracticeTime(
              date.addMinutes(minStartTime, defaultTimeRange.min),
              date.addMinutes(minStartTime, defaultTimeRange.max)
            );
        } else {
          this.props.setPracticeTime(null, null);
        }
     };
}

// ============= PropTypes ==============

Practice.propTypes = {
    selectedDate: PropTypes.object.isRequired,
    selectedPractice: PropTypes.object,
    setPracticeDescription: PropTypes.func.isRequired,
    setPracticeTime: PropTypes.func.isRequired
};

// ============= Styled Components ==============

const Container = styled.div`
    position: relative;
    flex: 0.6;
`;

const Header = styled.div`
    padding: 10px;
`;

const Text = styled.h2`
    font-size: ${props => props.size};
    font-weight: 700;
    color: ${props => props.theme.black};
    text-align: ${props => props.center ?
            "center"
        :
            "left"
    };
    padding: 20px;
    padding-left: 20px;
    padding-bottom: 10px;
    margin: 0;
`;

const AddPracticeContainer = styled.form`
    display: ${props => props.active ? "static" : "none"};
    visibility: ${props => props.active ? "visible" : "hidden"};
    opacity: ${props => props.active ? 1 : 0};
    width: 100%;
    padding: 0px 30px;
`;

const PracticeButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0px 30px;
`;

const PracticeButton = styled.button`
    width: 45%;
    height: 50px;
    border-radius: 5px;
    background: ${props => props.active ? props.theme.red : props.theme.lightGray};
    color: ${props => props.active ? props.theme.white : "inherit"};
    font-size: 1.2em;
    box-shadow: 0 4px 8px -2px rgba(0,0,0,.5), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    transition: box-shadow 0.15s background 0.2s;
    z-index: 1;
    cursor: pointer;

    &:hover {
        box-shadow: 0 8px 16px -4px rgba(0,0,0,.5), 0 6px 2px -4px rgba(0,0,0,.2), 0 2px 10px 0 rgba(0,0,0,.12);
    }
`;

const TimeInputContainer = styled.div`
    margin: 40px;
`;

const Description = styled.textarea`
    border-radius: 3px;
    padding: 0.5em 0.5em;
    margin: 0;
    width: 100%;
    height: 60px;
    background-color: ${props => props.theme.lightGray};
    border: none;
    font-size: 1em;
    font-weight: 300;
    color: ${props => props.theme.black};
    line-height: normal;
    box-shadow: ${props => props => props.disabled ? 'none' : 'inset 0 2px 5px rgba(0,0,0,0.22);'};
    resize: none;
`;

const Label = styled.label`
    transition: visibility 0.2s, opacity 0.2s;
    display: flex;
    width: 100%;
    font-weight: 700;
    justify-content: space-between;
    margin: 10px 0px;
`;
