import { IUser } from "./user";

export interface IRideRequest {
    id: string;
    from: string;
    to: string;
    dateOfTrip: Date | string;
    seatsRequested: number | string;
    requestedBy: string;
    accepted: boolean;
    acceptedBy?: string;
    seatsReserved?: string;
    totalSeatsAvailable?:string;
    passengers: any[];
    bookingLog: []
}



export class RideRequest {
    from: string;
    to: string;
    dateOfTrip: Date | string;
    seatsRequested: number | string;
    requestedBy: string;
    accepted = false;
    constructor(from: string, to:string, date: string, seats: any,requestedBy: string ) {
        this.from = from;
        this.to =to;
        this.seatsRequested = seats;
        this.dateOfTrip =date;
        this.requestedBy = requestedBy;
    }
}
