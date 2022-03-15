import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

const Author = () => {
    const [authors, setAuthors] = useState([])
    const GetAuthors = async () => {
        const authors = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/users')
        setAuthors(authors.data)
    }
    useEffect(() => {GetAuthors()},[],)
    return (
        <>
            <Container style={{marginTop: "200px"}}>
                <Row  style={{justifyContent: "center"}}>
                {
                    authors.map(person => {
                        return (
                                <Col key={person.id}>
                                    <Card.Header className="text-center" style={{backgroundColor:"#E789E4", color: "#FFF"}}>
                                        {person.name}
                                    </Card.Header>
                                    <Card.Body className="text-center" style={{backgroundColor: "#AAFFFA"}}>
                                    <Image src={person.avatar_urls[96]} style={{borderRadius: "50%"}}/>
                                        <p>
                                            <b>ID:</b> {person.id}
                                            <br></br>
                                            <b>slug:</b> {person.slug}
                                        </p>
                                    </Card.Body>
                                </Col>
                        )
                    })
                }
                </Row>
            </Container>
        </>
    );
}

export default Author