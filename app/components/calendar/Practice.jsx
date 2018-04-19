// Dependencies
import React                from 'react';
import PropTypes            from 'prop-types';
import styled               from 'styled-components';
import uuid                 from 'uuid';
import date             from 'date-and-time';

// Components
import Plus                 from '../../assets/images/plus.svg';

/**
 * The Practice component is a component used to
 */
export default class Practice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            add: false
        }
    }

    componentWillMount() {
        // console.log("-----Practice");
    }

    render() {
        return (
            <Container>
                <Header>
                    <HeaderText>
                        Practices
                    </HeaderText>
                    <AddPracticeButton
                        active={this.state.add}>
                        <Icon
                            icon={`url(${Plus})`}
                            onClick={this.activeAddPractice}/>
                    </AddPracticeButton>
                </Header>
                <AddPracticeContainer
                    active={this.state.add}>
                    <Label
                        for="name">
                        Name:
                        <Input
                            width={"150px"}
                            innerRef={name => this.name = name}
                            name="name"
                            type="text" />
                    </Label>
                    <Label
                        for="name">
                        Start Time:
                        <Input
                            width={"150px"}
                            innerRef={startTime => this.startTime = startTime}
                            name="startTime"
                            type="text" />
                    </Label>
                    <CreateButton
                        onClick={this.handleCreatePractice}>
                        Create
                    </CreateButton>
                </AddPracticeContainer>
                <PracticeListContainer>
                    {this.props.practiceRecord[date.format(this.props.selectedDate, 'M/D/Y')]
                    && this.props.practiceRecord[date.format(this.props.selectedDate, 'M/D/Y')].map((practice, index) => {
                        console.log("hello");
                        return (
                            <PracticeItem
                                onClick={this.props.changeSelectedPractice.bind({}, index)}
                                key={uuid.v4()}>
                                {`${practice.name} | ${practice.startTime}`}
                            </PracticeItem>
                        );
                    })}
                </PracticeListContainer>
            </Container>
        );
    }

    componentDidMount() {
        // console.log("+++++Practice");
    }

    // ========== Methods ===========

    activeAddPractice = () => {
        if (this.state.add) {
            this.name.value = "";
            this.startTime.value = "";
        }
        this.setState({
            add: !this.state.add
        })
    }

    handleCreatePractice = (e) => {
        e.preventDefault();

        let name = this.name.value;
        let startTime = this.startTime.value;
        let timeObject = new Date();
        let hours = 16;  // TODO Replace with input from Time Selector
        let minutes = 20; // TODO Replace with input from Time Selector
        timeObject.setHours(hours, minutes);

        this.props.addPractice(name, timeObject);
    }
}

// ============= PropTypes ==============

Practice.propTypes = {
    selectedDate: PropTypes.object.isRequired,
    practiceRecord: PropTypes.object.isRequired,
    selectedPractice: PropTypes.number.isRequired,
    addPractice: PropTypes.func.isRequired,
    changeSelectedPractice: PropTypes.func.isRequired
};

// ============= Styled Components ==============

const Container = styled.div`
    position: relative;
    flex: 0.6;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

const AddPracticeContainer = styled.form`
    display: ${props => props.active ? "static" : "none"};
    visibility: ${props => props.active ? "visible" : "hidden"};
    opacity: ${props => props.active ? 1 : 0};
    width: 100%;
    padding: 0px 30px;
`;

const HeaderText = styled.h2`
    font-size: 1.5em;
    font-weight: 700;
    color: #212121;
    padding-left: 20px;
    margin: 0;
`;

const AddPracticeButton = styled.div`
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

const Icon = styled.div`
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
    transition: visibility 0.2s, opacity 0.2s;
    display: flex;
    width: 100%;
    font-weight: 700;
    justify-content: space-between;
    margin: 10px 0px;
`;


const CreateButton = styled.button`
    display: block;
    width: 60px;
    height: 40px;
    border-radius: 5px;
    background: ${props => props.theme.lightPurple};
    box-shadow: 0 4px 8px -2px rgba(0,0,0,.5), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    transition: box-shadow 0.15s background 0.2s;
    z-index: 1;
    cursor: pointer;
    color: ${props => props.theme.white};
    &:hover {
        box-shadow: 0 8px 16px -4px rgba(0,0,0,.5), 0 6px 2px -4px rgba(0,0,0,.2), 0 2px 10px 0 rgba(0,0,0,.12);
    }
`;

const PracticeListContainer = styled.ul`

`;

const PracticeItem = styled.li`
    cursor: pointer;
`
