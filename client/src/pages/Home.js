import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import ArticleList from '../components/ArticleList';
import ArticleForm from '../components/ArticleForm';
import MarsApi from '../utils/marsApi';
import TechApi from '../utils/techApi';
import PODApi from '../utils/podApi'
import { QUERY_ARTICLES } from '../utils/queries';
import { ADD_IMAGE, ADD_ARTICLE } from '../utils/mutations';


const Home = () => {
  const { loading, data } = useQuery(QUERY_ARTICLES);
  // const articles = data?.articles || [];
  const [addImage, { error }] = useMutation(ADD_IMAGE);
  const [addArticle, { err }] = useMutation(ADD_ARTICLE);
  const [mars, setMars] = useState([]);
  const [pod, setPod] = useState([]);
  const [articles, setArticles] = useState([])
  console.log(mars, "mars");
  console.log(articles, "articles");
  console.log(pod, 'pod');

  async function saveArticles(article) {
    console.log("article", article)
    const { data } = await addArticle({
      variables: article
    })
  };
  async function savePhoto(photo) {
    console.log("photo", photo)
    const { data } = await addImage({
      variables: photo
    })
  };
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



        <div className="toggleButton" >
          <button onClick={async () => {
            const data = await MarsApi()
            console.log('data', data);
            setMars(data.photos);
          }}>
            Mars Search
          </button>
        </div>
        <div className="toggleButton" >
          <button onClick={async () => {
            const data = await TechApi()
            console.log('data', data);
            setArticles(data.article);
          }}>
            Tech Search
          </button>
        </div>
        <div className="toggleButton" >
          <button onClick={async () => {
            const data = await PODApi()
            console.log('podAPI', data);
            setPod(data.photo)

          }}>
            POD Search
          </button>
        </div>
      </div>

      {pod && pod.map(pod => (
        <div>
          <img src={PODApi.url} alt={pod.title} />
          <button data-img={pod.url} data-name={pod.title} onClick={(e) => savePhoto({ url: e.target.dataset.img, name: e.target.dataset.name })}>
            Save Photo
          </button>
        </div>
        
      ))}
      



      {/* {articles.map(article =>(
        <div>
          <img src={article.img}>
          </img>

        </div>
      ))} */}
      {/* Going to hold off on this- need to maybe change API- not giving enough or what I want it to do.  */}





      {mars.map(mars => (
        // modify css for this
        <div>
          <img src={mars.img_src}>

          </img>

          <button data-img={mars.img_src} data-name={mars.rover.name} onClick={(e) => savePhoto({ url: e.target.dataset.img, name: e.target.dataset.name })}>
            Save Photo
          </button>

        </div>

      ))}
    </main>
  );
};

export default Home;
