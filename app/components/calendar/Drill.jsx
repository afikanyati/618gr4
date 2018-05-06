// Dependencies
import React            from 'react';
import PropTypes        from 'prop-types';
import styled           from 'styled-components';

// Components
import CrossWhite     from '../../assets/images/cross-white.svg';
import CrossGray     from '../../assets/images/cross-gray.svg';
import CrossBlue     from '../../assets/images/cross-blue.svg';
import PlusWhite     from '../../assets/images/plus-white.svg';
import PlusGray     from '../../assets/images/plus-gray.svg';
import PlusBlue     from '../../assets/images/plus-blue.svg';
import MinusWhite     from '../../assets/images/minus-white.svg';
import MinusGray     from '../../assets/images/minus-gray.svg';
import MinusBlue     from '../../assets/images/minus-blue.svg';

/**
 * The Day component is a component used to
 */
export default class Drill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }

    componentWillMount() {
        // console.log("-----Day");
    }

    render() {
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
          <DrillItem
            height={this.props.height}
            onMouseLeave={() => this.setState({editing: false})}
          >
            <EditDrill
                type="text"
                innerRef={comp => this.drillName = comp}
                autoFocus={true}
                placeholder="Drill Name"
                defaultValue={this.props.drill.name == 'Unnamed Drill' ? '' : this.props.drill.name}
                onChange={() => {
                  this.props.drill.name = this.drillName.value.length == 0 ? 'Unnamed Drill' : this.drillName.value;
                  this.props.updateDrills();
                }}
            />
            <MinusButton
              enabled={this.props.selectedPractice.drillDuration > 1}
              className={'activateOnHover notDragTarget'}
              iconWhite={MinusWhite}
              iconBlue={MinusBlue}
              iconGray={MinusGray}
              onClick={(e) => {
                e.stopPropagation();
                this.changeDuration(-1);
                this.drillName.focus();
                this.drillName.setSelectionRange(0, this.drillName.value.length);
              }} />
            <PlusButton
              enabled={this.props.selectedPractice.drillDuration < this.props.selectedPractice.practiceDuration}
              className={'activateOnHover notDragTarget'}
              iconWhite={PlusWhite}
              iconBlue={PlusBlue}
              iconGray={PlusGray}
              onClick={(e) => {
                e.stopPropagation();
                this.changeDuration(1);
                this.drillName.focus();
                this.drillName.setSelectionRange(0, this.drillName.value.length);
            }} />
            <DeleteButton
              className={'activateOnHover notDragTarget'}
              iconWhite={CrossWhite}
              iconBlue={CrossBlue}
              iconGray={CrossGray}
              onClick={(e) => {
                e.stopPropagation();
                this.removeDrill();
              }}
            />

          </DrillItem>
        );
    };

    drill = () => {
      return (
        <DrillItem
          height={this.props.height}
          onMouseOver={this.handleDrillItem}
        >
          {this.props.drill.name}
        </DrillItem>
      )
    };

    // ========== Methods ===========

    removeDrill = () => {
      this.props.selectedPractice.drills.splice(this.props.drillIndex, 1);
      this.props.selectedPractice.drillDuration -= this.props.drill.duration;
      this.props.updateDrills();
    };

    changeDuration = (amount) => {
        if (amount !== 1 && amount !== -1) {
        return;
        }

        if (this.props.drill.duration + amount < 1) {
        return;
        }

        let practice = this.props.selectedPractice;
        if (practice.drillDuration + amount > practice.practiceDuration) {
        return;
        }

        practice.drillDuration += amount;
        this.props.drill.duration += amount;

        this.props.updateDrills();
    };

    handleDrillItem = () => {
        this.setState({editing: !this.props.draggingSomething}, () => {
            this.drillName.setSelectionRange(0, this.drillName.value.length);
        });
    }
}

// ============= PropTypes ==============

Drill.propTypes = {
    height: PropTypes.string.isRequired,
    drill: PropTypes.object,
    drillIndex: PropTypes.number.isRequired,
    updateDrills: PropTypes.func.isRequired,
    selectedPractice: PropTypes.object.isRequired,
    draggingSomething: PropTypes.bool.isRequired,
};

// ============= Styled Components ==============

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: ${props => props.height};
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
    display: inline-flex;
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    background: none;
    background-image: ${props => 'url(' + props.iconGray + ')'};
    background-position: 50%;
    background-size: 40%;
    background-repeat: no-repeat;
    z-index: 1;
    transition: background 0.2s;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-left: 1px solid rgba(0,0,0,0.12);
    opacity: 1;

    &:hover {
        background-image: ${props => 'url(' + props.iconBlue + ')'};
    }
`;

const PlusButton = styled.div`
    display: inline-flex;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    background: none;
    background-image: ${props => 'url(' + props.iconGray + ')'};
    background-position: 50%;
    background-size: 20%;
    background-repeat: no-repeat;
    transition: background 0.2s;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    height: 50%;
    border-right: 1px solid rgba(0,0,0,0.12);
    border-top: 1px solid rgba(0,0,0,0.12);
    opacity: 0;

    &:hover {
        background-image: ${props => 'url(' + props.iconBlue + ')'};
    }
`;

const MinusButton = styled.div`
    display: inline-flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    background: none;
    background-image: ${props => 'url(' + props.iconGray + ')'};
    background-position: 50%;
    background-size: 20%;
    background-repeat: no-repeat;
    transition: background 0.2s;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    height: 50%;
    border-right: 1px solid rgba(0,0,0,0.12);
    opacity: 0;

    &:hover {
        background-image: ${props => 'url(' + props.iconBlue + ')'};
    }
`;

const DrillItem = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: ${props => props.height};
    background-color:  ${props => props.theme.white};
    border-bottom: 1px solid #e0e0e0;
    cursor: grab;

    & > .notDragTarget {
        cursor: pointer;
    }

    &:hover > .activateOnHover {
        opacity: 1;
    }

    &.beingDragged > .activateOnHover {
        opacity: 1;
    }

    & .beingDragged {
      pointer-events: auto !important;
      cursor: grabbing !important;
      cursor: -moz-grabbing !important;
      cursor: -webkit-grabbing !important;
    }
`;
