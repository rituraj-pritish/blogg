import React, { useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';

import setAlert from 'src/utils/setAlert';
import {
  addPostMutation,
  updatePostMutation,
  deletePostMutation
} from 'src/graphql/mutations/postMutations';
import {
  getPostsQuery,
  getPostQuery
} from 'src/graphql/queries/postQueries';
import EditPost from './EditPost';
import ComponentLoader from 'src/components/shared/ComponentLoader';
import formValidator from 'src/utils/formValidator';

const EditPostContainer = ({ match, history }) => {
  const postId = match.params.postId;
  const createPost =
    history.location.pathname === '/create-post' ? true : false;

  //for edit post
  const [
    getPost,
    { loading: postLoading, error: postError, data: postData }
  ] = useLazyQuery(getPostQuery, {
    variables: { postId }
  });

  useEffect(() => {
    if (!createPost) {
      getPost();
    }

    if (!createPost && post) {
      setFormData({
        title: post.title,
        content: post.content,
        image: post.image,
        tags: post.tags.join(', ')
      });
      setImageUrl(post.imageUrl);
    }
    // eslint-disable-next-line
  }, [postData]);

  let post;
  if (postData && postData.getPost) post = postData.getPost;

  //state init
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    tags: ''
  });
  const [imageUrl, setImageUrl] = useState('');

  const setImage = val => setFormData({ ...formData, image: val });

  //add post
  const [
    addPost,
    { loading: addLoading, error: addError, data: addData }
  ] = useMutation(addPostMutation, {
    variables: { ...formData, imageUrl },
    refetchQueries: [
      {
        query: getPostsQuery,
        variables: { page: 1 }
      }
    ]
  });

  const [
    updatePost,
    { loading: updateLoading, error: updateError, data: updateData }
  ] = useMutation(updatePostMutation, {
    variables: { ...formData, imageUrl, postId },
    refetchQueries: [
      {
        query: getPostsQuery,
        variables: { page: 1 }
      }
    ]
  });

  const [
    deletePost,
    { loading: deleteLoading, error: deleteError, data: deleteData }
  ] = useMutation(deletePostMutation, {
    variables: { postId },
    refetchQueries: [
      {
        query: getPostsQuery,
        variables: { page: 1 }
      }
    ]
  });

  if (addData && addData.addPost) {
    if (addData.addPost === true);
    return <Redirect to='/' />;
  }
  if (updateData && updateData.updatePost) {
    if (updateData.updatePost === true);
    return <Redirect to='/' />;
  }
  if (deleteData && deleteData.deletePost) {
    if (deleteData.deletePost === true);
    return <Redirect to='/' />;
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { title, content, image, tags } = formData;
  const { isEmpty } = formValidator;
  const handleSubmit = e => {
    e.preventDefault();

    if (isEmpty(title, content, tags) || (!image && isEmpty(imageUrl))) {
      setAlert('All fields are required', 'danger');
      return;
    }

    if (createPost) {
      addPost();
    } else {
      updatePost();
    }
  };

  if (addLoading || updateLoading || postLoading || deleteLoading)
    return <ComponentLoader />;
  if (addError || updateError || postError || deleteError) {
    setAlert('Something went wrong, please try again', 'danger');
  }
  return (
    <EditPost
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formData={formData}
      imageUrl={imageUrl}
      setImageUrl={setImageUrl}
      setImage={setImage}
      deletePost={deletePost}
      isEditing={!createPost}
    />
  );
};

export default EditPostContainer;
