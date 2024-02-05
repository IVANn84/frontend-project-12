import { createContext, useCallback } from 'react';
import filter from 'leo-profanity';

export const FilterContext = createContext({});

const FilterProvider = ({ children }) => {
  filter.add(filter.getDictionary('ru'));

  const filterWord = useCallback((word) => filter.clean(word), []);

  return (
    <FilterContext.Provider value={filterWord}>
      {children}
    </FilterContext.Provider>
  );
};
export default FilterProvider;
