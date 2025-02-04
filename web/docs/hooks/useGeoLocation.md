---
sidebar_position: 3
---

# useGeoLocation

The `useGeoLocation` hook retrieves the user's current coordinates.

## Example Usage

```typescript
const { latitude, longitude } = useGeoLocation();
```

### Explanation

- Uses `navigator.geolocation.getCurrentPosition` to fetch location data.
