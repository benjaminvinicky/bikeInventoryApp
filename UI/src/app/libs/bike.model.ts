import { MatPaginator } from "@angular/material/paginator"

export interface Bike {
    id: string,
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
    orderAvailabilityId: number | string,
    imageUrl: string,
}

export interface BikeSummary {
    id: string,
    type: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    availability: string,
}

export enum Availability {
    Available = "Available",
    PreOrder = "Coming Soon",
    OoS = "Out of Stock",
    Unavailable = "Unavailable",
};

export const availabilityMapping = [
    Availability.Available,
    Availability.PreOrder,
    Availability.OoS,
    Availability.Unavailable,
]