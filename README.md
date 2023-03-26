# Virtual Transaction App

This is a Virtual Transaction App for allowing students to request documents to the school and provide requirements in return. School admins can validate those requests.

Checkout the app here: 

## Installation

Clone the repository: https://www.uccvta.app

```bash
git clone https://github.com/katherinegragg/virtualtransactionapp.git
```

Install dependencies:

```bash
npm install
```

Run the app:

```bash
meteor run
```

## Testing

Run tests with Mocha:

```bash
meteor test --once --driver-package meteortesting:mocha

TEST_WATCH=1 meteor test --full-app --driver-package meteortesting:mocha

```

Visualize bundle size with Bundle Visualizer:

```bash

meteor --production --extra-packages bundle-visualizer

```

## Dependencies

- @babel/runtime
- autoprefixer
- meteor-node-stubs
- postcss
- postcss-load-config
- react
- react-dom
