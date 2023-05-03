import React from 'react';
import { useQuery } from '@apollo/client';

import ArticleList from '../components/ArticleList';
import ArticleForm from '../components/ArticleForm';

import { QUERY_ARTICLES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ARTICLES);
  const articles = data?.articles || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ArticleForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ArticleList
              articles={articles}
              title="Some Feed for Article(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
