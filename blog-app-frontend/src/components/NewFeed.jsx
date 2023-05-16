import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Container, Row, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { loadAllPostsForFeeds } from "../services/post-service"
import Post from './Post';
import { toast } from "react-toastify";

function NewFeed() {

    const [postContent, setPostContent] = useState({
        content: [],
        totalpages: '',
        totalElements: '',
        pageSize: '',
        lastpage: false,
        pageNumber: '',
    });


    useEffect(() => {

        // load all the post from the server...
        loadAllPostsForFeeds(0, 5).then((data) => {
            console.log(data);
            setPostContent(data);
        }).catch((error) => {
            console.log(error);
            toast.error("Error in laoding posts", {
                position: 'top-right'
            })
        })

    }, []);

    

    const changePost = (pageNumber = 0, pageSize = 5) => {
        if (pageNumber > postContent.pageNumber && postContent.lastpage){
            return;
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
            return;
        }

        loadAllPostsForFeeds(pageNumber, pageSize).then((data) => {
            setPostContent(data);
            window.scroll(0, 0);
        }).catch((error) => {
            console.log(error);
            toast.error("Error in laoding posts", {
                position: 'top-right'
            })
        })
    }

    return (

        <div className="container-fluid">
            <Row>
                <Col md={
                    {
                        size: 10,
                        offset: 1,
                    }
                }>

                    <Container className="mb-3 px-0 py-0">
                        <div className="text-center">
                            <Card>
                                <CardBody>
                                    <Row>
                                        <h1 style={{ fontWeight: 'bold' }}><strong>Fresh Blogs</strong></h1>
                                        <h6>Total blogs : {postContent.totalElements}</h6>
                                    </Row>
                                </CardBody>
                            </Card>
                        </div>


                        {/* {
                            // postContent.content.length > 0
                                postContent.content.map((post) => <Post post={post} />)
                                // : "NO BLOGS"
                        } */}

                        {/* {
                            postContent.content.map((post) => (
                                <Post post={post} />
                            ))
                        } */}

                        {
                            // loading posts from server here...
                            postContent.content && postContent.content.length > 0 && (
                                <>
                                    {
                                        postContent && postContent.content.length
                                            ? postContent.content.map((post) => (
                                                <Post key={post.postId} post={post} />
                                            )) : null
                                    }
                                </>
                            )
                        }

                        {/* Pagination in ReactJS */}
                        <div className="text-center mt-2">

                            <Pagination>

                                <PaginationItem onClick={() => changePost(postContent.pageNumber - 1)} disabled={postContent.pageNumber === 0}>
                                    <PaginationLink previous>

                                    </PaginationLink>
                                </PaginationItem>

                                {
                                    [...Array(postContent.totalpages)].map((item, index) => (

                                        <PaginationItem onClick={() => changePost(index)} active={postContent.pageNumber === index} key={index}>
                                            <PaginationLink next>
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>

                                    ))
                                }

                                <PaginationItem onClick={() => changePost(postContent.pageNumber + 1)} disabled={postContent.lastpage}> {/* postContent.pageNumber + 1 === postContent.totalpages */}
                                    <PaginationLink next>

                                    </PaginationLink>
                                </PaginationItem>

                            </Pagination>

                        </div>

                    </Container>
                </Col>
            </Row>
        </div>

    )
}

export default NewFeed;
