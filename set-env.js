// set-env.js (COMMITTED TO GITHUB)
const fs = require('fs');

// We grab the secret variable from your hosting provider's environment
const giphyApiKey = process.env.GIPHY_API_KEY;

// If there is no key, we don't overwrite anything (useful for local builds)
if (!giphyApiKey) {
  console.log('No API key found in environment, skipping environment generation.');
  process.exit(0);
}

const targetPath = './src/environments/environment.ts';
const envConfigFile = `
export const environment = {
  production: true,
  appName: 'Gifs',
  appName2: 'App',
  appSlogan: 'Maneja tus gifs',
  giphyApiKey: '${giphyApiKey}',
  giphyUrl: 'https://api.giphy.com/v1'
};
`;

// Overwrite the dummy file with the real data
fs.writeFileSync(targetPath, envConfigFile);
console.log(`Output generated at ${targetPath}`);