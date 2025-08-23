# FROM node:18-alpine
FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install ALL dependencies
RUN npm install

# Copy source code
COPY src/ ./src/

# Build TypeScript code
RUN npm run build

# Copy both swagger files to dist directory
RUN mkdir -p dist/swagger && \
    cp src/swagger/swagger.yaml dist/swagger/ && \
    cp src/swagger/swagger.json dist/swagger/

# Verify the files were copied
RUN echo "=== Verifying swagger files in dist ===" && \
    ls -la dist/swagger/

EXPOSE 3000

CMD ["npm", "start"]

# FROM node:18-alpine as build
# # FROM node:18 as build
# WORKDIR /usr/local/app
# COPY ./ /usr/local/app

# RUN npm install

# EXPOSE 3000

# CMD ["node", "dist/app.js"]