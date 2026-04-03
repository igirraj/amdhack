# Stage 1: Build the React Application
FROM node:18-alpine as build

WORKDIR /app

# Copy package configurations
COPY client/package.json client/package-lock.json* ./

# Install dependencies
RUN npm install

# Copy application code
COPY client/ ./

# Build the project
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy custom nginx.conf if needed, or just use default.
# We will copy the built files to nginx's default html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080 because Google Cloud Run expects the container to listen on 8080
EXPOSE 8080

# Configure Nginx to listen on port 8080
RUN sed -i 's/listen  *80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
