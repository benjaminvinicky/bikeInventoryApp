import {connect, ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    connect("mongodb+srv://benjaminvinicky:7rO05XzrO8jDKy13@bikeinventory.nbztb8k.mongodb.net/?retryWrites=true&w=majority&appName=BikeInventory", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions).then(
        () => console.log("Connection to db successful."),
        (error: any) => console.log("connection unsuccessful:", error)
    )
}