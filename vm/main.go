package main

import (
	"flag"
	"log"
	"os"
	"secretscanner-extension/server"
	"secretscanner-extension/server/handler"

	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
)

func main() {
	var socketPath string
	flag.StringVar(&socketPath, "socket", "/run/guest/plugin-secretscanner.sock", "Unix domain socket to listen on")
	flag.Parse()

	os.RemoveAll(socketPath)

	logrus.New().Infof("Starting listening on %s\n", socketPath)
	router := echo.New()
	router.HideBanner = true

	startURL := ""

	ln, err := server.Listen(socketPath)
	if err != nil {
		log.Fatal(err)
	}
	router.Listener = ln

	router.GET("/ping", server.PingHandler)
	router.POST("/secret-scan/scan", handler.SecretScannerScanHandler)

	log.Fatal(router.Start(startURL))
}
