#######################################################################
#
#            FOR DEVELOPMENT ONLY, NOT PRODUCTION USE
#
# Command to test MultiQC docs when in the main MultiQC repo dir:
#   docker run -i -t -p 3000:3000 -v ./:/MultiQC <image>
#
#######################################################################

FROM node:lts-alpine AS runtime
RUN apk add --no-cache git chromium
RUN apt install chromium-browser
WORKDIR /app

# Copy the website files into the current directory
COPY . .

# Clone the MultiQC repo (with docs) alongisde the website repo
RUN git clone --depth 1 https://github.com/MultiQC/MultiQC.git ../MultiQC

# Install dependencies
RUN npm install

# Run the website DEV SERVER
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD npm run dev
