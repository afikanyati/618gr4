import React        from 'react';
import PropTypes    from 'prop-types';
import styled       from 'styled-components';
import date         from 'date-and-time';
import uuid         from 'uuid';


export default class Stats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {

    }

    render() {

        let statsel;

        let playersel;

        let positions = ["Goalie", "Defender", "Midfielder", "Attacker"];

        statsel = this.getStatSel(this.props.statDetails.selectedPosition)

        playersel = this.getPlayerSel(this.props.statDetails.selectedPosition)

        return (
            <Container>
            <Header>
                    <Text
                        size={'1.5em'}
                        center={true}>
                        Positions
                    </Text>
                </Header>
                <Selector height={`${100/3}vh`}>
                    {
                        positions.map((position) => {
                            return (
                                    <Item
                                        selected={this.props.statDetails.selectedPosition==position}
                                    onClick = {this.selectPosition.bind({}, position)}>
                                    {position}
                                    </Item>
                                );
                        })
                    }
                </Selector>
                <Header>
                    <Text
                        size={'1.5em'}
                        center={true}>
                        Stats
                    </Text>
                </Header>
                {statsel}
                <Header>
                    <Text
                        size={'1.5em'}
                        center={true}>
                        Players
                    </Text>
                </Header>
                {playersel}

            </Container>
        );
    }

    componentDidMount() {

    }

    getStatSel = () => {
        let stats = {"Goalie": ["Blocks","Misses","Attempts"],
                     "Defender": ["Possession Time", "Turnovers", "Blocks"],
                     "Midfielder": ["Possession Time", "Turnovers", "Shots", "Goals"],
                     "Attacker": ["Possession Time", "Turnovers", "Shots", "Goals"]};

        if (this.props.statDetails.selectedPosition == "") {
            return <Selector height={`${100/3}vh`}></Selector>

        }
        if (this.props.statDetails.selectedPosition != ""){
            return(
                <Selector height={`${100/3}vh`}>
                    {
                        stats[this.props.statDetails.selectedPosition].map((stat) => {
                            return (
                                    <Item
                                    selected={this.props.statDetails.selectedStat==stat}

                                    onClick = {this.selectStat.bind({}, stat)}>
                                    {stat}

                                    </Item>
                                );
                        })
                    }
                </Selector>
            );
        }

    }

    getPlayerSel = () => {
        let players = {"Goalie": ["Pyotr Hasborn", "Martin Shkrelli", "Donald Trump", "Barack Obama"],
                       "Defender": ["Mitchell", "SCARFACE", "The Red Telletubby"],
                       "Midfielder": ["Ben Bitdiddle", "Donald Knuth", "John Von Neuman"],
                       "Attacker": ["Afika Nyati", "Taylor Herr", "Abigail Russell", "Efraim THEROCK", "man"]
                        };

        players[this.props.profileDetails.position].push(this.props.profileDetails.name);

        if (this.props.statDetails.selectedPosition == "") {
            return <Selector height={`${100/3}vh`}></Selector>;
        }

        if (this.props.statDetails.selectedPosition != "") {
            return (
                <Selector height={`${100/3}vh`}>
                    {
                        players[this.props.statDetails.selectedPosition].map((player) => {
                            return (
                                    <Item
                                        key={uuid.v4()}
                                        selected={this.props.statDetails.selectedPlayers.includes(player)}
                                    onClick = {this.addRemovePlayer.bind({}, player)}>
                                    {player}
                                    </Item>
                                );
                        })
                    }
                </Selector>
            );
        }
    }

    selectPosition = (newPosition) => {
      this.props.setPosition(newPosition);
      this.clearPlayers();
    }

    selectStat = (newStat) => {
      this.props.setStat(newStat);
    }

    addRemovePlayer = (newPlayer) => {
        let players = this.props.selectedPlayers.slice();
        if (players.indexOf(newPlayer) >= 0) {
            players.splice(players.indexOf(newPlayer), 1);
        }

        else {
            players.push(newPlayer);
        }

        this.props.setPlayers(players)

    }

    clearPlayers = () => {
        this.props.setPlayers([]);
    }

}

// ============= Styled Components ==============

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 20vw;
    border-right: 1px solid #e0e0e0;
`;

const Selector = styled.ul`
    height: ${props => props.height};
    margin: 0;
    padding: 0;
    background: ${props => props.theme.lightGray};
    overflow-y: scroll;
`;

const Item = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    width: 100%;
    height: 50px;
    background: ${props => props.selected ?
            props.theme.red
        :
            props.theme.white
    };
    color: ${props => props.selected ?
            props.theme.white
        :
            "inherit"
    };
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
    transition: background 0.2s;
`;

const Header = styled.div`
    padding: 0px;
    box-shadow: 0 0px 11px rgba(0,0,0,.5), 0 0px 4px rgba(0,0,0,.25);
    z-index: 1;
`;

const Text = styled.h2`
    font-size: ${props => props.size};
    font-weight: 700;
    background: ${props => props.theme.darkGray};
    color: ${props => props.theme.white};
    text-align: ${props => props.center ?
            "center"
        :
            "left"
    };
    padding: 10px;
    margin: 0;
`;
