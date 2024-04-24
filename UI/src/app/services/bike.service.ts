import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BIKES_URL, CREATE_BIKE_URL, MODIFY_BIKE_URL } from '../url.constants';
import { Observable } from 'rxjs';
import { Bike } from '../libs/bike.model';

@Injectable({
    providedIn: 'root',
})
export class BikeService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<Bike[]> {
        return this.http.get<Bike[]>(BIKES_URL);
    };

    create(bike: Bike): Observable<Bike> {
        return this.http.post<Bike>(CREATE_BIKE_URL, bike);
    };

    update(bike: Bike): Observable<Bike> {
        return this.http.put<Bike>(MODIFY_BIKE_URL+bike.id, bike);
    };

    delete(id: string): Observable<Bike> {
        return this.http.delete<Bike>(MODIFY_BIKE_URL+id);
    }
}