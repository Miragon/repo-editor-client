import React, {createContext, ReactNode, useContext} from "react";
import RootStore  from "../store/RootStore";

// https://github.com/ivandotv/react-hooks-mobx-root-store/blob/master/src/providers/RootStoreProvider.tsx

let store: RootStore;
const StoreContext = createContext<RootStore|undefined>(undefined);

export function useStore(): RootStore {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error("useRootStore must be used within RootStoreProvider");
    }
    return context;
}

export function RootStoreProvider({ children }: { children: ReactNode }) : JSX.Element {
    // only create root store once (store is a singleton)
    const root = store ?? new RootStore();
    return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
}