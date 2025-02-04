---
sidebar_position: 3
---

# useDebounce

The `useDebounce` hook delays the execution of a value update.

## Usage

### Installation

```typescript
import { useDebounce } from "hookstorm";
```

### Example Usage

```typescript
const debouncedSearch = useDebounce(searchQuery, 500);
```

### Explanation

- This hook is useful for optimizing API calls by reducing frequent updates.
