# Family Calendar

You can see a live version in https://family-calendar-dfejgelis.vercel.app/

## Development Setup

1. Clone this repository
1. Install dependencies:

```bash
npm install
```

3. Setup secrets and configuration.

```bash
cp .env .env.local
vim .env.local # Fill values here
```

4. Start development server:

```bash
npm run start
```

## Contributing

### Formatting and Linting:

- We use Prettier for consistent code formatting and ESLint for code linting and enforcing style rules.
- Husky automatically runs these checks before every commit.
- To format and lint your code manually:

```bash
npm run lint
```

**Tip:** Consider using a code editor extension like ESLint and Prettier integrations for real-time feedback and automatic formatting.

### Committing:

To create a commit with Commitizen:

```bash
git cz commit
# or
cz commit
```

## Testing

```bash
npm test
```

Launches the test runner in the interactive watch mode.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
