
import React, {useState, useEffect} from 'react'
import './App.css'
import axios from 'axios'
import Posts from './components/Posts/Posts.js'
import Paginations from './components/Paginations/Paginations'

const App = () =>{

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setToalPage] = useState(0)
  const [perPageNumber, setPerPageNumber] = useState(3)
  
  useEffect(() => {
   const requestPosts = async () => {
    setLoading(true)
    const response = await axios.get('http://localhost:3000/posts', {
     params: {currentPage,perPageNumber}})
    console.log('response:', response)
    setPosts(response.data.content)
    setToalPage(response.data.totalPage)
    setLoading(false)
   }
   requestPosts()
  },[currentPage])

  const requestPostsByPage = (page) => {
    if (page === '...') {
      return
    }
    if (page === 0 || page > totalPage) {
      return
    }
    setCurrentPage(page)
  }
  return (
    <div className='container'>
      <h1 className='my-posts-title'>我的文章</h1>
      <Posts loading={loading} posts={posts}/>
      <Paginations totalPage={totalPage}
      requestPostsByPage={requestPostsByPage}
      currentPage={currentPage}
      />
    </div>
  )
}

export default App
