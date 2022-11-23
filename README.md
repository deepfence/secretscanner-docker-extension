# SecretScanner Docker Extension

![CodeQL](https://github.com/deepfence/secretscanner-docker-extension/workflows/CodeQL/badge.svg)

## How to install in Docker Desktop ?
*Note: Method to install this extension will change once SecretScanner extension is approved and published by Docker team*

## Building locally

1. Build the extension image
```
docker build . -t deepfenceio/secretscanner-docker-extension
```

2. Install the extension image, make sure Docker Desktop is installed and running
```
docker extension install docker.io/deepfenceio/secretscanner-extension:latest
Extensions can install binaries, invoke commands and access files on your machine. 
Are you sure you want to continue? [y/N] y
Installing new extension "docker.io/deepfenceio/secretscanner-extension:latest"
Installing service in Desktop VM...
Setting additional compose attributes
VM service started
Installing Desktop extension UI for tab "SecretScanner"...
Extension UI tab "SecretScanner" added.
Extension "SecretScanner" installed successfully
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
