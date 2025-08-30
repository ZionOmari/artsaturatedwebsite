# Multi-stage Dockerfile for ArtSaturated

# Stage 1: Build the React app
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Backend server
FROM node:18-alpine AS backend
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --production
COPY server/ .

# Stage 3: Production
FROM node:18-alpine AS production
WORKDIR /app

# Copy backend
COPY --from=backend /app/server ./server

# Copy built frontend
COPY --from=frontend-build /app/build ./build

# Install serve for frontend hosting
RUN npm install -g serve

# Create startup script
RUN echo '#!/bin/sh\n\
if [ "$NODE_ENV" = "production" ]; then\n\
  cd server && node index.js &\n\
  serve -s ../build -l 3000\n\
else\n\
  echo "Set NODE_ENV=production to start production server"\n\
  serve -s build -l 3000\n\
fi' > /app/start.sh && chmod +x /app/start.sh

EXPOSE 3000 5000

CMD ["/app/start.sh"]