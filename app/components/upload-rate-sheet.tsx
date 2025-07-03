"use client"

import { CardDescription } from "@/components/ui/card"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileImage, Loader2, BarChart3 } from "lucide-react"
import { RateSheetResults } from "./rate-sheet-results"

interface UploadRateSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]

export function UploadRateSheet({ open, onOpenChange }: UploadRateSheetProps) {
  const [step, setStep] = useState<"form" | "upload" | "results">("form")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    ficoScore: "",
    loanType: "",
    propertyType: "",
    loanPurpose: "",
    state: "",
    occupancy: "",
    propertyValue: "",
    loanValue: "",
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("upload")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleProcessImage = async () => {
    if (!uploadedFile) return

    setIsProcessing(true)
    // Simulate OCR processing
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    setStep("results")
  }

  const handleClose = () => {
    setStep("form")
    setFormData({
      ficoScore: "",
      loanType: "",
      propertyType: "",
      loanPurpose: "",
      state: "",
      occupancy: "",
      propertyValue: "",
      loanValue: "",
    })
    setUploadedFile(null)
    setIsProcessing(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Rate Sheet</DialogTitle>
          <DialogDescription>Enter lead information and upload a rate sheet image for analysis</DialogDescription>
        </DialogHeader>

        {step === "form" && (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ficoScore">FICO Score</Label>
                <Input
                  id="ficoScore"
                  type="number"
                  min="300"
                  max="850"
                  value={formData.ficoScore}
                  onChange={(e) => setFormData({ ...formData, ficoScore: e.target.value })}
                  placeholder="e.g., 750"
                  required
                />
              </div>

              <div>
                <Label htmlFor="loanType">Loan Type</Label>
                <Select
                  value={formData.loanType}
                  onValueChange={(value) => setFormData({ ...formData, loanType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Conventional">Conventional</SelectItem>
                    <SelectItem value="FHA">FHA</SelectItem>
                    <SelectItem value="VA/IRRL">VA/IRRL</SelectItem>
                    <SelectItem value="USDA">USDA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SFR">SFR (Single Family Residence)</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="MultiUnit">Multi-Unit</SelectItem>
                    <SelectItem value="PUD">PUD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="loanPurpose">Loan Purpose</Label>
                <Select
                  value={formData.loanPurpose}
                  onValueChange={(value) => setFormData({ ...formData, loanPurpose: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Purchase">Purchase</SelectItem>
                    <SelectItem value="No Cash-out Refi">No Cash-out Refi</SelectItem>
                    <SelectItem value="Cash-out Refi">Cash-out Refi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="occupancy">Occupancy</Label>
                <Select
                  value={formData.occupancy}
                  onValueChange={(value) => setFormData({ ...formData, occupancy: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select occupancy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Primary">Primary</SelectItem>
                    <SelectItem value="Secondary">Secondary</SelectItem>
                    <SelectItem value="Investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="propertyValue">Property Value</Label>
                <Input
                  id="propertyValue"
                  type="number"
                  value={formData.propertyValue}
                  onChange={(e) => setFormData({ ...formData, propertyValue: e.target.value })}
                  placeholder="e.g., 450000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="loanValue">Loan Value</Label>
                <Input
                  id="loanValue"
                  type="number"
                  value={formData.loanValue}
                  onChange={(e) => setFormData({ ...formData, loanValue: e.target.value })}
                  placeholder="e.g., 360000"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Next: Upload Image</Button>
            </div>
          </form>
        )}

        {step === "upload" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Information Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">FICO Score:</span> {formData.ficoScore}
                  </div>
                  <div>
                    <span className="font-medium">Loan Type:</span> {formData.loanType}
                  </div>
                  <div>
                    <span className="font-medium">Property:</span> {formData.propertyType}
                  </div>
                  <div>
                    <span className="font-medium">Purpose:</span> {formData.loanPurpose}
                  </div>
                  <div>
                    <span className="font-medium">State:</span> {formData.state}
                  </div>
                  <div>
                    <span className="font-medium">Occupancy:</span> {formData.occupancy}
                  </div>
                  <div>
                    <span className="font-medium">Property Value:</span> $
                    {Number.parseInt(formData.propertyValue).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Loan Value:</span> $
                    {Number.parseInt(formData.loanValue).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload Rate Sheet Image</CardTitle>
                <CardDescription>Upload a clear image of your rate sheet for OCR processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {uploadedFile ? (
                    <div className="space-y-4">
                      <FileImage className="w-12 h-12 mx-auto text-green-600" />
                      <div>
                        <p className="font-medium text-green-600">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <Button
                        onClick={handleProcessImage}
                        disabled={isProcessing}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Process Image
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 mx-auto text-gray-400" />
                      <div>
                        <p className="text-lg font-medium">Upload Rate Sheet</p>
                        <p className="text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                      <Input type="file" accept="image/*" onChange={handleFileUpload} className="max-w-xs mx-auto" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("form")}>
                Back
              </Button>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {step === "results" && (
          <RateSheetResults formData={formData} onClose={handleClose} onBack={() => setStep("upload")} />
        )}
      </DialogContent>
    </Dialog>
  )
}
