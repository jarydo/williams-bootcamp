import React from 'react';
import PropTypes from 'prop-types';

import './BasicTable.scss';

/**
 * "Get" specifies a generic return
 * @param {*} object data element; see typing in the PropTypes
 */
const getTableHeaders = (object = {}) => {
  return Object.keys(object);
}

/**
 * "render" specifies JSX in the return 
 * @param {*} row data element
 */
const renderRows = (row = {}) => {
  return (
    <tr key={row.id}>
      {Object.keys(row).map((key, i) => {
        if (key === 'rating') {
          return (
            <td key={i}>
              {renderRatingStars(row[key])}
            </td>
          );
        } else {
          return (
            <td key={i}>{row[key]}</td>
          );
        }
      })}
    </tr>
  )
}

/**
 * Renders star icons based on the rating value
 * @param {number} rating - The rating value (0-5)
 */
const renderRatingStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<span key={i} className="star-icon filled-star">★</span>);
    } else {
      stars.push(<span key={i} className="star-icon">☆</span>);
    }
  }
  return stars;
}

const BasicTable = ({ data }) => {
  return (
    <table className="basic-table">
      <tbody>
        <tr>
          {getTableHeaders(data[0]).map(
            headerName => <th key={headerName}>{headerName}</th>
          )}
        </tr>
        {data.map(renderRows)}
      </tbody>
    </table>
  )
}

export default BasicTable;

/**
 * Much more substantial example of typing properties. If the data does not align to the type, an error will occur.
 */
BasicTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
      budget: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
      rating: PropTypes.number,
      type: PropTypes.string
    })
  )
};

BasicTable.defaultProps = {
  data: []
};
