export class OfferRequest {
    user: string;
    offer: string;
    state: string;
    request_type: string;
    request_date: string;
    id: string;
    img: string;

    constructor(user, offer, state, type, date) {
        this.user = user;
        this.offer = offer;
        this.state = state;
        this.request_date = date;
        this.request_type = type;
    }
}