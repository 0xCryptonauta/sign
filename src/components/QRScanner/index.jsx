import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const QRScanner = ({ isScannerOpen, setIsScannerOpen, setScannedData }) => {
  const videoRef = useRef(null);
  //const [qrCode, setQrCode] = useState(null);
  //const [isScannerOpen, setIsScannerOpen] = useState(false);
  const streamRef = useRef(null); // Track the camera stream

  useEffect(() => {
    if (!("BarcodeDetector" in window)) {
      console.error("BarcodeDetector is not supported on this browser.");
      return;
    }

    const barcodeDetector = new window.BarcodeDetector({
      formats: ["qr_code"],
    });

    const handleVideo = () => {
      const video = videoRef.current;
      if (video) {
        const scan = () => {
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            barcodeDetector
              .detect(video)
              .then((codes) => {
                if (codes.length > 0) {
                  //setQrCode(codes[0].rawValue);
                  setScannedData(codes[0].rawValue);
                  setIsScannerOpen(false);
                } else {
                  requestAnimationFrame(scan);
                }
              })
              .catch((err) => console.error("Error detecting QR code:", err));
          } else {
            requestAnimationFrame(scan);
          }
        };
        scan();
      }
    };

    if (isScannerOpen) {
      // Open the camera when the scanner is toggled on
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((cameraStream) => {
          streamRef.current = cameraStream; // Store the stream in the ref
          const video = videoRef.current;
          if (video) {
            video.srcObject = streamRef.current;
            video.play();
            video.addEventListener("loadeddata", handleVideo);
          }
        })
        .catch((err) => console.error("Error accessing camera: ", err));
    } else if (streamRef.current) {
      // Stop the camera when the scanner is toggled off
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop()); // Stop each track
      streamRef.current = null; // Clear the reference to the stream
    }

    return () => {
      // Clean up when the component unmounts
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
        streamRef.current = null; // Clear the stream reference
      }
    };
  }, [isScannerOpen, setScannedData]); // Re-run effect when scanner toggles

  return (
    <div>
      {isScannerOpen && (
        <div style={{ width: "250px", height: "250px" }}>
          <video ref={videoRef} style={{ width: "100%" }}></video>
        </div>
      )}

      <div
        style={{
          cursor: "pointer",
          //border: "1px solid white",
          backgroundColor: "#939b62",
          borderRadius: "7px",
        }}
        onClick={() => setIsScannerOpen(!isScannerOpen)}
      >
        {isScannerOpen ? "Close Scanner" : "Open Scanner"}
      </div>
      {/* {qrCode && <p>QR Code detected: {qrCode}</p>} */}
    </div>
  );
};

export default QRScanner;

QRScanner.propTypes = {
  isScannerOpen: PropTypes.bool.isRequired, // Declare the prop type
  setIsScannerOpen: PropTypes.func.isRequired,
  setScannedData: PropTypes.func.isRequired,
};
