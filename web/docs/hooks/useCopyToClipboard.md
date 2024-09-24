---
sidebar_position: 3
---

# useCopyToClipboard

The `useCopyToClipboard` hook provides functionality to copy text to the clipboard and manage the state of the copy action.

## Usage

### Installation

You can import the `useCopyToClipboard` hook from the `hookstorm` package like this:

```typescript
import { useCopyToClipboard } from "hookstorm";
```

### Return Values

The `useCopyToClipboard` hook returns the following object:

- **copied**: A boolean indicating if the text was successfully copied to clipboard.
- **copyToClipboard**: A function to copy the provided text to the clipboard.

### Example Usage

The following example demonstrates how to use the `useCopyToClipboard` hook within a functional component:

```typescript
import { ReactElement } from "react";
import { useCopyToClipboard } from "hookstorm";

export default function CopyComponent(): ReactElement {
  const { copied, copyToClipboard } = useCopyToClipboard();

  return (
    <div>
      <button onClick={() => copyToClipboard("Text to copy")}>Copy Text</button>
      {copied && <p>Text copied to clipboard!</p>}
    </div>
  );
}
```

### Explanation

In the example above:

- The `useCopyToClipboard` hook provides the `copied` state and the `copyToClipboard` function.
- Clicking the button triggers the `copyToClipboard` function with the text `'Text to copy'`.
- If the text is successfully copied, the `copied` state is set to `true`, and a message indicating success is displayed.
- After 2 seconds, the `copied` state is reset to `false`.

## Conclusion

`useCopyToClipboard` offers a straightforward solution for copying text to the clipboard and managing user feedback in React applications.
