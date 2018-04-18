// Libs
import React                from 'react';
import PropTypes            from 'prop-types';
import styled               from 'styled-components';
import uuid                 from 'uuid';
import update               from 'immutability-helper';

// Components
import ArrowLight           from '../../assets/images/arrow-gray.svg';
import ArrowDark            from '../../assets/images/arrow-black.svg';

/**
 * The Word component is a component used to
 */
export default class Month extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            calendarSelection: {
                day: 0,
                month: 0,
                year: 0
            }
        }
    }

    componentWillMount() {
        // console.log("-----Month");
    }

    render() {
        return (
            <Container>
                <CalendarMonth>
                    <Arrow
                        direction={"left"}
                        grayIcon={`url(${ArrowLight})`}
                        darkGrayIcon={`url(${ArrowDark})`}
                        onClick={this.changeCalendarSelection.bind({}, "backward")}/>
                    <MonthText>
                        {`${monthMap[this.state.calendarSelection.month]} ${this.state.calendarSelection.year}`}
                    </MonthText>
                    <Arrow
                        direction={"right"}
                        grayIcon={`url(${ArrowLight})`}
                        darkGrayIcon={`url(${ArrowDark})`}
                        onClick={this.changeCalendarSelection.bind({}, "forward")} />
                </CalendarMonth>
                <Calendar>
                    <WeekHeader>
                        <WeekBox
                            isCurrentDay={false}
                            isDay={false}>
                            S
                        </WeekBox>
                        <WeekBox
                            isCurrentDay={false}
                            isDay={false}>
                            M
                        </WeekBox>
                        <WeekBox
                            isCurrentDay={false}
                            isDay={false}>
                            T
                        </WeekBox>
                        <WeekBox
                            isCurrentDay={false}
                            isDay={false}>
                            W
                        </WeekBox>
                        <WeekBox
                            isCurrentDay={false}
                            isDay={false}>
                            T
                        </WeekBox>
                        <WeekBox
                            isCurrentDay={false}
                            isDay={false}>
                            F
                        </WeekBox>
                        <WeekBox
                            isCurrentDay={false}
                            isDay={false}>
                            S
                        </WeekBox>
                    </WeekHeader>
                    <CalendarDays>
                        {this.getDaysInMonth().map((day, index, arr) => {
                            let lastIndex = arr.lastIndexOf(day);
                            return (
                                <DayTextContainer
                                    isSelectedDay={this.props.selection.year == this.state.calendarSelection.year && this.props.selection.month == this.state.calendarSelection.month && this.props.selection.day == day && lastIndex == index}
                                    isDay={true}
                                    key={uuid.v4()}
                                    onClick={this.handleSelection.bind({}, day, index, arr)}>
                                    {day}
                                </DayTextContainer>
                            )})
                        }
                    </CalendarDays>
                </Calendar>
            </Container>
        );
    }

    componentDidMount() {
        // console.log("+++++Month");
        let calendarSelection = {};
        calendarSelection = update(calendarSelection, {
            day: {$set: this.props.selection.day},
            month: {$set: this.props.selection.month},
            year: {$set: this.props.selection.year}
        });

        this.setState({
            calendarSelection: calendarSelection
        });
    }

    componentWillReceiveProps(nextProps) {

    }

    // ========== Methods ===========

    changeCalendarSelection = (direction)=> {
        let calendarSelection = this.state.calendarSelection;
        let month = this.state.calendarSelection.month;
        let year = this.state.calendarSelection.year;

        if (direction == "forward") {
            if (month == 11) {
                month = 0;
                year += 1;
            } else {
                month += 1;
            }
        } else {
            if (month == 0) {
                month = 11;
                year -= 1;
            } else {
                month -= 1;
            }
        }

        calendarSelection.month = month;
        calendarSelection.year = year;

        calendarSelection = update(calendarSelection, {
            month: {$set: month},
            year: {$set: year}
        });

        this.setState({
            calendarSelection: calendarSelection
        });
    }

    handleSelection = (day, index, arr) => {
        let lastIndex = arr.lastIndexOf(day);
        let month = this.state.calendarSelection.month;
        if (lastIndex != index) {
            month = month - 1 > 0 ? month - 1: 11;
        }
        this.props.changeSelection(this.state.calendarSelection.year, month, day);
        let newCalendarSelection = {
            day: day,
            month: month,
            year: this.state.calendarSelection.year
        };
        this.setState({
            calendarSelection: newCalendarSelection
        });
    }

    getDaysInMonth = () => {
        let days = [];
        let getDayOfWeekFirstDay = this.props.getDayOfWeek(this.state.calendarSelection.year, this.state.calendarSelection.month, 1);
        if (getDayOfWeekFirstDay != 0) {
            let i = getDayOfWeekFirstDay;
            let month = this.state.calendarSelection.month - 1 < 0 ? 11 : this.state.calendarSelection.month - 1;
            let year = this.state.calendarSelection.month - 1 < 0 ? this.state.calendarSelection.year - 1 : this.state.calendarSelection.year;
            let daysInLastMonth = this.props.getMonthDays(year, month);
            while (i > 0) {
                days.unshift(daysInLastMonth);
                i-=1;
                daysInLastMonth -= 1;
            }
        }
        days = days.concat(this.props.range(1, this.props.getMonthDays(this.state.calendarSelection.year, this.state.calendarSelection.month) + 1));
        return days;
    }

}

// ============= PropTypes ==============

Month.propTypes = {
    currentDate: PropTypes.object.isRequired,
    selection: PropTypes.object.isRequired,
    changeSelection: PropTypes.func.isRequired,
    getDayOfWeek: PropTypes.func.isRequired,
    range: PropTypes.func.isRequired,
    getMonthDays: PropTypes.func.isRequired
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
    color: ${props => props.isSelectedDay ?
        props.theme.white
    :
        "#212121"};
    background: ${props => props.isSelectedDay ?
        props.theme.lightPurple
    :
        "none"};
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    cursor: pointer;
`;

const MonthText = styled.div`
    font-size: 1.5em;
    font-weight: 400;
    color: #757575;
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

// ============= Constants ==============

const years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019','2020', '2021', '2022', '2023', '2024', '2025'];
const monthMap = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};

let monthStamps = [];
for (let i = 0; i < years.length; i++) {
    for (let j = 0; j < 12; j++){
        let stamp = {
            month: j,
            year: i
        };
        monthStamps.push(stamp);
    }
}
