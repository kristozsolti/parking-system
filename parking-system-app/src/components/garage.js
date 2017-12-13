import React from 'react';
import { Row, Col, Image, Label, Button, Glyphicon, Panel } from 'react-bootstrap';
import CustomPanel from './customPanel';

const ParkingSpace = (props) => {
    const {
        takeParkingSpace, 
        leaveParkingSpace,
        elevatorNumber,
        person
    } = props;
    return(
        <Panel header={props.free ? "Available for parking!" : "Taken by: " + person.name} bsStyle={props.free ? "primary" : "danger"}>
            <Row>
                <Col md={12} className="text-center parking-space" >
                    <Row>
                        <Col md={12}>
                            {
                                (props.free) ?
                                    (<Image src="https://www.abm.com/aviation/wp-content/uploads/sites/52/2016/03/Aviation_Airport_Parking_Icons_Frame6a-1.png" alt="parking space photo" width="50%" circle />)
                                    :
                                    (<Image src={person.pictureUrl} alt="person profile photo" width="50%" circle />)                            
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
                                    Park here! <Glyphicon glyph="log-in" />
                                </Button>
                                :
                                <Button bsStyle="danger" 
                                    onClick={
                                        props.upperElevator ?
                                        () => leaveParkingSpace(elevatorNumber, true) :
                                        () => leaveParkingSpace(elevatorNumber, false)
                                        }>
                                    Leave Parking Space! <Glyphicon glyph="log-out" />
                                </Button>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Panel>
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
    const panelStyle = (lowerSpace, upperSpace) => {
        if (!lowerSpace.free && !upperSpace.free) {
            return "danger";
        } else if (!upperSpace.free || !lowerSpace.free ) {
            return "warning";
        }
        return "success";
    }

    return(
        <CustomPanel header={"Elevator #" + props.parkingSpaceNumber} bsStyle={panelStyle(props.lowerSpace, props.upperSpace)}>
            {
                props.upperSpace.free ?
                singleSpace(props) :
                doubleSpace(props)
            }
        </CustomPanel>
    );
}
export { Elevator };