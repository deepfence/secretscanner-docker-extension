package handler

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"secretscanner-extension/server"

	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
)

func SecretScannerScanHandler(ctx echo.Context) error {
	logrus.Infof("starting to scan")
	ssReq := new(server.SecretScannerScanRequest)
	if err := ctx.Bind(ssReq); err != nil {
		return err
	}
	logrus.Infof("L0: scan requested for: %s", ssReq.ImageName)
	postBody, _ := json.Marshal(map[string]string{
		"image_name_with_tag": ssReq.ImageName,
	})
	response, err := http.Post(server.SECRET_SCAN_API_URL, "application/json", bytes.NewBuffer(postBody))
	if err != nil {
		logrus.Errorf("An Error Occured %v", err)
		return ctx.JSON(http.StatusBadRequest, server.HTTPMessageBody{Message: err.Error()})
	}

	defer response.Body.Close()

	//Read the response body
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatalln(err)
	}
	sb := string(body)
	return ctx.JSON(http.StatusOK, server.HTTPMessageBody{Message: sb})
}
