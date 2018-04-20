import React                from 'react';
import styled               from 'styled-components';
import date                 from 'date-and-time';


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

        let positions = ["goalie", "defense", "offense"];

        statsel = this.getStatSel(this.props.selectedPosition)

        playersel = this.getPlayerSel(this.props.selectedPosition)

        console.log(this.props.selectedPlayers)

        return (
            <Container>
            <Header>
                    <Text
                        size={'1.5em'}
                        center={true}>
                        Positions
                    </Text>
                </Header>
                <PositionSel>
                    {
                        positions.map((position) => {
                            return (
                                    <Item
                                        selected={this.props.selectedPosition==position}
                                    onClick = {this.selectPosition.bind({}, position)}>
                                    {position}
                                    </Item>
                                );
                        })
                    }   
                </PositionSel>
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
        let stats = {"goalie": ["blocks","misses","attempts"],
                     "defense": ["possession time", "turnovers", "blocks"],
                     "offense": ["possession time", "turnovers", "shots", "goals"]};

        console.log(this.props.selectedPosition);
        if (this.props.selectedPosition == "") {
            return <StatSel></StatSel>

        }
        if (this.props.selectedPosition != ""){
            return(
                <StatSel>
                    {
                        stats[this.props.selectedPosition].map((stat) => {
                            return (
                                    <Item
                                    selected={this.props.selectedStat==stat}

                                    onClick = {this.selectStat.bind({}, stat)}>
                                    {stat}

                                    </Item>
                                );
                        })
                    }
                </StatSel>
            );
        }

    }

    getPlayerSel = () => {
        let players = {"goalie": ["Pyotr Hasborn", "Martin Shkrelli", "Donald Trump", "Barack Obama"],
                       "defense": ["Victor Fink", "Mitchell", "SCARFACE", "The Red Telletubby"],
                       "offense": ["Afika Nyati", "Taylor Herr", "Abigail Russell", "Efraim THEROCK"]
                        };

        if (this.props.selectedPosition == "") {
            return <PlayerSel></PlayerSel>;
        }

        if (this.props.selectedPosition != "") {
            return (
                <PlayerSel>
                    {
                        players[this.props.selectedPosition].map((player) => {
                            return (
                                    <Item
                                        selected={this.props.selectedPlayers.includes(player)}
                                    onClick = {this.addRemovePlayer.bind({}, player)}>
                                    {player}
                                    </Item>
                                );
                        })

                    }

                </PlayerSel>


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
        console.log("HEY")
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





const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 20vw;
    border-right: 1px solid #e0e0e0;
`;

const PositionSel = styled.ul`
    height: 30vh;
    margin: 0;
    padding: 0;
`;

const PlayerSel = styled.ul`
    height: 30vh;
    margin: 0;
    padding: 0;
`;


const StatSel = styled.ul`
    width: 100%;
    height: 40vh;
    margin: 0;
    padding: 0;
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
    padding: 0px;
    margin: 0;
`;
