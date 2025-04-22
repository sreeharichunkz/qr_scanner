"use client"

import { useState } from "react"
import QrScanner from "../components/qr-scanner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Camera, CameraOff, Copy, CheckCheck } from "lucide-react"

export default function Home() {
  const [scanning, setScanning] = useState(false)
  const [scannedUrl, setScannedUrl] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleScan = (data) => {
    if (data) {
      setScannedUrl(data)
      setScanning(false)
    }
  }

  const handleError = (err) => {
    console.error(err)
  }

  const toggleScanner = () => {
    setScanning(!scanning)
    if (scanning) {
      // Reset scanned URL when stopping scanner
      setScannedUrl(null)
    }
  }

  const copyToClipboard = () => {
    if (scannedUrl) {
      navigator.clipboard.writeText(scannedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const openUrl = () => {
    if (scannedUrl) {
      window.open(scannedUrl, "_blank")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">QR Code Scanner</CardTitle>
          <CardDescription className="text-center">Scan a QR code to get its URL</CardDescription>
        </CardHeader>
        <CardContent>
          {scanning ? (
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <QrScanner onScan={handleScan} onError={handleError} />
            </div>
          ) : (
            <div className="aspect-square flex items-center justify-center rounded-lg border bg-muted">
              {scannedUrl ? (
                <div className="p-4 text-center">
                  <p className="mb-2 font-medium">QR Code Detected!</p>
                  <p className="break-all text-sm text-muted-foreground">{scannedUrl}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">Camera is off</p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={toggleScanner} className="w-full" variant={scanning ? "destructive" : "default"}>
            {scanning ? (
              <>
                <CameraOff className="mr-2 h-4 w-4" /> Stop Scanner
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" /> Start Scanner
              </>
            )}
          </Button>

          {scannedUrl && (
            <div className="flex w-full gap-2 mt-2">
              <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                {copied ? (
                  <>
                    <CheckCheck className="mr-2 h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" /> Copy URL
                  </>
                )}
              </Button>
              <Button onClick={openUrl} className="flex-1">
                <ExternalLink className="mr-2 h-4 w-4" /> Open URL
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </main>
  )
}
