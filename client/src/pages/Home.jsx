
import React, { useState, useEffect } from 'react';
import { Card } from "react-bootstrap"

export default function Home(){

    return (
        <>
            <div className="container">
                <Card>
                    <Card.Body>
                        <Card.Text>Hello World</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}