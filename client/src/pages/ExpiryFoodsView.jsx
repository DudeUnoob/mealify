import React, { useState, useEffect, useContext } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { useUserContext } from "../context/UserContext"
import { onLocalStorageChange } from '../functions/onLocalStorageChange';
import "../public/css/ExpiryFoodsView.css"
import { productionAPIURL } from "../../config/config.json"
import io from "socket.io-client"
import { deleteMeal } from '../microservices/deleteMeal';
const socket = io(productionAPIURL)


function ExpiryFoodsView () {

    const [userData, setUserData] = useState(null)
    const [loadingState, setLoadingState] = useState(false)
    
    const { user } = useUserContext()
   

    useEffect(() => {
        setUserData(user)
    },[user])

    useEffect(() => {
        onLocalStorageChange()
        
        socket.on("get_user_response", async data => {
            setUserData(data)
        })
        
    }, [])

    const handleMealDelete = async(docId) => {
        console.log(docId)
        const verify = await deleteMeal(docId)
        if(verify.status == 201){
            socket.emit("get_user", localStorage.getItem("token"))
        }
    }
        
       
    return (
         
            <Container fluid>
                <Row>
            {userData && (
                userData.meals.map((elm, i) => (
                   
                    <Col key={i} md >
                    <Card className="bg-dark text-white" style={{ marginBottom: "0.8rem"}} >
                    {/* <Card.Img  className="card_img_meals"  /> */}

                            <div className="content" style={{padding:"15px"}}>
                            <Card.Title>{elm.meals.mealTitle}</Card.Title>
                            <Card.Text>Created at: {elm.createdAt}</Card.Text>
                            <Card.Text>Expires on: {new Date(new Date(elm.createdAt).getTime() + elm.expiryTime).toString()}</Card.Text>
                            <img src={elm.meals.mealPicture}/>
                            </div>
                            
                            <Button style={{ margin:"15px", width: "20%"}} variant="danger" onClick={() => handleMealDelete(elm._id)}>Delete</Button>
                        <Card.Footer>Expired Status: {elm.isExpired.toString()}</Card.Footer>
                    </Card>
                    </Col>
                ))
            )}
            
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