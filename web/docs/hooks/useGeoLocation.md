---
sidebar_position: 3
---

# useGeoLocation

The `useGeoLocation` hook retrieves the user's current geographic coordinates using the browser's Geolocation API.

## Usage

### Installation

You can import the `useGeoLocation` hook from the `hookstorm` package like this:

```typescript
import { useGeoLocation } from "hookstorm";
```

### Return Values

The `useGeoLocation` hook returns the following object:

- **latitude**: The user's latitude as a number, or `null` if not yet available.
- **longitude**: The user's longitude as a number, or `null` if not yet available.
- **error**: An error message string if location access is denied or unavailable, otherwise `null`.

### Example Usage

The following example demonstrates how to use the `useGeoLocation` hook within a functional component:

```typescript
import { ReactElement } from "react";
import { useGeoLocation } from "hookstorm";

export default function GeoLocationComponent(): ReactElement {
  const { latitude, longitude, error } = useGeoLocation();

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <p>Latitude: {latitude ?? "Loading..."}</p>
      <p>Longitude: {longitude ?? "Loading..."}</p>
    </div>
  );
}
```

### Explanation

In the example above:

- The `useGeoLocation` hook uses `navigator.geolocation.getCurrentPosition` to fetch the user's location.
- The `latitude` and `longitude` values are `null` until the browser resolves the position.
- If the user denies location access or the browser does not support geolocation, the `error` field will contain a descriptive message.

## Conclusion

`useGeoLocation` provides a simple interface for accessing the browser's Geolocation API, handling both successful position retrieval and error states out of the box.
