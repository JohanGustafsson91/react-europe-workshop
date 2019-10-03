import { useState, useEffect, useRef } from 'react';

export const useEventListener = (element, eventName, callback) => {
  const subscription = useRef(); // Useref memorizes fn so it doesnt get removed every time
  const callbackRef = useRef();
  callbackRef.current = callback;

  useEffect(
    () => {
      const handleEvent = e => callbackRef.current(e);
      subscription.current = element.addEventListener(eventName, handleEvent);
      return () => element.removeEventListener(eventName, handleEvent);
    },
    [element, eventName],
  );
};

export const useActiveKeys = () => {
  const [activeKeys, setActiveKeys] = useState([]);

  useEventListener(window, 'keydown', ({ keyCode }) =>
    setActiveKeys(
      prevState =>
        !prevState.includes(keyCode) ? [...prevState, keyCode] : prevState,
    ),
  );

  useEventListener(window, 'keyup', ({ keyCode }) =>
    setActiveKeys(prevState => prevState.filter(key => key !== keyCode)),
  );

  return activeKeys;
};

export const useShortcutEffect = (shortcutString, callback) => {
  const callbackRef = useRef();
  callbackRef.current = callback;

  const activeKeys = useActiveKeys();

  useEffect(
    () => {
      const triggerKeys = getShortcutKeys(shortcutString);
      arraysAreEqual(triggerKeys, activeKeys) && callbackRef.current();
    },
    [activeKeys, shortcutString],
  );
};

// TODO make dynamic
const KEYCODES_MAP = {
  alt: 18,
  s: 83,
  escape: 27,
};

export function getShortcutKeys(keysInString) {
  return keysInString
    .split('+')
    .reduce(
      (acc, curr) => (KEYCODES_MAP[curr] ? [...acc, KEYCODES_MAP[curr]] : acc),
      [],
    );
}

function arraysAreEqual(arr1, arr2) {
  return !arr1
    .reduce((acc, curr, i) => [...acc, arr2[i] === curr], [])
    .some(i => i === false);
}
