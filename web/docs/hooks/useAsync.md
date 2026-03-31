---
sidebar_position: 19
---

# useAsync

The `useAsync` hook manages an async function's full lifecycle — loading, data, and error states — in a single call. It is safe to use in components that may unmount before the async call resolves.

## Usage

### Installation

```typescript
import { useAsync } from "hookstorm";
```

### Parameters

- **asyncFn** — The async function to execute.
- **immediate** — (optional) Whether to execute on mount. Default: `true`.

### Return Values

- **data** — The resolved value, or `null` if not yet resolved.
- **loading** — `true` while the async function is running.
- **error** — The caught error, or `null` if no error occurred.
- **execute** — A function to manually trigger or re-trigger the async call.

### Example Usage

```typescript
import { ReactElement } from "react";
import { useAsync } from "hookstorm";

type User = { name: string };

export default function UserCard(): ReactElement {
  const { data, loading, error, execute } = useAsync<User>(
    () => fetch("/api/user").then((r) => r.json())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>Hello, {data?.name}</p>
      <button onClick={execute}>Refresh</button>
    </div>
  );
}
```

## Notes

- State updates are silently dropped if the component unmounts before the promise resolves (no memory leak).
- Set `immediate: false` to trigger the call manually via `execute`.
