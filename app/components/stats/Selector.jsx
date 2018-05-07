import React        from 'react';
import PropTypes    from 'prop-types';
import styled       from 'styled-components';
import uuid         from 'uuid';


const positions = ["Goalie", "Defender", "Midfielder", "Attacker"];
const stats = {
  "Goalie": ["Blocks","Misses","Attempts"],
  "Defender": ["Possession Time", "Turnovers", "Blocks"],
  "Midfielder": ["Possession Time", "Turnovers", "Shots", "Goals"],
  "Attacker": ["Possession Time", "Turnovers", "Shots", "Goals"],
};

export default class StatsSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
    }

    render() {
        return (
            <Container>
                <Header>
                    <Text>
                        Position
                    </Text>
                </Header>
                <Selector height={`${100/3}vh`}>
                    {
                        positions.map((position) => {
                            return (
                                    <Item
                                        key={uuid.v4()}
                                        selected={this.props.statDetails.selectedPosition === position}
                                        onClick = {this.selectPosition.bind({}, position)}>
                                    {position}
                                    </Item>
                                );
                        })
                    }
                </Selector>
                <Header>
                    <Text>
                        Stat
                    </Text>
                </Header>
                {
                    this.getStatSelector(this.props.statDetails.selectedPosition)
                }
                <Header>
                    <Text>
                        Player
                    </Text>
                </Header>
                {
                    this.getPlayerSelector(this.props.statDetails.selectedPosition)
                }
            </Container>
        );
    }

    componentDidMount() {
    }

    getStatSelector = () => {

        if (this.props.statDetails.selectedPosition === "") {
            return <Selector height={`${100/3}vh`}></Selector>

        } else {
            return(
                <Selector height={`${100/3}vh`}>
                    {
                        stats[this.props.statDetails.selectedPosition].map((stat) => {
                            return (
                                    <Item
                                        key={uuid.v4()}
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
    };

    getPlayerSelector = () => {

        // TODO this does not belong here

        let players = {
            "Goalie": ["Pyotr Hasborn", "Martin Shkrelli", "Donald Trump", "Barack Obama"],
            "Defender": ["Mitchell", "SCARFACE", "The Red Telletubby"],
            "Midfielder": ["Ben Bitdiddle", "Donald Knuth", "John Von Neuman"],
            "Attacker": ["Afika Nyati", "Taylor Herr", "Abigail Russell", "Efraim THEROCK", "man"],
        };

        players[this.props.profileDetails.position].push(this.props.profileDetails.name);

        if (this.props.statDetails.selectedPosition === "") {
            return <Selector height={`${100/3}vh`}></Selector>;

        } else {
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
    };

    selectPosition = (newPosition) => {
      this.setPosition(newPosition);
      this.clearPlayers();
    };

    selectStat = (newStat) => {
      this.setStat(newStat);
    };

    addRemovePlayer = (newPlayer) => {
        let players = this.props.statDetails.selectedPlayers.slice();
        if (players.indexOf(newPlayer) >= 0) {
            players.splice(players.indexOf(newPlayer), 1);
        } else {
            players.push(newPlayer);
        }

        this.setPlayers(players);
    };

    clearPlayers = () => {
        this.setPlayers([]);
    };

    setPosition = (position) => {
        this.props.statDetails.selectedPosition = position;
        this.props.commitStatDetails();
    };

    setStat = (stat) => {
        this.props.statDetails.selectedStat = stat;
        this.props.commitStatDetails();
    };

    setPlayers = (players) => {
        this.props.statDetails.selectedPlayers = players;
        this.props.commitStatDetails();
    };
}

// ============= PropTypes ==============

StatsSelector.propTypes = {
  statDetails: PropTypes.object.isRequired,
  commitStatDetails: PropTypes.func.isRequired,
  profileDetails: PropTypes.object.isRequired,
};

// ============= Styled Components ==============

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.3;
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
    font-size: 1.5;
    font-weight: 700;
    background: ${props => props.theme.darkGray};
    color: ${props => props.theme.white};
    text-align: center;
    padding: 10px;
    margin: 0;
`;
