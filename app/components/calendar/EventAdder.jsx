// Libs
import React                from 'react';
import PropTypes            from 'prop-types';
import styled               from 'styled-components';
import uuid                 from 'uuid';

// Components
import Plus                 from '../../assets/images/plus.svg';

/**
 * The EventAdder component is a component used to
 */
export default class EventAdder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            add: false,
            repeat: false,
            repeatType: "day",
            repeatDay: 1,
            repeatWeek: [this.props.getDayOfWeek(this.props.currentDate.year, this.props.currentDate.month, this.props.currentDate.day)],
            repeatMonth: [this.props.selection.day],
            repeatYear: [this.props.selection.month]
        }
    }

    componentWillMount() {
        // console.log("-----EventAdder");
    }

    render() {
        return (
            <Container>
                <EventHeader>
                    <EventText>
                        Event
                    </EventText>
                    <AddEventButton
                        active={this.state.add}>
                        <AddEventButtonIcon
                            icon={`url(${Plus})`}
                            onClick={this.toggleAdd}/>
                    </AddEventButton>
                </EventHeader>
                <Content>
                    <Label
                        for="name"
                        active={this.state.add}>
                        Name:
                        <Input
                            width={"150px"}
                            innerRef={name => this.name = name}
                            name="name"
                            type="text" />
                    </Label>
                    <Label
                        for="name"
                        active={this.state.add}>
                        Location:
                        <Input
                            width={"150px"}
                            innerRef={location => this.location = location}
                            name="name"
                            type="text" />
                    </Label>
                    <RepeatContainer active={this.state.add}>
                        <RepeatOptionsContainer>
                            <RepeatButton
                                repeat={this.state.repeat}
                                onClick={this.toggleRepeat}>
                                Repeat
                            </RepeatButton>
                            <RepeatLabelContainer active={this.state.repeat}>
                                <RepeatLabel
                                    highlighted={this.state.repeatType == "day"}
                                    onClick={this.changeRepeatType.bind({}, "day")}>
                                    Day
                                </RepeatLabel>
                                <RepeatLabel
                                    highlighted={this.state.repeatType == "week"}
                                    onClick={this.changeRepeatType.bind({}, "week")}>
                                    Week
                                </RepeatLabel>
                                <RepeatLabel
                                    highlighted={this.state.repeatType == "month"}
                                    onClick={this.changeRepeatType.bind({}, "month")}>
                                    Month
                                </RepeatLabel>
                                <RepeatLabel
                                    highlighted={this.state.repeatType == "year"}
                                    onClick={this.changeRepeatType.bind({}, "year")}>
                                    Year
                                </RepeatLabel>
                            </RepeatLabelContainer>
                        </RepeatOptionsContainer>
                        <RepeatSpecificationsContainer>
                            {this.state.repeat && this.state.repeatType == "day" ?
                                <DayRepeat>
                                    Every <Input
                                        type="text"
                                        name="dayInput"
                                        width={"50px"}
                                        defaultValue={this.state.repeatDay}
                                        innerRef={day => this.dayInput = day}
                                        onChange={this.changeRepeatDay} /> Day
                                </DayRepeat>
                            :
                                this.state.repeat && this.state.repeatType == "week" ?
                                    <WeekRepeat>
                                        {["S", "M", "T", "W", "T", "F", "S", "All"].map((weekday, index, arr)=> {
                                            return (
                                                <WeekRepeatItem
                                                    isAll={weekday == "All"}
                                                    onClick={this.changeRepeatWeek.bind({}, index)}
                                                    highlighted={this.state.repeatWeek.includes(index)}
                                                    key={uuid.v4()}>
                                                    {weekday}
                                                </WeekRepeatItem>
                                        )})}
                                    </WeekRepeat>
                                :
                                    this.state.repeat && this.state.repeatType == "month" ?
                                        <MonthRepeat>
                                            {this.props.range(1, this.props.getMonthDays(this.props.selection.year, this.props.selection.month) + 1).concat(["All"]).map((monthday, index, arr)=> {
                                                return (
                                                    <MonthRepeatItem
                                                        isAll={monthday == "All"}
                                                        onClick={this.changeRepeatMonth.bind({}, index + 1)}
                                                        highlighted={this.state.repeatMonth.includes(index + 1)}
                                                        key={uuid.v4()}>
                                                        {monthday}
                                                    </MonthRepeatItem>
                                            )})}
                                        </MonthRepeat>
                                    :
                                        this.state.repeat && this.state.repeatType == "year" ?
                                            <YearRepeat>
                                                {this.props.range(0, 12).concat(["All"]).map((month, index, arr)=> {
                                                    return (
                                                        <YearRepeatItem
                                                            isAll={month == "All"}
                                                            onClick={this.changeRepeatYear.bind({}, index)}
                                                            highlighted={this.state.repeatYear.includes(index)}
                                                            key={uuid.v4()}>
                                                            {month}
                                                        </YearRepeatItem>
                                                )})}
                                            </YearRepeat>
                                        :
                                            null
                            }
                        </RepeatSpecificationsContainer>
                    </RepeatContainer>
                </Content>
            </Container>
        );
    }

    componentDidMount() {
        // console.log("+++++EventAdder");
    }

    // ========== Methods ===========
    toggleRepeat = (e) => {
        e.preventDefault();

        this.setState({
            repeat: !this.state.repeat
        });
    }

    changeRepeatType = (type) => {
        this.setState({
            repeatType: type
        });
    }

    changeRepeatDay = () => {
        // Check if valid
        this.setState({
            repeatDay: this.dayInput.value
        });
    }

    changeRepeatWeek = (weekday) => {
        let weekdays = [...this.state.repeatWeek];
        let indexWeekday = weekdays.indexOf(weekday);
        if (indexWeekday > -1) {
            weekdays.splice(indexWeekday, 1);
        } else if (weekday == 7) {
            // Value is "All"
            if (weekdays.length == 7) {
                // Undo All
                weekdays = [];
            } else {
                // Add All
                weekdays = this.props.range(0,7);
            }
        } else {
            // Add day to repeatWeek
            weekdays.push(weekday);
        }
        // Check if valid
        this.setState({
            repeatWeek: weekdays
        });
    }

    changeRepeatMonth = (monthday) => {
        let monthdays = [...this.state.repeatMonth];
        let indexMonthday = monthdays.indexOf(monthday);
        console.log(indexMonthday);
        let numDaysInMonth = this.props.getMonthDays(this.props.selection.year, this.props.selection.month) + 1;
        console.log(numDaysInMonth, monthdays.length);
        if (indexMonthday > -1) {
            monthdays.splice(indexMonthday, 1);
        } else if (monthday == numDaysInMonth) {
            // Value is "All"
            if (monthdays.length == numDaysInMonth - 1) {
                // Undo All
                monthdays = [];
            } else {
                // Add All
                console.log("yoo");
                monthdays = this.props.range(1, numDaysInMonth);
            }
        } else {
            // Add day to repeatWeek
            monthdays.push(monthday);
        }
        console.log("MonthDays: ", monthdays);
        // Check if valid
        this.setState({
            repeatMonth: monthdays
        });
    }

    changeRepeatYear = (month) => {
        let months = [...this.state.repeatYear];
        let indexMonth = months.indexOf(month);
        if (indexMonth > -1) {
            months.splice(indexMonth, 1);
        } else if (month == 12) {
            // Value is "All"
            if (months.length == 12) {
                // Undo All
                months = [];
            } else {
                // Add All
                months = this.props.range(0, 12);
            }
        } else {
            // Add day to repeatWeek
            months.push(month);
        }
        // Check if valid
        this.setState({
            repeatYear: months
        });
    }

    toggleAdd = () => {
        if (this.state.add) {
            this.name.value = "";
            this.location.value = "";
        }
        this.setState({
            add: !this.state.add
        })
    }
}

