import React, { useContext, useState, useEffect } from "react"
import { auth } from "./firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}
