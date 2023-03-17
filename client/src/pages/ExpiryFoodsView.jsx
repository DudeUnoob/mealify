import React, { useState, useEffect, useContext } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useUserContext } from "../context/UserContext"
import "../public/css/ExpiryFoodsView.css"


function ExpiryFoodsView () {

    const [userData, setUserData] = useState(null)
    
    const data = useUserContext()
   

    useEffect(() => {
        setUserData(data)
    },[data])

        
       
    return (
         
            <Container>
                <Row>
            {userData && (
                userData.meals.map((elm, i) => (
                    <Col key={i} >
                    <Card className="bg-dark text-white" style={{ width:"18rem", marginBottom:"0.5rem"}}>
                        <Card.Img src={elm.meals.mealPicture} className="card_img_meals"  />
                        <Card.ImgOverlay>
                            <Card.Title>{elm.meals.mealTitle}</Card.Title>
                            <Card.Text>Created at: {elm.createdAt}</Card.Text>
                            <Card.Text>Time remaining: {new Date(elm.createdAt).getTime() - elm.expiryTime}</Card.Text>
                        </Card.ImgOverlay>
                        <Card.Footer>Expired Status: {elm.isExpired.toString()}</Card.Footer>
                    </Card>
                    </Col>
                ))
            )}
            {console.log(userData)}
            </Row>
            </Container>
        
    //     <div>
    //         <Card className="bg-dark text-white">
    //   <Card.Img src="holder.js/100px270" alt="Card image" />
    //   <Card.ImgOverlay>
    //     <Card.Title>Card title</Card.Title>
    //     <Card.Text>
    //       This is a wider card with supporting text below as a natural lead-in
    //       to additional content. This content is a little bit longer.
    //     </Card.Text>
    //     <Card.Text>Last updated 3 mins ago</Card.Text>
    //   </Card.ImgOverlay>
    // </Card>
    //     </div>
    )
}

export default ExpiryFoodsView;