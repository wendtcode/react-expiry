# react-expiry

Hide React components based on expiry date/time.

## Installation

```bash
pnpm add react-expiry
```

## Usage

```tsx
// _app.tsx
import { ExpiryProvider } from "react-expiry";
import { Hello } from "./hello";

const App = () => {
  return (
    <ExpiryProvider>
      <Hello />
    </ExpiryProvider>
  );
};

// hello.tsx
import { useExpiry } from "react-expiry";

const Hello = () => {
  const showWelcomeMsg = useExpiry({
    id: "welcome-msg",
    ttl: 24 * 60 * 60, // 1 day in seconds
  });

  const showLaunchDate = useExpiry({
    id: "launch-date",
    expires: new Date("2024-10-03"),
  });

  const showNewFeature = useExpiry({
    id: "new-feature",
    expires: new Date("2025-01-01"),
    ttl: 5 * 24 * 60 * 60, // 5 days in seconds
  });

  return (
    <div>
      <h1>Hello World</h1>
      {showWelcomeMsg && (
        <p>After initial render, I will disappear after 1 day.</p>
      )}
      {showLaunchDate && (
        <p>I will always disappear by 3rd of October, 2024.</p>
      )}
      {showNewFeature && (
        <p>
          After initial render, I will disappear after 5 days or by 1st of
          January, 2025, whichever comes first.
        </p>
      )}
    </div>
  );
};
```

## API

### `ExpiryProvider`

#### `defaultTTL` (default: `0`)

This is the default time-to-live (in seconds) for components. If a hook
has a `ttl` option set, it will override this value.

#### `keyPrefix` (default: `"expiry:"`)

This is the prefix for the keys in the storage. It is used to avoid conflicts
between different components.

#### `browserOnly` (default: `true`)

Controls the rendering behavior when rendering on the server. If `true`, the
component will only be rendered on the browser, otherwise it will be rendered
on both the browser and the server.

#### `storage` (default: `localStorage`)

This is the storage used to persist the expiry. It defaults to `localStorage`.

### `useExpiry`

#### `id` (required)

This is the identifier for the expiry and is used in the persistence key. It should be unique within your application.

#### `ttl` (optional)

This is the time-to-live (in seconds) for the expiry. When the `ttl` is reached, the expiry will return `false` and the component will be hidden.

> NOTE: The use of `ttl` is per user session. If the user clears their storage, the expiry will be reset and the `ttl` will start again.

#### `expires` (optional)

This is the expiration date for the expiry. When the `expires` date is reached, the expiry will return `false` and the component will be hidden.

> NOTE: The use of `expires` is global. It will hide the component for all users.

## License

MIT

## ESLint

You can install the companion ESLint plugin to add `react-expiry` rules to your linting.

```bash
pnpm add eslint-plugin-react-expiry
```

Then add these rules to your ESLint config.

```json
{
  "plugins": ["react-expiry"],
  "rules": {
    "react-expiry/expires-in-past": "warn",
    "react-expiry/duplicate-id": "warn"
  }
}
```
