import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchTranscripts, createSavedSearch } from '../../actions/search';
import { addSearchHistory } from '../../actions/profile';

const SearchBar = ({
  searchTranscripts,
  addSearchHistory,
  createSavedSearch,
  searchString,
  savedSearch: { SearchGUID, SearchQuery, SearchDate }
}) => {
  const [text, setText] = useState('');

  return (
    <div>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          //searchTranscripts(text);
          createSavedSearch(text);
          addSearchHistory({
            SearchQuery: SearchQuery,
            SearchDate: SearchDate,
            SearchGUID: SearchGUID
          });
        }}
      >
        <div className='form-group'>
          <input
            name='text'
            value={text}
            type='text'
            placeholder={
              // searchString === null ? 'Enter Search Terms' : searchString
              'Enter Search Terms'
            }
            onChange={e => setText(e.target.value)}
            required
          />
        </div>
        <input
          type='submit'
          value='Create a Saved Search'
          className='btn btn-primary'
        />
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  searchTranscripts: PropTypes.func.isRequired,
  createSavedSearch: PropTypes.func.isRequired,
  savedSearch: PropTypes.object.isRequired,
  addSearchHistory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  searchString: state.search.searchString
});

export default connect(mapStateToProps, {
  searchTranscripts,
  createSavedSearch,
  addSearchHistory
})(SearchBar);

// import React, { Fragment, useState } from 'react';
// import { Link, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { addSearchHistory } from '../../actions/profile';
// import { searchTranscripts } from '../../actions/search';

// const SearchBar = ({ addSearchHistory, searchTranscripts }) => {
//   const [formData, setFormData] = useState({
//     searchString: null,
//     searchResults: []
//   });

//   const { searchString } = formData;

//   const onChange = e => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//       searchResults: 'www.scripts.com'
//     });
//   };

//   const onSubmit = e => {
//     e.preventDefault();
//     searchTranscripts();
//     addSearchHistory(formData);
//   };

//   return (
//     <Fragment>
//       <div class='post-form'>
//         <form class='form my-1' onSubmit={e => onSubmit(e)}>
//           <input
//             type='text'
//             placeholder='Search'
//             name='searchString'
//             value={searchString}
//             onChange={e => onChange(e)}
//           />
//           <input type='submit' class='btn btn-dark my-1' />
//         </form>
//       </div>
//     </Fragment>
//   );
// };

// SearchBar.propTypes = {
//   addSearchHistory: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({
//   search: state.search
// });

// export default connect(
//   mapStateToProps,
//   { addSearchHistory, searchTranscripts }
// )(withRouter(SearchBar));
