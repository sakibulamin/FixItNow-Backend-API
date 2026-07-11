export interface IBooking {
  customerId: string;
  technicianId: string;
  serviceId: string;
  bookingDate: Date;
  address: string;
  amount:number;
}

export interface IBookingUpdate {
  status?:
    | "REQUESTED"
    | "ACCEPTED"
    | "DECLINED"
    | "PAID"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED";
}