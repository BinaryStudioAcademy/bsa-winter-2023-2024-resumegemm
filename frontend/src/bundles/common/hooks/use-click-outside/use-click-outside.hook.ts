import { type RefObject, useEffect } from 'react';

const useClickOutside = <T extends HTMLElement>(
  reference: RefObject<T>,
  callback: () => void,
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (reference.current && !reference.current.contains(event.target as Node) ) {
        callback();
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
  }, [reference, callback]);
};

export { useClickOutside };
