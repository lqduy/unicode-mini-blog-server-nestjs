# Use the official Node.js Alpine base image
FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Install PM2 and pnpm globally
RUN npm install --global pm2 pnpm

# Copy "package.json" and "pnpm-lock.yaml"
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies)
RUN pnpm install

# Copy all application files
COPY . .

# Build the application
RUN pnpm run build

# Prune devDependencies without running lifecycle scripts
RUN pnpm prune --prod --no-optional --ignore-scripts

# Expose the application port
EXPOSE 3001

# Use the non-root user provided by the Node.js image
USER node

# Run the application using PM2
CMD ["pm2-runtime", "start", "dist/main.js"]
