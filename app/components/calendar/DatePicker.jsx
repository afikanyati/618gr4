// Dependencies
import React                from 'react';
import PropTypes            from 'prop-types';
import styled               from 'styled-components';
import date                 from 'date-and-time';
import uuid                 from 'uuid';

// Components
import ArrowLight           from '../../assets/images/arrow-gray.svg';
import ArrowDark            from '../../assets/images/arrow-black.svg';


/**
 * The DatePicker component is a component used to
 */
export default class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            calendarDate: new Date(),
        }
    }

    componentWillMount() {
    }

    render() {
        return (
            <Container>
                <CalendarMonth>
                    <Arrow
                        direction={"left"}
                        grayIcon={`url(${ArrowLight})`}
                        darkGrayIcon={`url(${ArrowDark})`}
                        onClick={this.changeCalendarDate.bind({}, "backward")}/>
                    <MonthText>
                        {`${date.format(this.state.calendarDate, 'MMMM YYYY')}`}
                    </MonthText>
                    <Arrow
                        direction={"right"}
                        grayIcon={`url(${ArrowLight})`}
                        darkGrayIcon={`url(${ArrowDark})`}
                        onClick={this.changeCalendarDate.bind({}, "forward")} />
                </CalendarMonth>
                <Calendar>
                    <WeekHeader>
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index, arr) => {
                        return (
                          <WeekBox key={uuid.v4()}>{day}</WeekBox>
                        )})
                      }
                    </WeekHeader>
                    <CalendarDays>
                        {this.getDaysInMonth().map((day, index, arr) => {
                            if (day === null) {
                                return (
                                  <DayTextContainer key={uuid.v4()}
                                    isSelectedDay={false}
                                    hasPractice={false}/>
                                )
                            } else {
                                return (
                                    <DayTextContainer key={uuid.v4()}
                                        isSelectedDay={date.isSameDay(day, this.props.selectedDate)}
                                        hasPractice={this.props.practiceRecord[this.props.practiceKey(day)]}
                                        onClick={() => this.props.changeSelectedDate(day)}>
                                        {day.getDate()}
                                    </DayTextContainer>
                                )
                            }
                            })
                        }
                    </CalendarDays>
                </Calendar>
            </Container>
        );
    }

    componentDidMount() {
        this.setState({
          calendarDate: this.props.selectedDate,
        });
    }

    componentWillReceiveProps(nextProps) {

    }

    // ========== Methods ===========

    changeCalendarDate = (direction)=> {
        this.setState({
            calendarDate: date.addMonths(this.state.calendarDate, direction == "forward" ? 1 : -1),
        });
    };

    getDaysInMonth = () => {
        let year = this.state.calendarDate.getFullYear();
        let month = this.state.calendarDate.getMonth();
        let firstDayOfWeek = new Date(year, month, 1).getDay();
        let days = Array(firstDayOfWeek).fill(null);

        let day = new Date(year, month, 1);
        while (day.getMonth() == month) {
            days.push(day);
            day = date.addDays(day, 1);
        }
        return days;
    };
}

// ============= PropTypes ==============

DatePicker.propTypes = {
    selectedDate: PropTypes.object.isRequired,
    changeSelectedDate: PropTypes.func.isRequired,
    practiceRecord: PropTypes.object.isRequired,
    practiceKey: PropTypes.func.isRequired,
};

// ============= Styled Components ==============

const Container = styled.div`
    flex: 0.4;
    border-bottom: 1px solid #e0e0e0;
`;

const CalendarMonth = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
`;

const Calendar = styled.div`
    padding: 20px;
    height: calc(100% - 43px);
`;

const WeekHeader = styled.div`
    display: flex;
    flex-direction: row;
`;

const CalendarDays = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, 1fr);
    height: 100%;
`;

const WeekBox = styled.div`
    flex: calc(1/7);
    color: #757575;
    text-align: center;
`;

const DayTextContainer = styled.div`
    display: flex;
    color: ${props => props.isSelectedDay || props.hasPractice ? props.theme.white : "#212121"};
    background: ${props => props.isSelectedDay ?
            props.theme.red
        :
            props.hasPractice ?
                props.theme.blue
            :
                "none"
    };
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    cursor: pointer;
`;

const MonthText = styled.div`
    font-size: 1.5em;
    font-weight: 400;
    color: ${props => props.theme.pitchBlack};
`;

const Arrow = styled.div`
    width: 20px;
    height: 20px;
    background-image: ${props => props.grayIcon};
    background-position: 50%;
    background-size: 100%;
    background-repeat: no-repeat;
    margin: 0 20px;
    cursor: pointer;
    transform: ${props => props.direction == "left" ? "scaleX(-1)" : "none"};
    transition: all 0.2s;

    &:hover {
        background-image: ${props => props.darkGrayIcon};
    }
`;
