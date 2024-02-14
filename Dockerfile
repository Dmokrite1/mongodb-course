FROM mongo:7

WORKDIR /workspace
COPY dataset /dataset

RUN apt update && apt install -y wget curl 
ENV TERM=xterm-256color
RUN echo "PS1='\e[92m\u\e[0m@\e[94m\h\e[0m:\e[35m\w\e[0m# '" >> /data/db/.bashrc

EXPOSE 27017