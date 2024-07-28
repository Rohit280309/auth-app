interface AuthFormTypes {
    type: "login" | "signup" | "resetPassword"
    token?: string
}

interface AuthContextType {
    isLoggedIn: boolean
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

interface User {
    _id: string
    username: string
    email: string
    profileImage: string
    isVerified: boolean
    __v: number
}

interface UserContextType {
    user: User | null
    setUser: (user: User) => void
    removeUser: () => void
}

interface SideBarContextType {
    isSidebarOpen: boolean
    setSidebarState: () => void
}