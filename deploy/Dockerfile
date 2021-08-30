FROM debian:10.8

RUN mkdir -p /batch/

WORKDIR /batch/

RUN apt-get clean \
    && apt-get update \
    && apt-get -y install \
    curl \
    dos2unix \
    && curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

ENV NPM_VERSION=7.7.6

RUN npm i -g \
    npm@${NPM_VERSION} \
    # ignore npm install warn
    exit 0;

COPY dist jobs
COPY node_modules jobs/node_modules
COPY deploy/entrypoint.sh ./

RUN chmod +x entrypoint.sh \
    # linebreak code CRLF -> LF
    && dos2unix ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]

CMD ["run", "sample-job"]