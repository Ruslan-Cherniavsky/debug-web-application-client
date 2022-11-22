import React, { Component } from 'react';

// @ts-ignore

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useState, useEffect } from "react"

// const client = new W3CWebSocket('ws://localhost:9876');

const WsTest = () => {

    // const socket = new WebSocket('ws://localhost:9876');
    const socket = new WebSocket('ws://localhost:9876');

    useEffect(() => {

        socket.onopen = () => {
            console.log('************************', 'WebSocket Client Connected');

        };
        socket.onmessage = ({ data }) => {
            console.log('****** Message from server ', data);
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

