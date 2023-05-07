import React from 'react';
import { Link } from 'react-router-dom';

const ArticleList = ({
  articles,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  // if (!articles.length) {
  //   return <h3>No Articles Yet</h3>;
  // }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {articles &&
        articles.map((article) => (
          <div key={article._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${article.articleAuthor}`}
                >
                  {article.articleAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this article on {article.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this article on {article.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{article.articleText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/articles/${article._id}`}
            >
              Join the discussion on this article.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ArticleList;
