import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_ARTICLE } from '../../utils/mutations';
import { QUERY_ARTICLES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ArticleForm = () => {
  const [articleText, setArticleText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addArticle, { error }] = useMutation(ADD_ARTICLE, {
    update(cache, { data: { addArticle } }) {
      try {
        const { articles } = cache.readQuery({ query: QUERY_ARTICLES });

        cache.writeQuery({
          query: QUERY_ARTICLES,
          data: { articles: [addArticle, ...articles] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, articles: [...me.articles, addArticle] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addArticle({
        variables: {
          articleText,
          articleAuthor: Auth.getProfile().data.username,
        },
      });

      setArticleText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'articleText' && value.length <= 280) {
      setArticleText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What's on your techy mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="articleText"
                placeholder="Here's a new article..."
                value={articleText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Article
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your articles. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ArticleForm;
