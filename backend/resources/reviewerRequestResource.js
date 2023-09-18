export class ReviewerRequestResource {
    constructor(requestBody) {

        this.name = requestBody.name;
        this.reviews = requestBody.reviews === null || requestBody.reviews == [] ? undefined : requestBody.reviews;
    }
};
