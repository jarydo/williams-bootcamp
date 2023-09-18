export class ReviewerRequestResource {
    constructor(requestBody) {
        ReviewerRequestResource.validate(requestBody);

        this.name = requestBody.name;
        /* null values are transformed to undefined so they don't get persisted in the DB (saves space) */
        this.address = requestBody.address === null ? undefined : requestBody.address;
        this.type = requestBody.type === null ? undefined : requestBody.type;
        this.budget = requestBody.budget === null ? undefined : requestBody.budget;
        this.description = requestBody.description === null ? undefined : requestBody.description;
        this.rating = requestBody.rating === null ? undefined : requestBody.rating;
    }


    static validate(requestBody) {
        const acceptedFields = new Set(["name", "address", "type", "budget", "description", "rating"]);
        const invalidFields = Object.keys(requestBody).filter(k => !acceptedFields.has(k));
        if (invalidFields.length > 0) {
            throw new Error(
                `Invalid fields provided in restaurant request, expected any of: [${[...acceptedFields].join(", ")}], found: [${[...invalidFields].join(", ")}]`
            );
        }
    
        if (requestBody.name === undefined || requestBody.name === null) {
            throw new Error("Invalid restaurant request, name field is required");
        }

        if (requestBody.budget !== undefined && requestBody.budget !== null) {
            requestBody.budget = requestBody.budget.toLowerCase();
            const budgetValues = new Set(["low", "medium", "high"]);
            if (!budgetValues.has(requestBody.budget)) {
                throw new Error(
                    `Invalid budget provided in restaurant request, expected one of: [${[...budgetValues].join(", ")}], found: ${requestBody.budget}`
                );
            }
        }

        if (requestBody.rating !== undefined && requestBody.rating !== null) {
            const ratingNum = Number(requestBody.rating);
            if (ratingNum === NaN || !Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
                throw new Error(
                    `Invalid rating provided in restaurant request, expected: an integer between 1-5, found: ${requestBody.rating}`
                );
            }
        }
    }
};
