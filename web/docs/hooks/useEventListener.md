---
sidebar_position: 25
---

# useEventListener

The `useEventListener` hook attaches an event listener to `window` or a specific element. The handler is always kept fresh — updating it does not re-register the listener or restart any effects.

## Usage

### Installation

```typescript
import { useEventListener } from "hookstorm";
```

### Parameters

- **eventName** — The event to listen for (e.g. `"click"`, `"keydown"`, `"resize"`).
- **handler** — The callback function invoked when the event fires. Receives the native `Event` object.
- **element** _(optional)_ — A ref to the target element. Defaults to `window`.

### Example Usage

```typescript
import { useRef, ReactElement } from "react";
import { useEventListener } from "hookstorm";

export default function Modal({ onClose }: { onClose: () => void }): ReactElement {
  useEventListener("keydown", (e) => {
    if ((e as KeyboardEvent).key === "Escape") onClose();
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  useEventListener("click", () => console.log("Button clicked"), buttonRef);

  return (
    <div>
      <p>Press Escape to close</p>
      <button ref={buttonRef}>Click me</button>
    </div>
  );
}
```

## Notes

- Uses a ref internally to keep the handler current — changing `handler` on re-render does not remove and re-add the listener.
- To target a DOM element, pass a `RefObject<HTMLElement>` as the third argument.
- The listener is automatically removed on unmount.
