import React from 'react';

import Input from 'src/components/ui/Input';
import Page from 'src/components/ui/Page';
import Button from 'src/components/ui/Button';
import Div from 'src/components/ui/Div';

import { StyledTextArea } from './EditPost.styles';
import ImageUploader from './ImageUploader';

const EditPost = ({
  handleSubmit,
  handleChange,
  formData,
  imageUrl,
  setImageUrl,
  setImage,
  deletePost,
  isEditing
}) => {
  const { title, content, tags } = formData;

  return (
    <Page>
      {isEditing && (
        <Div textAlign='right'>
          <Button
            onClick={deletePost}
            variant='secondary'
            borderColor='red'
            color='red'
            p='1rem 3rem'
            mb='1.5rem'
          >
            Delete Post
          </Button>
        </Div>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='Title'
          onChange={handleChange}
          value={title}
          name='title'
          id='title'
          bg='grey'
          m='0.5rem 0'
        />
        <ImageUploader
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setImage={setImage}
        />
        <StyledTextArea
          onChange={handleChange}
          value={content}
          name='content'
          id='content'
          bg='grey'
        />
        <Input
          placeholder='comma separated tags'
          type='text'
          onChange={handleChange}
          value={tags}
          name='tags'
          id='tags'
          bg='grey'
          m='0.5rem 0'
        />

        <Div textAlign='right'>
          <Button m='1rem 0' p='1rem 3rem'>
            Submit
          </Button>
        </Div>
      </form>
    </Page>
  );
};

export default EditPost;
