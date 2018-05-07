// Dependencies
import React                from 'react';
import PropTypes            from 'prop-types';
import styled               from 'styled-components';
import date                 from 'date-and-time';
import Dropzone             from 'react-dropzone';
import Select               from 'react-select';

// Components
import DefaultPhoto         from '../assets/images/default-avatar.png';

/**
 * The Profile component is a component used to
 */
export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accordion      : {
                name       : false,
                avatar     : false,
                position   : false
            },
            allAccordion   : false,
            errorType      : {},
            errors         : [],
            currentError   : ""
        }
    }

    componentWillMount() {
        // console.log("-----Profile");
    }

    render() {
        let positions = ['Goalie', 'Defender', 'Midfielder', 'Attacker'];
        let options = positions.map( (position)=>{
            return {label: position , value: position, id: position};
        });

        return (
            <Container>
                <Header margin={'0px'}>
                    Profile
                </Header>
                <Accordion>
                    <AccordionItem
                        zIndex="6"
                        open={this.state.accordion.name}
                        seperator={true}
                        onClick={this.toggleAccordion.bind({},"name")}>
                        <AccordionItemHeading open={this.state.accordion.name}>
                            Display Name
                        </AccordionItemHeading>
                        <AccordionItemPreview open={this.state.accordion.name}>
                            {this.props.profileDetails.name}
                        </AccordionItemPreview>
                    </AccordionItem>
                    <AccordionContent
                        zIndex="5"
                        open={this.state.accordion.name}>
                        <AccordionInput
                            type="text"
                            defaultValue={this.props.profileDetails.name}
                            innerRef={comp => this.name = comp}
                            placeholder="Display Name"
                            maxLength="50"
                            onChange={this.handleNameChange}/>
                    </AccordionContent>
                    <AccordionItem
                            zIndex="4"
                            open={this.state.accordion.avatar}
                            seperator={true}
                            onClick={this.toggleAccordion.bind({},"avatar")}>
                        <AccordionItemHeading open={this.state.accordion.avatar}>
                            Avatar
                        </AccordionItemHeading>
                        <AccordionAvatarPreviewContainer open={this.state.accordion.avatar}>
                            <AccordionAvatarPreview img={`url(${this.props.profileDetails.avatar ? this.props.profileDetails.avatar : DefaultPhoto})`} />
                        </AccordionAvatarPreviewContainer>
                    </AccordionItem>
                    <AccordionContent
                        zIndex="3"
                        open={this.state.accordion.avatar}>
                        <Dropzone
                            style={{display: this.state.accordion.avatar ? "flex" : "none" }}
                            className="edit-profile-avatar-wrapper"
                            accept="image/png, image/jpeg"
                            onDrop={this.onDrop}>
                            <img
                                className="edit-avatar-no-avatar-icon"
                                style={{display: !this.props.profileDetails.avatar ? "block" : "none" }}
                                src={DefaultPhoto} />
                            <img
                                className="uploaded-avatar"
                                style={{display: this.props.profileDetails.avatar ? "block" : "none" }}
                                src={this.props.profileDetails.avatar} />
                        </Dropzone>
                    </AccordionContent>
                    <AccordionItem
                            zIndex="2"
                            open={this.state.accordion.position}
                            seperator={false}
                            onClick={this.toggleAccordion.bind({},"position")}>
                        <AccordionItemHeading open={this.state.accordion.position}>
                            Position
                        </AccordionItemHeading>
                        <AccordionItemPreview open={this.state.accordion.position}>
                            {this.props.profileDetails.position}
                        </AccordionItemPreview>
                    </AccordionItem>
                    <AccordionContent
                        zIndex="1"
                        open={this.state.accordion.position}>
                        <PositionSelector>
                            <Select
                                className="country-select"
                                options={options}
                                placeholder="Position"
                                value={this.props.profileDetails.position}
                                onChange={this.handlePositionChange}
                                clearable={false} />
                        </PositionSelector>
                    </AccordionContent>
                </Accordion>
                <Header margin={'60px'}>
                    Go To
                </Header>
                <Button
                    active={true}
                    onClick={this.handleThisDate}>
                    Today's Date
                </Button>
                <Button
                    active={true}
                    onClick={this.handleMyStats}>
                    My Statistics
                </Button>
                <AccordionButton
                    onClick={this.toggleAllAccordion}>
                    <svg
                        version="1.1"
                        x="0px"
                        y="0px"
                        width="25px"
                        height="25px"
                        viewBox="12.5 12.5 25 25"
                        enableBackground="new 12.5 12.5 25 25">
                       <polygon
                           id="up-arrow"
                           fill="#FFFFFF"
                           points="12.489,21.449 21.063,12.886 21.063,12.886 23.703,12.886 23.703,12.886 23.703,37.114 21.063,37.114 21.063,29.147 21.063,16.408 12.489,24.982 	"/>
                      <polygon
                          id="down-arrow"
                          fill="#FFFFFF"
                          points="37.511,28.551 28.937,37.114 28.937,37.114 26.297,37.114 26.297,37.114 26.297,12.886 28.937,12.886 28.937,20.853 28.937,33.592 37.511,25.018 	"/>
                    </svg>
                </AccordionButton>
            </Container>
        );
    }

    componentDidMount() {
        // console.log("+++++Profile");
    }

    // ========== Methods ===========
    toggleAccordion = (item) => {
        let accordion   = this.state.accordion;
        accordion[item] = !accordion[item];

        if (item == "name") {
            this.name.focus();
            this.name.setSelectionRange(0, this.name.value.length);
        }

        this.setState({
            accordion: accordion
        });
    }

    toggleAllAccordion = () => {
        let allAccordion = this.state.allAccordion;
        let accordion   = {
            name    : !allAccordion,
            avatar  : !allAccordion,
            position: !allAccordion
        };

        this.name.focus();
        this.name.setSelectionRange(0, this.name.value.length);

        this.setState({
            accordion: accordion,
            allAccordion: !allAccordion
        });
    }

    handleNameChange = () => {
        let name = this.name.value;
        if (name.length == 0) {
            name = "No Display Name";
        }
        this.props.modifyProfileDetails("name", name);
    }

    handlePositionChange = (position) => {
        if (position.value) {
            this.props.modifyProfileDetails("position", position.value);
        }
    }

    handleThisDate = () => {
        this.props.changeViewState("Calendar");
    }

    handleMyStats = () => {
        this.props.changeViewState("Stats");
        let statDetails = {
            selectedPosition: this.props.profileDetails.position,
            selectedStat: "",
            selectedPlayers: [this.props.profileDetails.name]
        };
        this.props.commitStatDetails(statDetails);
    }

    onDrop = (file) => {
        this.props.modifyProfileDetails("avatar", file[0].preview);
    }
}

