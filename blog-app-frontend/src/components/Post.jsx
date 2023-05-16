import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardText,
    Col,
    Container,
    NavLink,
    Row,
} from "reactstrap";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";

function Post({post = { title: "Default post title.", content: "Default post content." }}) {

    const printDate = (numbers) => {
        return new Date(numbers).toLocaleDateString();
    };
    return (
        <Card className="border-0 shadow-sm mt-3">
            <CardBody>
                <Container className="">
                    <Row>
                        <Col
                            md={{
                                size: 10,
                            }}
                        >
                            <h3> {post.title} </h3>
                        </Col>

                        <Col
                            md={{
                                size: 2,
                            }}
                        >
                            <span style={{ fontSize: 12 }}>{printDate(post.addedDate)}</span>
                        </Col>
                        <hr />
                    </Row>
                </Container>

                <CardText
                    dangerouslySetInnerHTML={{
                        __html: post.content.substring(0, 100) + " ....",
                    }}
                >
                    {/* {post.content.substring(0, 100)} .... */}
                </CardText>
                <div>
                    <NavLink tag={ReactLink} to={"/posts/" + post.postId}>
                        Read more
                    </NavLink>
                </div>
            </CardBody>
        </Card>
    );
}

export default Post;