// ============= PropTypes ==============

EventAdder.propTypes = {
    currentDate: PropTypes.object.isRequired,
    getDayOfWeek: PropTypes.func.isRequired,
    range: PropTypes.func.isRequired,
    getMonthDays: PropTypes.func.isRequired,
    selection: PropTypes.object.isRequired
};

// ============= Styled Components ==============

const Container = styled.div`
    position: relative;
    flex: 0.6;
`;

const EventHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

const Content = styled.form`
    height: calc(100% - 80px);
    width: 100%;
    padding: 0px 30px;
`;

const EventText = styled.h2`
    font-size: 1.5em;
    font-weight: 700;
    color: #212121;
    padding-left: 20px;
    margin: 0;
`;

const AddEventButton = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 5px;
    background: ${props => props.active ?
            props.theme.lightPurple
        :
            props.theme.lightGray};
    box-shadow: 0 4px 8px -2px rgba(0,0,0,.5), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    transition: box-shadow 0.15s background 0.2s;
    z-index: 1;
    cursor: pointer;

    &:hover {
        box-shadow: 0 8px 16px -4px rgba(0,0,0,.5), 0 6px 2px -4px rgba(0,0,0,.2), 0 2px 10px 0 rgba(0,0,0,.12);
    }
`;

const AddEventButtonIcon = styled.div`
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background: none;
    background-image: ${props => props.icon};
    background-position: 50%;
    background-size: 35px 35px;
    background-repeat: no-repeat;
