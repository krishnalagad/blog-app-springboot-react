import { privateAxios, myAxios } from "./helper";

// API calling function to acces create post API.
export const createPost = (postData) => {
  return privateAxios
    .post(
      `/api/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((response) => {
      return response.data;
    });
};

// API calling function to acces get all posts API.
export const loadAllPostsForFeeds = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortType=desc`
    )
    .then((response) => {
      return response.data;
    });
};

// API calling function to acces get one post by postId API.
export const loadPost = (postId) => {
  return myAxios.get(`/api/posts/${postId}`).then((response) => {
    return response.data;
  });
};
