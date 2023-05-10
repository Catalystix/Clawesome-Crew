import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { techCall } from "../../utils/homepageAPI";
import { QUERY_ARTICLES } from "../../utils/queries";
import { ADD_IMAGE, ADD_ARTICLE } from "../../utils/mutations";
import { Segment, Grid, Image } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

const styles = {
	img: {
		maxHeight: "200px",
		maxWidth: "200px",
	},
	overflow: {
		whiteSpace: "nowrap",
		width: "700px",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
};

const TechDisplay = () => {
	const [addArticle, { err }] = useMutation(ADD_ARTICLE);
	const [articles, setArticles] = useState([]);
	useEffect(async () => {
		const data = await techCall();
		console.log("techapi", data);
		// const results = data.results.map(result => {
		//   return {img: result[10], id: result[0], description: result[3]}
		// })
		// console.log(results);
		setArticles(data.results);
	}, []);

	async function saveArticles(article) {
		console.log("article", article);
		const { data } = await addArticle({
			variables: article,
		});
	}
	console.log(articles);

	// const article_ID = localStorage.getItem("article_ID");
	// const article_img = localStorage.getItem("article_img");
	// const article_description = localStorage.getItem("article_description");
	return (
		<Segment>
			<div style={styles.overflow}>
				<h2>Tech Article of the Day</h2>
				{/* <a href={article_ID} target="_blank" rel="noreferrer">
          <img style={styles.img} src={article_img} alt="tech stuff"></img>
          {article_description}
        </a> */}
				<div className="toggleButton">
					<button
						onClick={async () => {
							const data = await techCall();
							console.log("data", data);
							setArticles(data.results);
						}}
					>
						Tech Search
					</button>
					<div>
            {/* This working but not working */}
						{articles.map((article) => (
							<a href={article[0]} target="_blank" rel="noreferrer">
								<div key={article[0]}>
									<img
										style={styles.img}
										src={article[10]}
										alt="tech stuff"
									></img>
									<p>description: {article[3]}</p>
								</div>
								<button
									data-url={article[0]}
									data-img={article[10]}
									data-description={article[3]}
									onClick={(e) => {
										e.preventDefault();
										saveArticles({
											url: e.target.dataset.url,
											img: e.target.dataset.img,
											description: e.target.dataset.description,
										});
									}}
								>
									Save
								</button>
							</a>
						))}
					</div>
				</div>
			</div>
		</Segment>
	);
};

export default TechDisplay;


