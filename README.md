# Todos Para o Bem
Projeto Site - Todos para o Bem

Criado em React + Mobx + Firebase

Requisitos:

https://yarnpkg.com/

https://nodejs.org/

https://firebase.google.com/

https://reactjs.org/

https://mobx.js.org/

Passos:

- Crie um projeto no Firebase

- Importe os dados do arquivo "firebaseData.json" para o Database/Realtime do Firebase

- Ative a autenticação por e-mail no Firebase.

- Faça o clone/download do fonte: ex: git clone https://github.com/netoncast/TodosParaoBem.git


- vá para pasta "app" -> ex:  $ cd app

- digite: yarn

- crie o arquivo "app/src/store/dispatchers/firebaseConfig.json" com as credencias do Firebase:

exemplo: 

{

    "apiKey": "xxx",
    "authDomain": "xxx",
    "databaseURL": "xxx",
    "projectId": "xx",
    "storageBucket": "xxx",
    "messagingSenderId": "xxx",
    "appId": "xxx",
    "measurementId": "xxx"
}

- digite: yarn start

Pronto projeto rodando :-)