`;

const Input = styled.input`
    border-radius: 3px;
    padding: 0.6em 0.6em;
    margin: 0;
    width: ${props => props.width};
    height: 40px;
    background-color: ${props => props.theme.lightGray};
    border: none;
    font-size: 1em;
    font-weight: 300;
    color: ${props => props.theme.black};
    line-height: normal;
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.22);
    margin: 0px 10px;
`;

const Label = styled.label`
    visibility: ${props => props.active ? "visible" : "hidden"};
    opacity: ${props => props.active ? 1 : 0};
    transition: visibility 0.2s, opacity 0.2s;
    display: flex;
    width: 100%;
    font-weight: 700;
    justify-content: space-between;
    margin: 10px 0px;
`;

const RepeatContainer = styled.div`
    visibility: ${props => props.active ? "visible" : "hidden"};
    opacity: ${props => props.active ? 1 : 0};
    transition: visibility 0.2s, opacity 0.2s;
    height: calc(100% - 74.38px - 30px);
    width: 100%;
`;

const RepeatButton = styled.button`
    display: block;
    width: 60px;
    height: 40px;
    border-radius: 5px;
    background: ${props => props.repeat ?
        props.theme.lightPurple
    :
        props.theme.lightGray
    };
    box-shadow: 0 4px 8px -2px rgba(0,0,0,.5), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    transition: box-shadow 0.15s background 0.2s;
    z-index: 1;
    cursor: pointer;
    color: ${props => props.repeat ?
        props.theme.white
    :
        "#757575"
    };
    &:hover {
        box-shadow: 0 8px 16px -4px rgba(0,0,0,.5), 0 6px 2px -4px rgba(0,0,0,.2), 0 2px 10px 0 rgba(0,0,0,.12);
    }
`;

const RepeatOptionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 40px;
`;

const RepeatLabelContainer = styled.div`
    visibility: ${props => props.active ? "visible" : "hidden"};
    opacity: ${props => props.active ? 1 : 0};
    transition: visibility 0.2s, opacity 0.2s;
    position: relative;
    display: inline-flex;
    flex-direction: row;
    height: 40px;
    width: calc(100% - 60px - 20px);
    margin-left: 20px;
    cursor: pointer;
`;

const RepeatLabel = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.25;
    font-weight: 700;
    border: ${props => props.highlighted ?
        "2px solid " + props.theme.lightPurple
    :
        "2px solid " + props.theme.lightGray
    };
    border-radius: 5px;
    margin: 0px 2.5px;
    transition: background 0.2s;
    font-size: 0.7em;
    cursor: pointer;
`;


const RepeatSpecificationsContainer = styled.div`
    display: flex;
    width: 100%;
    height: calc(100% - 40px);
    justify-content: center;
    align-items: center;
`;

const DayRepeat = styled.label`
    display: flex;
    font-weight: 700;
    justify-content: space-between;
    align-items: center;
`;

const WeekRepeat = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    height: 40px;
    width: calc(100% - 60px - 20px);
    cursor: pointer;
`;

const WeekRepeatItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0.25;
    font-weight: 700;
    background: ${props => props.isAll ?
        props.theme.lightPurple
    :
        "none"};
    color: ${props => props.isAll ?
        props.theme.white
    :
        "inherit"};
    border: ${props => props.highlighted ?
        "2px solid " + props.theme.lightPurple
    :
        !props.isAll ?
            "2px solid " + props.theme.lightGray
        :
            "none"
    };
    border-radius: 5px;
    font-size: 0.7em;
    cursor: pointer;
    margin: 0 2.5px;
`;

const MonthRepeat = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, 1fr);
    width: 60%;
`;

const MonthRepeatItem = styled.div`
    color: #757575;
    text-align: center;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    background: ${props => props.isAll ?
        props.theme.lightPurple
    :
        "none"};
    color: ${props => props.isAll ?
        props.theme.white
    :
        "inherit"};
    border: ${props => props.highlighted ?
        "2px solid " + props.theme.lightPurple
    :
        !props.isAll ?
            "2px solid " + props.theme.lightGray
        :
            "none"
    };
    border-radius: 5px;
    margin: 2.5px;
    font-size: 0.7em;
    cursor: pointer;
`;

const YearRepeat = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    height: 40px;
    width: 100%;
    cursor: pointer;
`;

const YearRepeatItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0.25;
    font-weight: 700;
    background: ${props => props.isAll ?
        props.theme.lightPurple
    :
        "none"};
    color: ${props => props.isAll ?
        props.theme.white
    :
        "inherit"};
    border: ${props => props.highlighted ?
        "2px solid " + props.theme.lightPurple
    :
        !props.isAll ?
            "2px solid " + props.theme.lightGray
        :
            "none"
    };
    border-radius: 5px;
    margin: 0px 2.5px;
    font-size: 0.7em;
    cursor: pointer;
`;
