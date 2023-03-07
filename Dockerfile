#sudo docker build -t chat-based-routing-bot .
#sudo docker run -i -t chat-based-routing-bot

#aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin 191518685251.dkr.ecr.us-west-1.amazonaws.com
#docker tag chat-based-routing-bot:latest 191518685251.dkr.ecr.us-west-1.amazonaws.com/chat-based-routing-bot:latest
#docker push 191518685251.dkr.ecr.us-west-1.amazonaws.com/chat-based-routing-bot:latest

#This only has to be done 1 time (per project).
#aws ecr create-repository --repository-name chat-based-routing-bot

#kubectl apply -f chat-based-routing-bot-deployment.yaml

#This only has to be done 1 time (per workstation).
#aws eks --region us-west-1 update-kubeconfig --name bdm-cluster
#kubectl cluster-info


FROM node:16.9

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

#overwrite default environment variables
COPY bdm.env .env

CMD [ "npm", "start" ]
