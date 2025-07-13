FROM alpine:latest AS builder
WORKDIR /app

RUN apk add nodejs npm

# Preserve same structure as in repository
COPY ./backend/package.json /app/backend/package.json
COPY ./backend/src /app/backend/src
COPY ./backend/tsconfig.json /app/backend/tsconfig.json
COPY ./backend/public /app/backend/public
COPY ./frontend/package.json /app/frontend/package.json
COPY ./frontend/src /app/frontend/src
COPY ./frontend/tsconfig.json /app/frontend/tsconfig.json
COPY ./frontend/tsconfig.app.json /app/frontend/tsconfig.app.json
COPY ./frontend/tsconfig.node.json /app/frontend/tsconfig.node.json

# Remove backend node_modules after build, and reinstall for production build
RUN cd /app/backend && npm install && npm run build \
  && rm -rf node_modules && npm install --omit=dev
RUN cd /app/frontend && npm install
COPY ./frontend/tsconfig.json /app/frontend/tsconfig.json
COPY ./frontend/vite.config.ts /app/frontend/vite.config.ts
COPY ./frontend/index.html /app/frontend/index.html
COPY ./frontend/public /app/frontend/public
RUN cd /app/frontend && npm run build

FROM alpine:latest AS runner
WORKDIR /app

# only node, without npm
RUN apk add --no-cache nodejs

# Copy only the built files and backend node_modules
COPY --from=builder /app/backend/dist /app/backend/dist
COPY --from=builder /app/backend/public /app/backend/public
COPY --from=builder /app/backend/node_modules /app/backend/node_modules
COPY --from=builder /app/frontend/dist /app/frontend/dist

RUN ls -al /app/backend
RUN ls -al /app/frontend

EXPOSE 3000
# Run the backend server with node
CMD ["node", "/app/backend/dist/index.js"]
