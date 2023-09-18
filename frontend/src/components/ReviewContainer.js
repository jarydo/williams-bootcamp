/**
 * This is a Container Component.
 * It is a Higher Order Component that "connects" a React Component with the global Redux Store
 */
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { loadData, clearData } from '../actions';
import DisplayReviews from './DisplayReviews';

/**
 * This maps the data stored in the store as props passed into the component
 * @param {*} store the redux store
 */
const mapStateToProps = store => {
  return {
    storeData: store.dataReducer.data
  }
};

/**
 * This wraps all specified actions with dispatch (a special function which dispatches the actions to the store)
 * as props passed into the component
 * @param {*} dispatch func
 */
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { 
      // add other actions here
      loadData,
      clearData
    },
    dispatch
  )
};

const ReviewContainer = (userId) => {
    const [restaurant, setRestaurant] = useState("");
    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }
    const handleChangeRating = (event) => {
        setRating(event.target.value);
    }
    const handleChangeRestaurant = (event) => {
        setRestaurant(event.target.value);
    }

    async function handleAddReview(r) {
        const result = await fetch('/api/restaurants')
        let data = await result.json()
        const restaurantId = data.filter((restaurantObj)=>restaurantObj.name===restaurant)[0].id
        console.log(restaurantId)



        fetch("/" + "" + "/review", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify({
                // Request payload data in JSON format
                restaurantId: restaurantId,
                restraurant: restaurant,
                description: description,
                rating: rating
              }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    }
    return (
        <div>
            <input onChange = {handleChangeRestaurant} type = "restaurant" placeholder="restaurant" value = {restaurant} ></input>
            <input onChange = {handleChangeRating} type = "rating" placeholder="rating" value = {rating} ></input>
            <input onChange = {handleChangeRating} type = "description" placeholder="rating description" value = {description} ></input>
            <button onClick = {handleAddReview}> add review </button>
            <DisplayReviews loadData = {loadData} storeData = {clearData} userName = "Reviewer"/>
        </div>
        
    );
}

// export default connect(mapStateToProps, mapDispatchToProps)(DisplayReviews);
export default ReviewContainer
