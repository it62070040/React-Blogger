import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Col } from "react-bootstrap"

export const AllComment = ({commentLink, addComment}) => {
    const [comment, setComment] = useState([])

    const GetComment = async () => {
        const comment = await axios.get(commentLink)
        setComment(comment.data)
      }

    useEffect(() => {const getResult = async () => {await GetComment()}
            getResult()
        },
        [addComment]
      )
    
    return (
        comment.map(data => {
            return (
                <Col fluid style={{ marginTop: "20px" }}>
                    <Card>
                        <Card.Header style={{backgroundColor: "#88B9FF"}}>{data.author_name}</Card.Header>
                        <Card.Body dangerouslySetInnerHTML={{__html:data.content.rendered}}>
                        </Card.Body>
                        <Card.Footer className="text-muted" style={{fontSize: "small"}}>{data.date.replace("T", " ")}</Card.Footer>
                    </Card>
                </Col>
            )

        })
    )
}