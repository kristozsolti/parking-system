import React, { Component } from 'react';
import { Panel, Glyphicon, Row, Col } from 'react-bootstrap';

class CustomPanel extends Component {
    constructor() {
        super();
        this.state = {
            open: true,
        };
    }
  
    render() {
        const {
            header,
            children,
            bsStyle
        } = this.props;

        const title =   <Row onClick={() => this.setState({ open: !this.state.open })}>
                            <Col md={10}>
                                {header}
                            </Col>
                            <Col md={2}>
                                <Glyphicon glyph={this.state.open ? "menu-down" : "menu-left"} className="pull-right"/>
                            </Col>
                        </Row>;
        return (
            <Panel collapsible expanded={this.state.open} header={title} bsStyle={bsStyle}>
                {children}
            </Panel>
        );
    }
}
export default CustomPanel;