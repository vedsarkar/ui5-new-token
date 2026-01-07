
**@reltio/design** is a public JavaScript library that contains key components and utilities for developing Reltio UI applications.

- Built on ReactJS.
- Intended for Reltio internal teams developing applications.
- [Storybook with component examples is available here](https://reltio.design).

## Installation

To install, use NPM:  
```bash
npm install @reltio/design
```
## Usage

Example usage of the **Button** component:

```jsx
import React from 'react';
import { Button } from '@reltio/design';

function App() {
  return <Button>Touch me</Button>;
}

export default App;
```

**Important:** React is listed as peer dependencies. Make sure it's added to your project.

## Target Audience

The library is designed for Reltio internal teams developing applications.

If you need additional components from the [Storybook](https://reltio.design), contact the **UI Center of Excellence** team at [ui.coe@reltio.com](mailto:ui.coe@reltio.com).

## Contribution

Adding or modifying components is done via the monorepo: [https://bitbucket.org/reltio-ondemand/reltio-design](https://bitbucket.org/reltio-ondemand/reltio-design).

### Development Process:

1. Ensure you have write access to the monorepo.
2. Create a feature branch for your changes.
3. Run Storybook locally with `npm run dev`
3. Follow the standard pull request (PR) creation and code review processes adopted across Reltio teams.
4. After your PR is successfully merged into the main branch, run a **custom Bitbucket pipeline** to publish the component to NPM.

### Publishing:

- If the component is published from the main branch, it will be released to NPM.
- If it is published from a feature branch, the component will be versioned as `0.0.0-{BUILD_ID}` and tagged with `{BRANCH_NAME}`.

For any questions about the process, contact the **UI Center of Excellence** team via [ui.coe@reltio.com](mailto:ui.coe@reltio.com).

## License

This library is distributed under Reltio’s corporate license and is intended for internal use only.
