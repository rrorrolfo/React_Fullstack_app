import React from "react";

const authenticationContext = React.createContext();

export const Provider = authenticationContext.Provider;
export const Consumer = authenticationContext.Consumer;