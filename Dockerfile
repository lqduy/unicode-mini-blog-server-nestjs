# Use the official Node.js Alpine base image
FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Install PM2 and pnpm globally
RUN npm install --global pm2 pnpm

# Copy "package.json", "pnpm-lock.yaml", and other necessary files to leverage Docker caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --prod

# Copy all application files
COPY . .

# Build the application
RUN pnpm run build

# Expose the application port
EXPOSE 8080

# Use the non-root user provided by the Node.js image
USER node

# Run the application using PM2
CMD ["pm2-runtime", "start", "dist/main.js"]
