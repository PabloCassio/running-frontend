# Dockerfile para desenvolvimento do frontend do Maratona Ao Vivo

FROM node:20-alpine

WORKDIR /app

# Instala dependências do sistema necessárias
RUN apk add --no-cache \
    git \
    openssh-client \
    python3 \
    make \
    g++

# Copia arquivos de configuração
COPY package*.json ./
COPY .env.example ./

# Instala dependências
RUN npm install

# Copia o código fonte
COPY . .

# Expõe a porta de desenvolvimento
EXPOSE 3000

# Comando para desenvolvimento
CMD ["npm", "run", "dev"]