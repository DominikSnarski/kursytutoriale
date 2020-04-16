import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardImgOverlay,
  CardTitle,
  Container,
  Col,
  Row,
} from 'reactstrap';

import { Fade } from 'react-reveal';

const TopCategories = () => (
  <Container className="Container">
    <Fade left duration="200">
      <Row>
        <Col xs="6" sm="4">
          <div>
            <Card
              inverse
              className="m-2"
              style={{ cursor: 'pointer' }}
            >
              <CardImg
                width="100%"
                src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png"
                alt="Card image cap"
              />
              <CardImgOverlay>
                <CardTitle>Card Title</CardTitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
              </CardImgOverlay>
            </Card>
          </div>
        </Col>
        <Col xs="6" sm="4">
          <div>
            <Card
              inverse
              className="m-2"
              style={{ cursor: 'pointer' }}
            >
              <CardImg
                width="100%"
                src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png"
                alt="Card image cap"
              />
              <CardImgOverlay>
                <CardTitle>Card Title</CardTitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
              </CardImgOverlay>
            </Card>
          </div>
        </Col>
        <Col xs="6" sm="4">
          <div>
            <Card
              inverse
              className="m-2"
              style={{ cursor: 'pointer' }}
            >
              <CardImg
                width="100%"
                src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png"
                alt="Card image cap"
              />
              <CardImgOverlay>
                <CardTitle>Card Title</CardTitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
              </CardImgOverlay>
            </Card>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs="6" sm="4">
          <div>
            <Card
              inverse
              className="m-2"
              style={{ cursor: 'pointer' }}
            >
              <CardImg
                width="100%"
                src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png"
                alt="Card image cap"
              />
              <CardImgOverlay>
                <CardTitle>Card Title</CardTitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
              </CardImgOverlay>
            </Card>
          </div>
        </Col>
        <Col xs="6" sm="4">
          <div>
            <Card
              inverse
              className="m-2"
              style={{ cursor: 'pointer' }}
            >
              <CardImg
                width="100%"
                src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png"
                alt="Card image cap"
              />
              <CardImgOverlay>
                <CardTitle>Card Title</CardTitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
              </CardImgOverlay>
            </Card>
          </div>
        </Col>
        <Col xs="6" sm="4">
          <div>
            <Card
              inverse
              className="m-2"
              style={{ cursor: 'pointer' }}
            >
              <CardImg
                width="100%"
                src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png"
                alt="Card image cap"
              />
              <CardImgOverlay>
                <CardTitle>Card Title</CardTitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
              </CardImgOverlay>
            </Card>
          </div>
        </Col>
      </Row>
    </Fade>
  </Container>
);
export default TopCategories;
