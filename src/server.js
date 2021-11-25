const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const { enableStaticRendering } = require('mobx-react');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// This is not a react hook. See https://mobx-react.js.org/recipes-ssr
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(true);

app.prepare().then(() => {
  const server = express();
  server.use(compression());

  server.use(cookieParser());

  // We use a client-side cookie session instead of a server session so that there are no
  // issues when load balancing without sticky sessions.
  // https://www.npmjs.com/package/cookie-session
  server.use(
    cookieSession({
      // https://www.npmjs.com/package/cookie-session#options
      keys: ['CHANGE_ME'],
      maxAge: 86400000,
      name: 'tm-client-session',
    }),
  );

  server.all('*', (req, res) => handle(req, res));

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:3000`);
  });
});
