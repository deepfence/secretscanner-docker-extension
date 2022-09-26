package server

type HTTPMessageBody struct {
	Message string
}

type SecretScannerScanRequest struct {
	ImageName string `json:"image_name"`
}
