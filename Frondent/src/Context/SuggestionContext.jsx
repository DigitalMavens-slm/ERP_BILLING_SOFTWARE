
import React, { createContext, useState, useContext } from "react";

 const SuggestContext = createContext(null);

export const SuggestionProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState({}); 

  const updateSuggestions = (field, values) => {
    setSuggestions((prev) => ({ ...prev, [field]: values }));
  };

  return (
    <SuggestContext.Provider value={{ suggestions, updateSuggestions }}>
      {children}
    </SuggestContext.Provider>
  );
};

// Hook to use suggestions easily
export const useSuggestions = () => useContext(SuggestContext);
