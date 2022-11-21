
export default interface IRailvisionMsg {
    type: string,
    detections: [
        {
            id: number,
            class: "Car",
            severity: number,
            distance: number,
            direction: string,
            location: {
                latitude: number,
                longitude: number
            },
            time: Date
        }
    ],
    "end_of_rail": boolean
}





//Railvision_schema {
//     properties: {
//         type: { "type": "string" },
//         end_of_rail: { "type": "boolean" },
//         detections: {
//             type: "array",
//             items: {
//                 type: "object",
//                 additionalProperties: true,
//                 required: ["id", "class", "severity", "distance", "direction", "time", "location"],
//                 properties: {
//                     id: { 'type': "number" },
//                     class: { 'type': "string" },
//                     severity: { "type": "number" },
//                     distance: { "type": "number" },
//                     direction: { "type": 'string' },
//                     time: { "type": "string" },
//                     location: {
//                         type: "object",
//                         required: ['latitude', "longitude"],
//                         properties: {
//                             latitude: { "type": "number" },
//                             longitude: { "type": "number" },
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }
