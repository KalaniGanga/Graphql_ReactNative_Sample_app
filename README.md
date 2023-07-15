# Graphql_ReactNative_Sample_app
A basic React Native app to demonstrate React Query with GraphQL Code generator features.

Requirements

1. Expo CLI (SDK 42)
2. Docker
3. Docker Compose
4. Hasura CLI
5. Firebase,
6. Postgresql

Get started

1. Clone the project repo in your local environment.
2. Rename the zeed_assignment/env.example file to .env .
3. Create a Firebase account and add Firebase credentials and a Google API key to the.env file.
4. Install dependencies with npm. npm install & zeed_assignment/npm install
5. change docker-compose environment to your local postgresql database envirement credentials.
6. To connect Postgresql database with Hasura Run 
    docker compose up -d
7. To open the hasura console
    cd hasura/hasura console
8. To start react native app
    cd zeed_assignment/npm run start
9. To run on Android
    cd zeed_assignment/npm run android
10. To run on Android
    cd zeed_assignment/npm run ios


