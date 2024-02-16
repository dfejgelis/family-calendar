module.exports = {
  'src/**/*.{js,jsx,ts,tsx,json}': [
    'eslint  --fix',
    'prettier --write ',
    'react-scripts test --bail --watchAll=false --passWithNoTests --findRelatedTests',
  ],
  'src/**/*.{css,scss,md}': ['prettier --write'],
}
