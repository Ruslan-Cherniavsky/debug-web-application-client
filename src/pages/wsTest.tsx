import React, { Component } from 'react';

// @ts-ignore

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useState, useEffect } from "react"

const client = new W3CWebSocket('ws://localhost:9876');
// const client = new W3CWebSocket('ws://localhost:9876');

// class WsTest extends Component {

//     componentWillMount() {

//         client.onopen = () => {
//             console.log('************************', 'WebSocket Client Connected');
//         };
//         // @ts-ignore
//         client.onmessage = (message) => {
//             console.log('************************', message);
//         };
//     }

//     render() {
//         return (<div> Practical Intro To WebSockets. </div>);
//     }
// }


const WsTest = () => {



    // Regular Websockets

    const socket = new WebSocket('ws://localhost:9876');

    // Listen for messages



    useEffect(() => {

        socket.onopen = () => {
            console.log('************************', 'WebSocket Client Connected');

        };

        socket.onmessage = ({ data }) => {
            console.log('****** Message from server ', data);

        };
        socket.onmessage = ({ data }) => {
            console.log('******** Parsed message from server', JSON.stringify(data));

        };




    }, []);



    const handleChange = () => {
        socket.send('hello');
    };


    return (

        <>
            <h1>ws Comp</h1>
            <button onClick={handleChange}> send data</button>
        </>
    );
};


export default WsTest;


// Regular Websockets

// const socket = new WebSocket('ws://localhost:9876');

// Listen for messages
// socket.onmessage = ({ data }) => {
//     console.log('Message from server ', data);
// };

// document.querySelector('button').onclick = () => {
//     socket.send('hello');
// }