import React, { useState, useRef, useEffect } from 'react';
import SearchInput from './components/SearchInput';
import Movie from './components/Movie';
import {
  Normalize,
  Grid,
  Typography,
  Col,
  Row,
  Button,
} from '@smooth-ui/core-sc';
import { MovieList, useRetryWhenError } from './containers/MovieDd';
import { useShortcutEffect } from './containers/KeyPress';
import { useTranslate, useI18n } from './components/I18n';
import { pipe } from './utils/functional';
import Catch from './components/Catch';

function App(props) {
  const [query, setQuery] = useState(() => '' /* Only on mount */);
  const { locale, setLocale } = useI18n();
  const catchRef = useRef();
  const searchFieldRef = useRef();
  const languageText = useTranslate(locale);

  useRetryWhenError(query, catchRef);

  useShortcutEffect('alt+s', () => {
    searchFieldRef.current.focusSearchField();
  });

  useShortcutEffect('escape', () => {
    searchFieldRef.current.blurSearchField();
  });

  return (
    <>
      <Button
        onClick={pipe(
          getNewLocale,
          setLocale,
        )}>
        {languageText}
      </Button>

      <Grid py={50}>
        <Normalize />
        <Typography variant="display-1">{useTranslate('title')}</Typography>
        <SearchInput ref={searchFieldRef} onChange={setQuery} value={query} />
        <p>Search: {query}</p>

        <Catch ref={catchRef}>
          <Row>
            <MovieList query={query}>
              {({ movies }) =>
                movies.map(movie => (
                  <Col xs={3} key={movie.id}>
                    <Movie {...movie} />
                  </Col>
                ))
              }
            </MovieList>
          </Row>
        </Catch>
      </Grid>
    </>
  );

  function getNewLocale() {
    return locale === 'en' ? 'fr' : 'en';
  }
}

export default App;
