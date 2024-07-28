import React, { createContext, ReactNode, useContext, useState } from "react";

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode}> = ({ children }) => {

    const [user, setUserState] = useState<User | null>(null);

    const setUser = (user: User) => {
        setUserState(user);
    }

    const removeUser = () => {
        setUserState(null);
    }

    return (
        <UserContext.Provider value={{ user, setUser, removeUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within an UserContextProvider');
    }
    return context;
}