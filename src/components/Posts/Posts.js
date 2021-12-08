import React from "react";
import './Posts.css'

const Posts = ({ loading, posts }) => {
  if (loading) {
    return <h3>Loading.....</h3>
  }
  return (
    <ul className="list-posts">
      {
        posts.map( v => (
          <li key={v.id} className="list-posts-item">
            <h3>{v.title}</h3>
            <p>{v.content}</p>
            <section className="post-panel">
              <span className="post-time">发表时间：{v.time}</span>
              <span className="post-author">作者：{v.author}</span>
              <span className="post-like">喜欢：{v.like}</span>
            </section>
          </li>
        ))
      }
    </ul>
  )
}

export default Posts