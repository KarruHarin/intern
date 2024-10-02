// actions.js
"use server"; // Ensures this file is treated as a server-side module

import { signOut as signOutFunction } from "@/auth"; // Import signOut logic from auth.js

export const SignOut = async () => {
    await signOutFunction(); // Perform the sign-out operation
};
