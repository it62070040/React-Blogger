import { useEffect, useState } from "react"
import { Container, Row, Nav} from "react-bootstrap"
import { Thumbnail } from "./card"
import axios from "axios"


export const Post = () => {
    const [post, setPost] = useState([])
    const [cate, setCate] = useState([])
    const [user, setUser] = useState([])
    const [currentPost, setCurrentPost] = useState([])

    const GetPost = async () => {
      const post = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/posts')
      setPost(post.data)
      setCurrentPost(post.data)
    }
    const GetCategory = async () => {
      const cate = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/categories/')
      setCate(cate.data)
    }
  
    const GetUser = async () => {
      const user = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/users')
      setUser(user.data)
    }

    useEffect(() => {GetPost()
          GetCategory()
          GetUser()
      },
      [],
    )

    function getCategory(id, post) {
      if (id === 0) return post
      return post.filter(postID => postID.categories.includes(id))
  }
    function AllPost() {
    return (
      currentPost.map((index) => {
        return (
          <Container  fluid>
            <Thumbnail post={index} cateList={cate} authorList={user} />
          </Container>
        )
      })
    )
  }
  
  return (
    <> 
      <Container>
        <Row>
            <Nav className="justify-content-center" variant="tabs" defaultActiveKey="All">
              <Nav.Item>
                <Nav.Link eventKey="All" onClick={() => setCurrentPost(getCategory(0, post))}>All</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Category" onClick={() => setCurrentPost(getCategory(3, post))} >Category</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Style" onClick={() => setCurrentPost(getCategory(20, post))}>Style</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Runner" onClick={() => setCurrentPost(getCategory(75, post))}>Runner</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Classic" onClick={() => setCurrentPost(getCategory(77, post))}>Classic</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Life" onClick={() => setCurrentPost(getCategory(78, post))}>Life</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Uncategorized" onClick={() => setCurrentPost(getCategory(1, post))}>Uncategorized</Nav.Link>
              </Nav.Item>
            </Nav>
            <AllPost></AllPost>
        </Row>
      </Container>
    </>
  )
}
