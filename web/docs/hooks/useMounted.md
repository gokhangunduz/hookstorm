---
sidebar_position: 22
---

# useMounted

The `useMounted` hook returns a ref whose `.current` is `true` while the component is mounted and `false` after unmount. Use it to guard async callbacks against post-unmount state updates.

## Usage

### Installation

```typescript
import { useMounted } from "hookstorm";
```

### Return Values

- A `React.RefObject<boolean>` — `.current` is `true` while mounted, `false` after unmount.

### Example Usage

```typescript
import { useState, useEffect, ReactElement } from "react";
import { useMounted } from "hookstorm";

export default function DataLoader(): ReactElement {
  const [data, setData] = useState<string | null>(null);
  const isMounted = useMounted();

  useEffect(() => {
    fetchSomething().then((result) => {
      if (isMounted.current) {
        setData(result);
      }
    });
  }, []);

  return <p>{data ?? "Loading..."}</p>;
}
```

## Notes

- Prefer `useAsync` when you need full loading/error lifecycle management — it uses the same mount guard internally.
- `useMounted` is useful for low-level cases where you manage the async call yourself.
