import React, { useEffect, useState } from 'react';
import BasicTable from './BasicTable';

import './Display.scss';

/**
 * This is a stateful function component using React Hooks
 */
const DisplayReviews = ({ loadData, storeData, userName }) => {
  /**
   * if you've used class components before, the useState hook is similar to this code block:
   *
   * constructor(props) {
   *   super(props);
   *   this.state = {
   *     data: []
   *   };
   * }
   *
   * setData is a function used to update data, similar to this.setState({ data: ["my", "new", "data"] })
   */
  const [data, setData] = useState([]);


  /**
   * useEffect is a hook used to apply side effects to the component, it can be used for fetching data.
   * similar to componentDidMount and componentDidUpdate, it runs when the component mounts or updates
   *
   * the second argument ([loadData] in this case) is an array of variables that the hook depends on,
   * the hook is only activated if one of those variables change
   */
  useEffect(() => {
    let hasUnmounted = false;

    async function fetchData() {
        const result = await fetch('/api/reviewers')
        const data = await result.json();
        console.log(data);
      const reviews = data.filter((reviewer)=>reviewer.name === userName)[0].reviews
      console.log(reviews)
      /**
       * since the API request is async, it's possible that the component has unmounted by the time we call setData.
       * calling setData on an unmounted component will cause a warning, so we guard using the bool hasUnmounted
       *
       * a neater solution from Xin: https://github.com/uwblueprint/arbitrium/pull/118
       * ^ this is likely a pattern you want to adopt in your actual projects
       */
      if (!hasUnmounted) {
        setData(reviews);
        loadData(reviews);
      }
    }

    fetchData();

    /* this function is a cleanup function, it always runs when the component unmounts */
    return () => {
      hasUnmounted = true;
    };
  }, [loadData]);


  return (
    <div className="display-container">
      <h2>Reviews</h2>
      <BasicTable data={data} />
    </div>
  );
}

export default DisplayReviews;

DisplayReviews.propTypes = {};
