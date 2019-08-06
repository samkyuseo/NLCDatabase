import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import SearchHistoryItem from './SearchHistoryItem';
//search history passed in as a parameter from the parent Dashboard.
const SearchHistory = ({ searchHistory }) => {
  return (
    <div>
      <Fragment>
        <h2 className='my-2'>Search History</h2>
        <div className='profiles'>
          {searchHistory.length > 0 ? (
            searchHistory.map(sh => (
              <SearchHistoryItem key={sh._id} searchHistory={sh} />
            ))
          ) : (
            <h4> You have not made any searches yet </h4>
          )}
        </div>
      </Fragment>
    </div>
  );
};

SearchHistory.propTypes = {};

export default connect()(SearchHistory);

// import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import Moment from 'react-moment';
// import { connect } from 'react-redux';
// import { deleteSearchHistory } from '../../actions/profile';

// const SearchHistory = ({ searchHistory, deleteSearchHistory }) => {
//   const searchHistories = searchHistory.map(sh => (
//     <tr key={sh._id}>
//       <td>{sh.searchString}</td>
//       {/* <td className='hide-sm'>{sh.searchResults}</td> */}
//       <td>
//         <Moment format='YYYY/MM/DD'>{sh.searchDate}</Moment>
//       </td>
//       <td>
//         <button
//           onClick={() => deleteSearchHistory(sh._id)}
//           className='btn btn-danger'
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   ));
//   return (
//     <Fragment>
//       <br />
//       <h2 className='my2'>Search History</h2>
//       <br />
//       <table className='table'>
//         <thead>
//           <tr>
//             <th>Search Term</th>
//             <th className='hide-sm'>Results</th>
//             <th className='hide-sm'>Date</th>
//             <th />
//           </tr>
//         </thead>
//         <tbody>{searchHistories}</tbody>
//       </table>
//     </Fragment>
//   );
// };

// SearchHistory.propTypes = {
//   searchHistory: PropTypes.array.isRequired,
//   deleteSearchHistory: PropTypes.func.isRequired
// };

// export default connect(
//   null,
//   { deleteSearchHistory }
// )(SearchHistory);
