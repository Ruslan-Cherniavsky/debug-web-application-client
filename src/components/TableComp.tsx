import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IRailvisionMsg from '../interfaces/RailvisionMsg';


import { useState, useEffect } from "react";
import io from 'socket.io-client';

const socket = io('ws://localhost:9876');

export default function DataTable() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(Date);
  const [response, setResponse] = useState<Array<any>>([]);

  useEffect(() => {

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      // alert(' Oh... No... Websocket disconected!')
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    socket.on("dataStreeming", (data) => {
      let parsedData: IRailvisionMsg = JSON.parse(data).detections[0]



      setResponse(arr => [...arr, parsedData])
      console.log(data)
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
      socket.off('dataStreeming');
    };

  }, []);


  useEffect(() => {
    if (response.length > 999) {
      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('pong');
        socket.off('message');
      };
    }
    // console.log(response)
  }, [response]);

  // const sendPing = () => {
  //   socket.emit('ping');
  // }

  return (
    <>
      <div className="tableDiv col s12">
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: '80vh', minHeight: '80vh', display: 'flex', top: '0', flexDirection: 'column-reverse' }} >
            <Table stickyHeader aria-label="sticky table">
              <TableHead >
                <TableRow>
                  <TableCell>ID Frame</TableCell>
                  <TableCell align="right">Class</TableCell>
                  <TableCell align="right">Severity</TableCell>
                  <TableCell align="right">Distance</TableCell>
                  <TableCell align="right">Latitude</TableCell>
                  <TableCell align="right">Longitude</TableCell>
                  <TableCell align="right">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {response.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, overflow: 'auto', flexDirection: 'column-reverse' }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.class}</TableCell>
                    <TableCell align="right">{row.severity}</TableCell>
                    <TableCell align="right">{row.distance}</TableCell>
                    <TableCell align="right">{row.location.latitude}</TableCell>
                    <TableCell align="right">{row.location.longitude}</TableCell>
                    <TableCell align="right">{row.time.slice(15, 24)} </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
}