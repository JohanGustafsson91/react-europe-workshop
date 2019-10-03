import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Input } from '@smooth-ui/core-sc';
import { pipe } from '../utils/functional';
import { useTranslate } from '../components/I18n';

const SearchInput = forwardRef(({ onChange, value }, ref) => {
  const inputRef = useRef();
  const placeholderText = useTranslate('placeholder');

  useImperativeHandle(ref, () => ({
    focusSearchField: () => {
      inputRef.current.focus();
    },
    blurSearchField: () => {
      inputRef.current.blur();
    },
  }));

  return (
    <Input
      control
      ref={inputRef}
      type="text"
      valid={true}
      value={value}
      placeholder={placeholderText}
      onChange={pipe(
        getCurrentTarget,
        onChange,
      )}
    />
  );
});

SearchInput.propTypes = {};

function getCurrentTarget(e) {
  return e.currentTarget.value;
}

export default SearchInput;
