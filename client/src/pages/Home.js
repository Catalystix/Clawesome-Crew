import React, { useState} from 'react';
import { useQuery } from '@apollo/client';

import ArticleList from '../components/ArticleList';
import ArticleForm from '../components/ArticleForm';
import MarsApi from '../utils/marsApi';
import TechApi from '../utils/techApi';
import PODApi from '../utils/podApi'
import { QUERY_ARTICLES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ARTICLES);
  const articles = data?.articles || [];
  const [mars, setMars] = useState([]);
  console.log(mars, "mars")
  function savePhoto(photo){
    console.log("photo", photo)}
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
        <button onClick={async() => {
         const data = await MarsApi()
         console.log ('data', data);
         setMars(data.photos);
        }}>
        Mars Search
        </button>
      </div>
      <div className="toggleButton" >
        <button onClick={() => {TechApi()}}>
        Tech Search
        </button>
       </div>
       <div className="toggleButton" >
        <button onClick={() => {PODApi()}}>
        POD Search
        </button>
       </div>
      </div>
      {mars.map(mars => (
        // modify css for this
          <div> 
            <img src={mars.img_src}>
            
            </img>
          
           <button data-img={mars.img_src} data-name={mars.rover.name} onClick={(e)=> savePhoto({url:e.target.dataset.img, name:e.target.dataset.name})}>
            Save Photo
           </button>
         
          </div>

        ))}
    </main>
  );
};

export default Home;
