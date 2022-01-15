import React, { useEffect, useState } from "react";   //useState
import loader from './Assets/images/loader.gif';


let pageNum = 0;
let isLoaderShow = true;
let isDataRecevied = true;

export function getList(pageNum) {
  isDataRecevied = false;
  isLoaderShow = true;
  // debugger
  return fetch(`https://api.github.com/search/repositories?q=created:%3E2017-10-22&sort=stars&order=desc&page=${pageNum}`)
    .then(data => data.json())
}





// const container = document.querySelector(".main-footer");



export default function App() {

  const [reposList, setReposList] = useState([]);
  useEffect(() => {

    getReposList()
    const container = document.querySelector(".footer");
    observer.observe(container);

  }, []);

  function getReposList() {
    isLoaderShow = true;

    getList(pageNum)
      .then(items => {
        pageNum++;
        isLoaderShow = false;
        isDataRecevied = true;
        setReposList(oldArray => [...oldArray, ...items.items]);
      })

  };
  //start Observer
  var observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("outside observer ")
        if (isDataRecevied) {
          getReposList()
        }
      }
    });
  });
  const renderLoaderShow = () => {
    if (isLoaderShow) {
      return <img src={loader} />
    } else {
      return null;
    }
  }
  return (
    <div className="App">
      <header className="header">
        Trending Repos
      </header>
      <div className="repos-list">

        <div className="container">
          <div className="row">
            {reposList.map((item, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                <a className="repos-list__item" href={item.clone_url} target="_blank">



                  <div className="repos-list__item__media">
                    <img src={item.owner.avatar_url} />
                    {/* <div className="repos-list__item__img">

                    </div> */}
                    <div className="repos-list__item__media__body">
                      <h5 className="mt-0">{item.full_name}</h5>
                      <p>{item.description}</p>
                      <div className="repos-list__item__media__body__star">
                        <span>Stars: {item.stargazers_count}</span>
                        <span>Issues: {item.open_issues_count}</span>


                      </div>
                    </div>
                  </div>


                </a>
              </div>
            ))}


          </div>
          {renderLoaderShow()}
        </div>





      </div>
      <footer className="footer">
        footer
      </footer>
    </div>
  );
}
