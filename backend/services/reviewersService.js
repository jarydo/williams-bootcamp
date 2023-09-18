/**
 * Restaurant is a mongoose model (data access object) defined in the specified file,
 * it references the "restaurants" collection in our MongoDB database
 */
import Reviewer from "../persistence/models/reviewer";
import { ResponseResource } from "../resources/responseResource";
import { ReviewerResponseResource } from "../resources/reviewerResponseResource";

/**
 * while our business logic is really simple so far, it is beneficial to keep it apart from the controller logic
 * see note (1) below for an example of the type of logic that belongs here
 * separation of concerns leads to maintainable code as the application grows, and also makes the code easier to unit test
 */

async function getReviewers() {
    try {
        /**
         * since Restaurant is a mongoose model, we can call the mongoose find() method on it
         * calling Restaurant.find() will query our restaurant collection in MongoDB and return the results asynchronously
         * find() optionally takes a filter parameter, but we leave it blank since we want to retrieve all restaurants
         */
        const reviewers = await Reviewer.find();

        /**
         * note (1): suppose in the future we want to return the average restaurant rating along with the restaurants
         * this would be the ideal place to add that logic
         */

        /**
         * convert the raw DB records to a list of RestaurantResponseResource and wrap in a ResponseResource
         * jump into the RestaurantResponseResource definition to view the transformations applied
         */
        return new ResponseResource(reviewers.map(r => new ReviewerResponseResource(r)));
    } catch (error) {
        return new ResponseResource(null, error.message);
    }
}

async function getReviewer(id) {
    try {
        /**
         * since Restaurant is a mongoose model, we can call the mongoose find() method on it
         * calling Restaurant.find() will query our restaurant collection in MongoDB and return the results asynchronously
         * find() optionally takes a filter parameter, but we leave it blank since we want to retrieve all restaurants
         */
        const reviewer = await Reviewer.findById(id);

        /**
         * note (1): suppose in the future we want to return the average restaurant rating along with the restaurants
         * this would be the ideal place to add that logic
         */

        /**
         * convert the raw DB records to a list of RestaurantResponseResource and wrap in a ResponseResource
         * jump into the RestaurantResponseResource definition to view the transformations applied
         */
        return new ResponseResource(new ReviewerResponseResource(reviewer));
    } catch (error) {
        return new ResponseResource(null, error.message);
    }
}


async function createReviewer(reviewer) {
    try {
        /* again, using the mongoose model to insert a new restaurant into MongoDB */
        const newReviewer = await Reviewer.create(reviewer);
        return new ResponseResource(new ReviewerResponseResource(newReviewer));
    } catch (error) {
        return new ResponseResource(null, error.message);
    }
}


async function updateReviewer(id, reviewer) {
    try {
        /* unlike create(), findByIdAndUpdate() does not automatically run validators, so we specify it as an option */
        const modifiedReviewer =
            await Reviewer.findByIdAndUpdate(id, reviewer, { new: true, runValidators: true });
        return new ResponseResource(new ReviewerResponseResource(modifiedReviewer));
    } catch (error) {
        return new ResponseResource(null, error.message);
    }
}

async function deleteReviewer(id) {
    try {
        const deleted = await Reviewer.findByIdAndDelete(id);

        // TODO: this should ideally be handled earlier, should be 400 instead of 500 error
        if (!deleted) {
            throw new Error(`Attempted to delete reviewer with id = ${id} but it was not found`);
        }

        return new ResponseResource(null);
    } catch (error) {
        console.log(error)
        return new ResponseResource(null, error.message);
    }
}

const ReviewersService = { getReviewer, getReviewers, createReviewer, updateReviewer, deleteReviewer };
export default ReviewersService;
