#######################################################################
#
#            FOR DEVELOPMENT ONLY, NOT PRODUCTION USE
#
# Command to test MultiQC docs when in the main MultiQC repo dir:
#   docker run -i -t -p 3000:3000 -v ./:/MultiQC <image>
#
#######################################################################

FROM node:lts-alpine AS runtime
RUN apk add --no-cache git
WORKDIR /app

# Copy the website files into the current directory
COPY . .

# Clone the MultiQC repo (with docs) alongisde the website repo
RUN git clone --depth 1 https://github.com/ewels/MultiQC.git ../MultiQC

# Install dependencies
RUN npm install
