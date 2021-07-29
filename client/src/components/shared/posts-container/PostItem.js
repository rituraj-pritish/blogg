import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import Text from 'src/components/ui/Text';
import Div from 'src/components/ui/Div';
import Icon from 'src/components/ui/Icon';
import OutlinedHeartIcon from 'src/assets/icons/OutlinedHeartIcon';
import Background from 'src/components/ui/Background';
import TrendingBanner from './trending-banner/TrendingBanner.js';
import joinName from 'src/utils/joinName';

import { StyledPostItem, Divider, StyledLikes } from './PostItem.styles';

const PostItem = ({
  title,
  content,
  trending,
  userId,
  likes,
  user: { firstName, lastName },
  imageUrl,
  tags,
  date
}) => {
  const name = joinName(firstName, lastName);

  const postTags = tags.map((tag, i) => {
    const upperCasedTag = tag[0].toUpperCase() + tag.slice(1);
    if (i === tags.length - 1)
      return (
        <span key={i}>
          <Link to={`/posts/${tag}`}>{upperCasedTag}</Link>
        </span>
      );
    return (
      <span key={i}>
        <Link to={`/posts/${tag}`}>{upperCasedTag + ', '}</Link>
      </span>
    );
  });

  return (
    <>
      <StyledPostItem>
        <Background className='post-item-bg' url={imageUrl} position='relative'>
          {trending && <TrendingBanner />}
          {likes.length > 0 && (
            <StyledLikes>
              <Icon width='18px'>
                <OutlinedHeartIcon />
              </Icon>
              {likes.length}
            </StyledLikes>
          )}
        </Background>
        <Text color='primary' className='post-item-title' fontSize='2.5rem' fontWeight='bold'>
          {title}
        </Text>
        <Text className='post-item-content'>
          {content
            .split('')
            .filter((c, i) => i < 200)
            .join('') + '...'}
        </Text>
        <Div
          className='post-item-details'
          display='flex'
          justifyContent='space-between'
          color='secondary'
        >
          <Text>
            <Link to={`/posts/${name}/${userId}`}>{name}</Link>
          </Text>
          <Text>
            <Moment format='D MMM YYYY'>{date}</Moment>
          </Text>
          <Text>{postTags}</Text>
        </Div>
      </StyledPostItem>
      <Divider />
    </>
  );
};

export default PostItem;