// ============= PropTypes ==============

Profile.propTypes = {
    profileDetails: PropTypes.object.isRequired,
    modifyProfileDetails: PropTypes.func.isRequired,
    commitStatDetails: PropTypes.func.isRequired,
    changeViewState: PropTypes.func.isRequired
};

// ============= Styled Components ==============

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 50px 20px 100px;
    overflow-y: scroll;
`;

const Header = styled.h1`
    font-size: 3em;
    margin-top: ${props => props.margin};
`;

const Accordion = styled.div`
    width: 50vw;
    max-width: 800px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
`;

const AccordionItem = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 100%;
    padding: 15px 25px;
    margin: 0;
    background: ${props => props.open ? props.theme.red : props.theme.white};
    border-bottom: ${props => props.seperator ?
            '1px solid rgba(0,0,0,.12)'
        :
            'none'
    };
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    z-index: ${props => props.zIndex};
`;

const AccordionItemHeading = styled.h2`
    width: 50%;
    height: 20px;
    color: ${props => props.open ? props.theme.white : props.theme.lightTextColor};
    font-size: 1em;
    font-weight: 400;
    margin: 0!important;
    padding: 0;
    cursor: pointer;
    line-height: normal;
`;

const AccordionItemPreview = styled.div`
    width: 50%;
    font-size: .8em;
    font-weight: 400;
    color: ${props => props.open ? 'hsla(0,0%,100%,.7)' : 'rgba(0,0,0,.54)'};
    margin: 0;
    transition: all 0.2s;
`;

const AccordionContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: ${props => props.open ? '0px' : '-30px'};
    height: ${props => props.open ? 'auto' : '0px'};;
    opacity: ${props => props.open ? '1' : '0'};;
    margin-top: 0;
    background: #fff;
    padding: ${props => props.open ? '50px' : '0 50px'};
    border-bottom: 1px solid rgba(0,0,0,.12);
    transition: all .3s ease-in-out;
`;

const AccordionInput = styled.input`
    width: 100%;
    height: 50px;
    border-radius: 3px;
    padding: 1em 1em;
    margin: 0;
    background-color: #f0f0f0;
    border: none;
    font-size: 1em;
    font-weight: 300;
    color: #252625;
    line-height: normal;
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.22);
`;

const AccordionAvatarPreviewContainer = styled.div`
    width: 50%;
`;

const AccordionAvatarPreview = styled.div`
    background-image: ${props => props.img};
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    width: 35px;
    height: 35px;
    border-radius: 2px;
    margin: 0;
`;

const PositionSelector = styled.div`
    width: 200px;
    height: 2.7em;

    & .country-select .Select-control {
        background-color: #f4f6f7;
        color: #000;
        outline: none;
        height: 43.19px;
        border-color: #d9d9d9 #ccc #b3b3b3;
        border-radius: 4px;
        border: 1px solid #ccc;
        cursor: default;
        display: table;
        border-spacing: 0;
        border-collapse: separate;
        overflow: hidden;
        position: relative;
        width: 100%;
    }
`;

const AccordionButton = styled.div`
    position: absolute;
    bottom: 25px;
    right: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 5px;
    background: ${props => props.theme.red};
    color: ${props => props.theme.white};
    font-size: 1.2em;
    box-shadow: 0 4px 8px -2px rgba(0,0,0,.5), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    transition: box-shadow 0.15s;
    z-index: 1;
    cursor: pointer;

    & svg {
    	overflow: visible;
    }

    & #up-arrow, & #down-arrow {
        transition: all 0.3s;
    }

    &:hover {
        box-shadow: 0 8px 16px -4px rgba(0,0,0,.5), 0 6px 2px -4px rgba(0,0,0,.2), 0 2px 10px 0 rgba(0,0,0,.12);
    }

    &:hover #up-arrow {
        transform: translateY(-2.5px);
        transition: all 0.3s;
    }

    &:hover #down-arrow {
        transform: translateY(2.5px);
        transition: all 0.3s;
    }
`;

const Button = styled.button`
    flex: none;
    width: 45%;
    height: 50px;
    margin: 0;
    border-radius: 5px;
    background: ${props => props.active ? props.theme.black : props.theme.lightGray};
    color: ${props => props.active ? props.theme.white : "inherit"};
    font-size: 1.2em;
    box-shadow: 0 4px 8px -2px rgba(0,0,0,.5), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    transition: box-shadow 0.2s, background 0.3s;
    z-index: 1;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        box-shadow: 0 8px 16px -4px rgba(0,0,0,.5), 0 6px 2px -4px rgba(0,0,0,.2), 0 2px 10px 0 rgba(0,0,0,.12);
    }
`;
