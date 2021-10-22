import { IUser } from "./user";

export interface IRideRequest {
    id?: string;
    from: string;
    to: string;
    dateOfTrip: Date | string;
    seatsRequested: number | string;
    accepted: boolean;
    requestedBy: string
}

export interface ITrip {
    id?: string;
    from: string;
    to: string;
    dateOfTrip: Date | string;
    totalSeatsAvailable?:string;
    acceptedBy: string;
    requestedBy: boolean;
    acceptedRideRequest: IAcceptedReq[];
    pendingRideRequest: IAcceptedReq[];
    bookingLog?: IReqLog[];
}

export interface IReqLog {
    description?: string;
    userId: string;
    action: 'ACCEPTED BY' | 'NEW FILL IN REQUEST BY' | 'RIDE CANCELLED BY';
}

export interface IAcceptedReq {
    userId: string;
    noOfSeats: string | number;
    status: 'accepted' | 'pending' | 'rejected';
}



