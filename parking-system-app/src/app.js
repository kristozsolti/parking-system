import React, { Component } from 'react';
import update from 'immutability-helper';
// import _ from 'lodash';
import { Elevator } from './components/garage';
import { Grid, Col, Row } from 'react-bootstrap';
import CustomPanel from './components/customPanel';
import LoginModal from './components/fbLoginModal';

class App extends Component {
    constructor() {
        super();
        this.state = {
            parkingSpaces: [],
            examplePersons: [
                {
                    id: 1235,
                    name: "John Smith",
                    email: "johnsmith@example.com",
                    pictureUrl: "https://www.shareicon.net/download/2016/09/01/822711_user_512x512.png"
                },{
                    id: 3652,
                    name: "Json Statham",
                    email: "jsonrocks@example.com",
                    pictureUrl: "https://www.shareicon.net/download/2016/05/26/771189_man_512x512.png"
                },{
                    id: 654682,
                    name: "Mona Lisa",
                    email: "lisam@example.com",
                    pictureUrl: "https://cdn4.iconfinder.com/data/icons/business-conceptual-part1-1/513/business-woman-512.png"
                },{
                    id: 84522,
                    name: "Erica Mathias",
                    email: "mathiase@example.com",
                    pictureUrl: "https://www.shareicon.net/download/2016/08/18/813793_people_512x512.png"
                },{
                    id: 776655,
                    name: "Lucas Beardman",
                    email: "bman@example.com",
                    pictureUrl: "https://www.shareicon.net/download/2016/07/26/802011_man_512x512.png"
            }],
            loggedInPerson: null
        }
    }

    // Generates elevators regarding to number got as parameter
    setInitialStatus = (numberOfElevators) => {
        let newParkingSpaces = [];

        for(let i=0; i<numberOfElevators; i++){
            newParkingSpaces = newParkingSpaces.concat({
                id: i+1,
                upperSpace: {
                    free: true,
                    person: {
                        id: "",
                        name: "",
                        email: "",
                        puctureUrl: ""
                    }
                },
                lowerSpace: {
                    free: true,
                    person: {
                        id: "",
                        name: "",
                        email: "",
                        puctureUrl: ""
                    }
                }
                
            });
        }
        this.setState({parkingSpaces: newParkingSpaces});
    };

    //Renders 9 elevators
    componentWillMount() {
        this.setInitialStatus(9);
    }

    // Returns imaginary person for testing purposes
    getFakePersonData = () => {
        const randomNumber = Math.floor(Math.random() * 5);
        return(
            this.state.examplePersons[randomNumber]
        );
    }

    //Used to get a person's name, email and picture 
    getPersonFbData = (fbResponse) => {
        let personFbData;
        if (fbResponse) {
            personFbData = 
                {
                    id: fbResponse.id,
                    name: fbResponse.name,
                    email: fbResponse.email,
                    pictureUrl: fbResponse.picture.data.url
                };
            this.setState({loggedInPerson: personFbData});
        }
        console.log(this.state.loggedInPerson)
    }

    takeParkingSpace = (elevatorNumber) => {
        //do nothing when there is no preson data from fb available
        if (!this.state.loggedInPerson){
            return;
        }

        const elevatorIndex = elevatorNumber-1;
        const currentStateOfParkings = this.state.parkingSpaces;
        const newStateOfParkings =  currentStateOfParkings[elevatorIndex].upperSpace.free ? 
                                    update(currentStateOfParkings, {[elevatorIndex]: {upperSpace: {
                                        free: {$set: false},
                                        person: {$set: this.state.loggedInPerson}
                                    }}}) :
                                    update(currentStateOfParkings, {[elevatorIndex]: {lowerSpace: {
                                        free: {$set: false},
                                        person: {$set: this.state.loggedInPerson}
                                    }}});

        this.setState({parkingSpaces: newStateOfParkings});
    }

    leaveParkingSpace = (elevatorNumber, upperElevator) => {        
        const elevatorIndex = elevatorNumber - 1;
        const currentStateOfParkings = this.state.parkingSpaces;
        let newStateOfParkings;

        if (upperElevator) {
            newStateOfParkings =  update(currentStateOfParkings, {[elevatorIndex]: {
                upperSpace:{
                    free: {$set: false},
                    person: {$set: currentStateOfParkings[elevatorIndex].lowerSpace.person}
                },
                lowerSpace: {
                    free: {$set: true},
                    person: {$set: {}}
                }
            }})
        } else if (!upperElevator) {
            newStateOfParkings =  update(currentStateOfParkings, {[elevatorIndex]: {
                upperSpace:{
                    free: {$set: false}
                },
                lowerSpace: {
                    free: {$set: true},
                    person: {$set: {}}
                }
            }});
        } 
        if (upperElevator && currentStateOfParkings[elevatorIndex].lowerSpace.free) {
            newStateOfParkings =  update(currentStateOfParkings, {[elevatorIndex]: {
                upperSpace:{
                    free: {$set: true},
                    person: {$set: {}}
                }
            }});
        }

        this.setState({parkingSpaces: newStateOfParkings});
    }

    render(){
        const { parkingSpaces } = this.state;
        const loginContent = (
            <Row>
                <Col md={12}>
                    <LoginModal getPersonFbData={this.getPersonFbData}/>
                </Col>
            </Row>
        );
        return(
            <CustomPanel header={"Parking System"} bsStyle="primary">
                <Grid>
                    {
                    !this.state.loggedInPerson
                    ?
                    loginContent 
                    :
                    parkingSpaces.map( (parkingSpace, index) => {
                        return(
                            <Col md={4} key={index}>
                                <Elevator key={parkingSpace.id} 
                                    parkingSpaceNumber={parkingSpace.id} 
                                    {...parkingSpace}
                                    takeParkingSpace={this.takeParkingSpace}
                                    leaveParkingSpace={this.leaveParkingSpace}
                                    getPersonFbData={this.getPersonFbData}
                                />
                            </Col>
                        );
                    }) 
                    }
                </Grid> 
            </CustomPanel>
        );
    }
};
export default App;