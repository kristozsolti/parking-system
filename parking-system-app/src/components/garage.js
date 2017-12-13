import React from 'react';
import { Row, Col, Image, Label, Button } from 'react-bootstrap';

const ParkingSpace = (props) => {
    const {
        takeParkingSpace, 
        leaveParkingSpace,
        elevatorNumber,
        person
    } = props;
    return(
        <Row>
            <Col md={12} className="text-center parking-space" >
                <Row>
                    <Col md={12}>
                        {
                            (props.free) ?
                                (<Image src="https://www.abm.com/aviation/wp-content/uploads/sites/52/2016/03/Aviation_Airport_Parking_Icons_Frame6a-1.png" alt="parking space photo" width="25%" circle />)
                                :
                                (<Image src={person.pictureUrl} alt="parking space photo" width="25%" circle />)                            
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h3><Label bsStyle="primary">{person.name}</Label></h3>
                        <h5><Label bsStyle="primary">{person.email}</Label></h5>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {
                        (props.free) ?
                            <Button bsStyle="success" 
                                onClick={() => takeParkingSpace(elevatorNumber)}>
                                Park here!
                            </Button>
                            :
                            <Button bsStyle="danger" 
                                onClick={
                                    props.upperElevator ?
                                    () => leaveParkingSpace(elevatorNumber, true) :
                                    () => leaveParkingSpace(elevatorNumber, false)
                                    }>
                                Leave Parking Space!
                            </Button>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
export { ParkingSpace };

const singleSpace = (props) => {
    return(
        <Row>
            <Col md={12}>
                <ParkingSpace free={props.upperSpace.free}
                    takeParkingSpace={props.takeParkingSpace}
                    leaveParkingSpace={props.leaveParkingSpace}
                    elevatorNumber={props.id}
                    person={props.upperSpace.person}/>
            </Col>
        </Row>
    );
};

const doubleSpace = (props) => {
    return(
        <Row>
            <Col md={12}>
                <ParkingSpace free={props.upperSpace.free}
                    takeParkingSpace={props.takeParkingSpace}
                    leaveParkingSpace={props.leaveParkingSpace}
                    elevatorNumber={props.id}
                    upperElevator={true}
                    person={props.upperSpace.person}/>
            </Col>
            <Col md={12}>
                <hr />
            </Col>
            <Col md={12}>
                <ParkingSpace free={props.lowerSpace.free}
                    takeParkingSpace={props.takeParkingSpace}
                    leaveParkingSpace={props.leaveParkingSpace}
                    elevatorNumber={props.id}
                    upperElevator={false}
                    person={props.lowerSpace.person}/>
            </Col>
        </Row>
    );
};

const Elevator = (props) => {
    return(
        <Col md={12} className="elevator" >
            <Row className="text-center">
                <Col md={3} className="elevator-number">
                    <h3><Label bsStyle="info">#{props.parkingSpaceNumber}</Label></h3>
                </Col>
            </Row>
            {
                props.upperSpace.free ?
                singleSpace(props) :
                doubleSpace(props)
            }
        </Col>
    );
}
export { Elevator };