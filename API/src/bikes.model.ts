import { Schema, model } from "mongoose";

export interface Bike {
    id: number,
    type: string,
    name: string,
    description: string,
    price: number,
    wheelName: string,
    wheelSize: string,
    frameName: string,
    frameSize: string,
    frameWeight: string,
    stock: number,
    orderAvailabilityId: number,
    imageUrl: string,
}

export const BikeSchema = new Schema<Bike>(
    {
        type: {type: String, required:true},
        name: {type: String, required:true},
        description: {type: String, required:true},
        price: {type: Number, required:true},
        wheelName: {type: String, default: "Generic"},
        wheelSize: {type: String, required: true},
        frameName: {type: String, default: "Generic"},
        frameSize: {type: String, required: true},
        frameWeight: {type: String, required: true},
        stock: {type: Number, required: true},
        orderAvailabilityId: {type: Number, default: 4},
        imageUrl: {type: String, default: ''},
    }, {
        toJSON: {
            virtuals: true,
        },
        toObject:{
            virtuals: true,
        },
        timestamps:true,
    }
)

export const BikeModel = model<Bike>('bike', BikeSchema);