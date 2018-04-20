// Dependencies
import React            from 'react';
import PropTypes        from 'prop-types';
import styled           from 'styled-components';
import uuid             from 'uuid';
import Rnd              from 'react-rnd';

// Components
import CrossWhite     from '../../assets/images/cross.svg';
import CrossBlue     from '../../assets/images/cross-blue.svg';

/**
 * The Day component is a component used to
 */
export default class Drill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }

    componentWillMount() {
        // console.log("-----Day");
    }

    render() {
        console.log(this.state);
        if (!this.state.editing) {
            return this.drill();
        } else {
            return this.editingDrill();
        }
    }

    componentDidMount() {
        // console.log("+++++Day");
    }

    // ========== Methods ===========

    editingDrill = () => {
        return (
            <Container>
                <EditDrill
                    type="text"
                    innerRef={comp => this.drillName = comp}
                    autoFocus={true}
                    onBlur={this.finishEdit}
                    onKeyPress={this.checkEnterOrEscape}
                    placeholder="Drill Name"
                    defaultValue={this.props.selectedPractice.drills[this.props.timeBlockString].name}
                    />
                <DeleteButton
                    iconWhite={CrossWhite}
                    iconBlue={CrossBlue}
                    onClick={this.props.removeDrill.bind({}, this.props.timeBlockString)} />
            </Container>
        );
    }

    drill = () => {
        return (
            <Container onClick={this.editDrill}>
                <Rnd
                    disableDragging={true}
                    className={"event-item"}
                    size={{ width: "100%",  height: `${this.props.selectedPractice.drills[this.props.timeBlockString].durationFactor}00%`}}
                    position={{ x: 0, y: 0 }}
                    enableResizing={{
                        bottom: true,
                        bottomLeft: false,
                        bottomRight: false,
                        left: false,
                        right: false,
                        top: false,
                        topLeft: false,
                        topRight: false
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                            let eventHourHeight = document.getElementsByClassName('event-hour')[0].clientHeight;
                            let to = Math.floor(ref.offsetHeight / eventHourHeight);
                            //this.props.editEventDuration(this.props.selectedDate.getFullYear(), this.props.selectedDate.getMonth(), this.props.selectedDate.day, hour, hour + to);
                      }}>
                  {this.props.selectedPractice.drills[this.props.timeBlockString].name}
                </Rnd>
                <DeleteButton
                    iconWhite={CrossWhite}
                    iconBlue={CrossBlue}
                    onClick={this.props.removeDrill.bind({}, this.props.timeBlockString)} />
            </Container>
        );
    }

    // ========== Methods ===========

    editDrill = () => {
        // Enter edit mode.
        this.setState({
            editing: !this.state.editing
        });
    };

    checkEnterOrEscape = (e) => {
        // The user hit *enter*, let's finish up.
        if (e.key === 'Enter') {
            this.finishEdit(e);
        } else if (e.key === "Escape") {
            this.finishEdit(e);
        }
    };

    finishEdit = (e) => {
        // Exit edit mode.
        e.stopPropagation();
        let name = this.drillName.value;
        this.props.editDrillName(this.props.timeBlockString, name);
        this.editDrill();
    }

}

// ============= PropTypes ==============

Drill.propTypes = {
    timeBlockString: PropTypes.string.isRequired,
    selectedPractice: PropTypes.object,
    editDrillDuration: PropTypes.func.isRequired,
    editDrillName: PropTypes.func.isRequired,
    removeDrill: PropTypes.func.isRequired
};

// ============= Styled Components ==============

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #d3224f;
`;

const EditDrill = styled.input`
    border-radius: 3px;
    appearance: none;
    padding: 0.6em 0.6em;
    margin: 0;
    width: 200px;
    height: 40px;
    background-color: ${props => props.theme.lightGray};
    border: none;
    font-size: 1.2em;
    font-weight: 500;
    color: ${props => props.theme.black};
    line-height: normal;
    text-align: center;
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.22);
`;

const DeleteButton = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 60px;
    height: 100%;
    background: none;
    background-image: ${props => 'url(' + props.iconWhite + ')'};
    background-position: 50%;
    background-size: 50%;
    background-repeat: no-repeat;
    z-index: 1;
    transition: background 0.2s;

    &:hover {
        background-image: ${props => 'url(' + props.iconBlue + ')'};
    }
`;
