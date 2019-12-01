import React from 'react';
import {
    Container, Col, Row, Card, CardHeader, Button
} from 'reactstrap';

class Kit extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Card >
                            <CardHeader style={{ textAlign: "center" }}>Tools kit</CardHeader>
                            <Button className="m-2" color="success" onClick={this.props.addTextField}>Add text area</Button>
                            <Button className="m-2" color="success">Add alert</Button>
                            <Button className="m-2" color="success">Add jumbotron</Button>
                            <Button className="m-2" color="success">Add toast</Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    };
}

export default Kit;
