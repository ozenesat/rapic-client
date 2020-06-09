import { useState, useCallback } from 'react';
function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);
  const toggler = useCallback(() => setValue(value => !value), []);
  return [value, toggler];
}
export default useToggle;
