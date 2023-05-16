import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap";
import { NavLink as Link, useNavigate } from "react-router-dom";
import { loadPost } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // load post data by postId from server
    loadPost(postId)
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed loading data from server", {
          position: "bottom-center",
        });
      });
  }, []);

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleDateString();
  };

  return (
    <Base>
      <Container>
        <span style={{ fontSize: 12 }}>
          <Link to="/">Home</Link><span style={{ fontSize: 16, background: '#e2e2e2' }}>/</span>{post && <Link to="#">{post.title}</Link>}
        </span>
        <Row>
          <Col md={{ size: 12 }}>
            <Card className="mt-3 ps-3">
              {post && (
                <CardBody>
                  <CardText>
                    <span style={{ fontSize: 12 }}>
                      Posted by <b>{post.user.name}</b> on{" "}
                      <b>{printDate(post.addedDate)}</b>
                    </span>
                  </CardText>

                  <CardText>
                    <span style={{ fontSize: 12 }} className="text-muted">
                      {post.category.categoryTitle}
                    </span>
                  </CardText>

                  <div
                    className="divider"
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#e2e2e2",
                    }}
                  ></div>

                  <div className="mt-3">
                    <h3>{post.title}</h3>
                  </div>
                  <div
                    className="image-container mt-3 container text-center "
                    style={{ width: "50%", minWidth: "50%", maxWidth: "100%" }}
                  >
                    <img
                      src={BASE_URL + "/api/post/image/" + post.imageName}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <CardText
                    className="mt-3"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
