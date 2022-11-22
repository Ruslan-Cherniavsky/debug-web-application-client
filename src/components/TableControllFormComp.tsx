import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IRailspireMsg from '../interfaces/RailspireMsg';

// import io from 'socket.io-client';

const socket = new WebSocket('ws://localhost:9876');

// const socket = io('ws://localhost:9876');

const TableControlForm = () => {
    const [direction, setDirection] = useState('');
    const [speed, setSpeed] = useState('');
    // const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {

        socket.onopen = () => {
            console.log('************************', 'WebSocket Client Connected');
        };
        socket.onmessage = ({ data }) => {
            console.log('****** Message from server ', data);
            console.log('******** Parsed message from server', JSON.stringify(data));

        };

        socket.onclose = () => {
            console.log('************************', 'WebSocket Client closed');
        };

        return () => {

            // socket.close()
            // socket.off('connect');
            // socket.off('disconnect');
            // socket.off('pong');
            // socket.off('message');
        };

    }, []);


    const handleChange = (event: SelectChangeEvent) => {
        setDirection(event.target.value as string);
    };

    const railSpireDataSendHandle = () => {

        if (!speed) { return alert('enter speed') }
        if (!direction) { return alert('enter direction') }

        const dataToSend: IRailspireMsg = {
            type: 'speed',
            speed: Number(speed),
            direction: direction
        }
        // socket.emit('railSpireData', JSON.stringify(dataToSend))


        socket.send(JSON.stringify(dataToSend));

        console.log(dataToSend)
    }

    return (<>
        <div className="col s4">
            <Box style={{ margin: '0 0 0 0' }}
                component="form"
                noValidate
                autoComplete="off"
            >
                <TextField fullWidth onChange={(e) => setSpeed(e.target.value)} value={speed}
                    id="outlined-number"
                    label="Speed"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>
        </div>

        <div className="col s4">
            <Box >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Direction</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={direction}
                        label="Direction"
                        onChange={handleChange}
                    >
                        <MenuItem value={"FWD"}>FWD</MenuItem>
                        <MenuItem value={"REV"}>REV</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>

        <div className="col s4">
            <Button onClick={railSpireDataSendHandle} style={{ color: 'white' }} size="large" className="btn waves-effect waves-light btn-large  pink lighten-2" fullWidth >Send
                <i className="material-icons right">send</i>
            </Button>
        </div>
    </>
    );
}

export default TableControlForm;













//old verion 




// const socket = io('ws://localhost:9876');

// const TableControlForm = () => {
//     const [direction, setDirection] = useState('');
//     const [speed, setSpeed] = useState('');
//     const [isConnected, setIsConnected] = useState(socket.connected);

//     useEffect(() => {

//         socket.on('connect', () => {
//             setIsConnected(true);
//         });

//         socket.on('disconnect', () => {
//             setIsConnected(false);
//             alert('Websocket disconected!')
//         });

//         return () => {
//             socket.off('connect');
//             socket.off('disconnect');
//             socket.off('pong');
//             socket.off('message');
//         };

//     }, []);


//     const handleChange = (event: SelectChangeEvent) => {
//         setDirection(event.target.value as string);
//     };

//     const railSpireDataSendHandle = () => {

//         if (!speed) { return alert('enter speed') }
//         if (!direction) { return alert('enter direction') }

//         const dataToSend: IRailspireMsg = {
//             type: 'speed',
//             speed: Number(speed),
//             direction: direction
//         }
//         socket.emit('railSpireData', JSON.stringify(dataToSend))

//         console.log(dataToSend)
//     }

//     return (<>
//         <div className="col s4">
//             <Box style={{ margin: '0 0 0 0' }}
//                 component="form"
//                 noValidate
//                 autoComplete="off"
//             >
//                 <TextField fullWidth onChange={(e) => setSpeed(e.target.value)} value={speed}
//                     id="outlined-number"
//                     label="Speed"
//                     type="number"
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                 />
//             </Box>
//         </div>

//         <div className="col s4">
//             <Box >
//                 <FormControl fullWidth>
//                     <InputLabel id="demo-simple-select-label">Direction</InputLabel>
//                     <Select
//                         labelId="demo-simple-select-label"
//                         id="demo-simple-select"
//                         value={direction}
//                         label="Direction"
//                         onChange={handleChange}
//                     >
//                         <MenuItem value={"FWD"}>FWD</MenuItem>
//                         <MenuItem value={"REV"}>REV</MenuItem>
//                     </Select>
//                 </FormControl>
//             </Box>
//         </div>

//         <div className="col s4">
//             <Button onClick={railSpireDataSendHandle} style={{ color: 'white' }} size="large" className="btn waves-effect waves-light btn-large  pink lighten-2" fullWidth >Send
//                 <i className="material-icons right">send</i>
//             </Button>
//         </div>
//     </>
//     );
// }

// export default TableControlForm;






