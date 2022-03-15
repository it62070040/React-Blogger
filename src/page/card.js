import Parser from 'html-react-parser'
import { useState } from 'react'
import { Button, Card, Image } from "react-bootstrap"
import {Link} from "react-router-dom"
import { AllComment } from './comment'
import axios from "axios"

export async function CommentAPI(currentPost, name, message) {
    var postID = currentPost.id
    var URL = "https://fswd-wp.devnss.com/wp-json/wp/v2/comments"
    var param = {post: postID, authorName: name, content: message}
    var header = {
        Authorization: 'Basic ZnN3ZDpmc3dkLWNtcw=='
    }

    var addComments = await axios.post(URL, param, {headers: header})
    return addComments.data
}

export const DetailCard = ({post, cateList, authorList}) => {
    var categories, authorName
    categories = GetCategory(post.categories, cateList).join(", ")
    authorName = GetAuthor(post.author, authorList)

    const [text, setText] = useState("")
    const [addComment, setAddComment] = useState(null)
    const [name, setName] = useState("")

    function postComment() {
        CommentAPI(post, name, text).then((response) => {setAddComment(response)})
        setText("")
        setName("")
    }
    
    return (
        <>
        
            <Card className="text-center">
                <Card.Header style={{backgroundColor:"#88B9FF"}}>
                    <h3>{post.title.rendered}</h3>
                    </Card.Header>
                <Card.Body style={{backgroundColor: "#F5C9F5"}}>
                <Card.Title>
                <b>Categories: </b>{categories}
                    </Card.Title>
                <Card.Text>
                    {Parser(post.content.rendered)}
                </Card.Text>
                <div style={{margin: "20px"}}>
                    <textarea class="form-control z-depth-1" value={name} rows="3" placeholder="Name" onChange={(val) => setName(val.target.value)}></textarea>
                </div>
                
                <div style={{margin: "20px"}}>
                    <textarea class="form-control"  rows="7" value={text} placeholder="Write something here..." onChange={(val) => setText(val.target.value)}></textarea>
                </div>
                <Button variant="primary" onClick={() =>postComment()}>Comment</Button>
                </Card.Body>
                <Card.Footer className="text-muted">Modified: {post.modified.replace("T", " ")}</Card.Footer>
            </Card>
            
            <AllComment commentLink={post._links.replies[0].href} addComment={addComment}></AllComment>
        </>
    )
}

export const Thumbnail = ({post, cateList, authorList}) => {
    var categories, authorName, authorImg
    categories = GetCategory(post.categories, cateList).join(", ")
    authorName = GetAuthor(post.author, authorList)
    authorImg = GetAuthorImg(post.author, authorList)

    return (
        <Card  style={{margin: "10px"}}>
            <Card.Header style={{backgroundColor:"#88B9FF", fontWeight: "bold", fontSize: "larger"}}>
            <Image src={authorImg} style={{borderRadius: "50%", marginRight: "20px"}}/>
                {authorName}
                <p className="text-muted">{post.modified.replace("T", " ")}</p>
            </Card.Header>
                <h4>{post.title.rendered}</h4>
            <Card.Footer className="text-muted"><b>Categories: </b>{categories}</Card.Footer>
            <Card.Body >
                {Parser(post.excerpt.rendered)}
            </Card.Body>
            <Link to={{pathname : `/Post/${post.id}`}}>
                <Button style={{width:"100%"}}>Read</Button>
            </Link>
        </Card>
    )
}

function GetAuthorImg(author, authorList) {
    var authorImg = authorList.filter(authorID => author === authorID.id)
    authorImg = authorImg[0].avatar_urls[96]
    return authorImg
}

function GetCategory(cateIDList, cateList) {
    var cateStr = cateIDList.map(id => cateList.filter(cateID => id === cateID.id))
    cateStr = cateStr.map(cateID => cateID[0].name)
    return cateStr
}

function GetAuthor(author, authorList) {
    var authorName = authorList.filter(authorID => author === authorID.id)
    authorName = authorName[0].name
    return authorName
}


