# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.15.1
FROM pnpm/pnpm:8

LABEL fly_launch_runtime="SvelteKit"

# SvelteKit app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install PNPM
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm build

# Remove development dependencies
RUN pnpm prune --omit=dev


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/build /app/build
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "pnpm", "run", "start" ]
