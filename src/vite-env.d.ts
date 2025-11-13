// FIX: The reference to "vite/client" was removed. It was causing a "Cannot find type definition file"
// error, likely due to a project setup issue. The application does not use Vite-specific
// client types (like import.meta.env), so removing it is safe.

// FIX: The type reference for vite-plugin-pwa was changed from "client" to "react"
// which is the correct one for React projects.
/// <reference types="vite-plugin-pwa/react" />
