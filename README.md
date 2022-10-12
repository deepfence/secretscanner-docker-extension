# SecretScanner Docker Extension

## How to install in Docker Desktop ?
*Note: Method to install this extension will change once SecretScanner extension is approved and published by Docker team*

## Building locally

1. Build the extension image
```
docker build . -t deepfenceio/secretscanner-docker-extension
```

2. Install the extension image, make sure Docker Desktop is installed and running
```
docker extension install deepfenceio/secretscanner-docker-extension
```

## UI Development

1. Start local web server
```
cd ui
npm start
```

2. Use local webserver
```
docker extension dev ui-source deepfenceio/secretscanner-docker-extension http://localhost:3000
```

3. Open or Reset Chrome Dev Tools

Open
```
docker extension dev debug deepfenceio/secretscanner-docker-extension
```
Reset
```
docker extension dev reset deepfenceio/secretscanner-docker-extension
```

*Note: The React UI will not work in your browser, only in Docker Desktop.
So please ignore the console warnings and do not install or update any packages.*

Enable Docker Extensions
## Insider Preview

<img width="1500" alt="image" src="https://user-images.githubusercontent.com/18168330/192237859-4019d6e9-6a8c-49a1-aaed-8302acba9374.png">

<img width="1510" alt="image" src="https://user-images.githubusercontent.com/18168330/192349833-bf3ac118-03f0-4f7a-80ee-9e1220e7419a.png">
