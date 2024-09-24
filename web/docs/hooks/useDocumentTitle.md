---
sidebar_position: 3
---

# useDocumentTitle

The `useDocumentTitle` hook is a custom React hook used to manage and update the document title. It provides an easy way to set and keep track of the title of the web page.

## Usage

### Installation

You can import the `useDocumentTitle` hook from the `hookstorm` package like this:

```typescript
import { useDocumentTitle } from "hookstorm";
```

### Return Values

The `useDocumentTitle` hook returns the following object:

- **title**: The current document title.
- **setDocumentTitle**: A function to update the document title.

### Example Usage

The following example demonstrates how to use the `useDocumentTitle` hook within a functional component:

```typescript
import { ReactElement, useEffect } from "react";
import { useDocumentTitle } from "hookstorm";

export default function DocumentTitleComponent(): ReactElement {
  const { title, setDocumentTitle } = useDocumentTitle();

  useEffect(() => {
    setDocumentTitle("New Page Title");
  }, [setDocumentTitle]);

  return (
    <div>
      <p>Current Title: {title}</p>
      <p>The document title will be updated to 'New Page Title'.</p>
    </div>
  );
}
```

### Explanation

In the example above:

- The `useDocumentTitle` hook is used to manage the document title.
- The `title` variable holds the current document title.
- The `setDocumentTitle` function is used to update the document title.
- An effect is used to set the document title to `'New Page Title'` when the component mounts.

## Conclusion

`useDocumentTitle` simplifies the management of the document title in your React applications, making it easy to keep the page title in sync with your component state or props.
