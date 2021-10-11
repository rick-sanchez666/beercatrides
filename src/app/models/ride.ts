import { IUser } from "./user";

export interface IRideRequest {
    id: string;
    from: string;
    to: string;
    dateOfTrip: Date | string;
    seats: number | string;
    requestedBy: string;
    accepted: boolean;
}

export interface IRide {
    id: string;
    acceptedBy: IUser;
    seatsReserved: string;
    rideRequests: Array<IRideRequest>; 
}

export class NewRide {
    accepted: boolean;
    acceptedBy: string;
    rideRequest: any[];
    constructor( accepted:boolean, acceptedBy: string, requestId: any[]) {
        this.accepted = accepted;
        this.acceptedBy = acceptedBy;
        this.rideRequest = requestId;
    }
}
export class RideRequest {
    from: string;
    to: string;
    dateOfTrip: Date | string;
    seats: number | string;
    requestedBy: string;
    accepted = false;
    constructor(from: string, to:string, date: string, seats: any,requestedBy: string ) {
        this.from = from;
        this.to =to;
        this.seats = seats;
        this.dateOfTrip =date;
        this.requestedBy = requestedBy;
    }
}
