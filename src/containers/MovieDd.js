import { useState, useEffect, useReducer } from 'react';
import { pipe } from '../utils/functional';
import axios from 'axios';
import { useI18n } from '../components/I18n';

const CONFIG = {
  API_KEY: 'c5742978852b8f695a61e22a33a8196c',
  SEARCH_URL: 'https://api.themoviedb.org/3/search/movie',
};

const initialState = { list: [], error: false };

const [EMPTY_SEARCH, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE] = [
  'EMPTY_SEARCH',
  'FETCH_MOVIES_SUCCESS',
  'FETCH_MOVIES_FAILURE',
];

const successMoviesFetch = payload => ({
  type: FETCH_MOVIES_SUCCESS,
  payload,
});

const failureMoviesFetch = error => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error,
});

function reducer(state, action) {
  switch (action.type) {
    case EMPTY_SEARCH:
    case FETCH_MOVIES_SUCCESS:
      return { list: action.payload, error: false };
    case FETCH_MOVIES_FAILURE:
      return { list: [], error: action.payload };
    default:
      throw new Error();
  }
}

export const useMovieSearch = query => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { locale } = useI18n();

  useEffect(
    () => {
      if (!query) return dispatch({ type: EMPTY_SEARCH, payload: [] });

      const apiSubscription = axios.CancelToken.source();

      const handleSuccess = pipe(
        formatResponse,
        successMoviesFetch,
        dispatch,
      );

      const handleFailure = pipe(
        failureMoviesFetch,
        dispatch,
      );

      axios
        .get(CONFIG.SEARCH_URL, {
          params: {
            api_key: CONFIG.API_KEY,
            query,
            language: locale,
          },
          cancelToken: apiSubscription.token,
        })
        .then(handleSuccess)
        .catch(error => !axios.isCancel(error) && handleFailure(error));

      return cleanUpAndCancelRequest(apiSubscription);
    },
    [locale, query],
  );

  if (state.error) throw state.error;

  return state.list;
};

export const useDebounced = (query, timeout) => {
  const [value, setValue] = useState(query);

  useEffect(
    () => {
      const id = setTimeout(() => setValue(query), timeout);
      return () => clearTimeout(id);
    },
    [timeout, query],
  );

  return value;
};

export const useRetryWhenError = (query, catchRef) => {
  useEffect(
    () => {
      catchRef.current &&
        catchRef.current.state.hasError &&
        catchRef.current.retry();
    },
    [query, catchRef],
  );
};

// Render props
export function MovieList({ children, query }) {
  const debouncedQuery = useDebounced(query, 200);
  const movies = useMovieSearch(debouncedQuery);
  return children({ movies });
}

function formatResponse(response) {
  return response.data.results;
}

function cleanUpAndCancelRequest(apiSubscription) {
  return () => apiSubscription.cancel('Operation canceled by update/unmount.');
}
