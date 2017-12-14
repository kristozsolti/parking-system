import React, { Component } from 'react';
import { Panel, Glyphicon } from 'react-bootstrap';

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

        const title =   <div onClick={() => this.setState({ open: !this.state.open })}>
                            {header}
                            <Glyphicon glyph={this.state.open ? "menu-down" : "menu-left"} className="pull-right"/>
                        </div>;
        return (
            <Panel collapsible expanded={this.state.open} header={title} bsStyle={bsStyle}>
                {children}
            </Panel>
        );
    }
}
export default CustomPanel;