import http from 'http';

import { app, server } from './app';

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 8000;

// start server
httpServer.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});
