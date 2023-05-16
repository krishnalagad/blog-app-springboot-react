import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, CardHeader, Container, Form, Input, Label } from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import { createPost as doCreatePost } from "../services/post-service";
import JoditEditor from "jodit-react";
import { getCurrentUserDetails } from "../auth";
import { toast } from "react-toastify";

const AddPost = () => {

    const editor = useRef(null)
    // const [content, setContent] = useState('')
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(undefined);
    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: '',
    })

    const config = {
        placeholder: "Start writing here"
    }

    useEffect(
        () => {

            setUser(getCurrentUserDetails());

            loadAllCategories().then((data) => {
                setCategories(data);
            }).catch((error) => {
                toast.error(`Error in loading categories.`, {
                    position: 'bottom-center'
                })
            });

        },
        []
    );

    // field change function 
    const fieldChange = (event) => {
        // console.log(event.target.value);
        setPost({ ...post, [event.target.name]: event.target.value });
    }

    // content field change function
    const contentFieldChanged = (data) => {
        setPost({ ...post, 'content': data });
    }

    // create post function
    const createPost = (event) => {
        event.preventDefault();

        // console.log(post);

        if (post.title.trim() === '') {
            toast.warning("Title cant be empty.", {
                position: 'bottom-center'
            });
            return;
        }
        if (post.content.trim() === '') {
            toast.warning("Please enter content of post", {
                position: 'bottom-center'
            });
            return;
        }
        if (post.categoryId.trim() === '') {
            toast.warning("Please select category of post", {
                position: 'bottom-center'
            });
            return;
        }

        // submit the form to server...
        post['userId'] = user.id;
        doCreatePost(post).then((data) => {
            toast.success(`Post created successfully`, {
                position: 'bottom-center'
            })
            setPost({
                ...post,
                title: '',
                content: '',
                categoryId: '',
            });
        }).catch((error) => {
            // console.log(error);
            toast.error(`Post is not created due to some error`, {
                position: 'bottom-center'
            })
        })
    }

    return (
        <div className="wrapper">
            <Card className="shadow-sm border-0 mt-3">
                <CardHeader>
                    <h3 className="text-center">Whats going on in your mind ??</h3>
                </CardHeader>
                <CardBody>
                    {/* {JSON.stringify(post)} */}
                    <Form onSubmit={createPost}>
                        <div className="my-1">
                            <Label for="title">Post Title</Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter here"
                                className="rounded-0"
                                name="title"
                                onChange={fieldChange}
                            />
                        </div>



                        <div className="my-1">
                            <Label for="content">Post Content</Label>
                            {/* <Input
                                id="content"
                                type="textarea"
                                placeholder="Enter here"
                                className="rounded-0"
                                style={{ height: "200px" }}
                            /> */}

                            <JoditEditor
                                ref={editor}
                                value={post.content}
                                onChange={contentFieldChanged}
                            // onChange={(newContent) => { setContent(newContent) }}

                            />

                        </div>

                        <div className="my-1">
                            <Label for="category">Post Category</Label>
                            <Input
                                id="category"
                                type="select"
                                placeholder="Enter here"
                                className="rounded-0"
                                name="categoryId"
                                defaultValue={0}
                                onChange={fieldChange}>
                                <option disabled value={0}>--Select Post Category--</option>
                                {
                                    categories.map((category) => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.categoryTitle}
                                        </option>
                                    ))
                                }

                            </Input>
                        </div>

                        <Container className="text-center mt-3">
                            <Button className="rounded-0" color="primary" type="submit">Create Post</Button>
                            <Button className="rounded-0 ms-2" color="danger" type="reset">Reset</Button>
                        </Container>
                    </Form>
                    {/* {content} */}
                </CardBody>
            </Card>
        </div>
    );
};

export default AddPost;
