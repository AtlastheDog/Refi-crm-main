"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface NewLeadDialogProps {
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

export function NewLeadDialog({ open, onOpenChange }: NewLeadDialogProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    ficoScore: "",
    loanType: "",
    propertyType: "",
    loanPurpose: "",
    state: "",
    occupancy: "",
    propertyValue: "",
    loanValue: "",
    minimumRateNeeded: "",
    maximumPointsNeeded: "",
    interestLevel: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("New lead data:", formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      ficoScore: "",
      loanType: "",
      propertyType: "",
      loanPurpose: "",
      state: "",
      occupancy: "",
      propertyValue: "",
      loanValue: "",
      minimumRateNeeded: "",
      maximumPointsNeeded: "",
      interestLevel: "",
      notes: "",
    })
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
          <DialogDescription>Enter the details for your new loan prospect</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>
          </div>

          {/* Loan Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Loan Information</h3>
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
            </div>
          </div>

          {/* Property Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Property Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="propertyValue">Property Value</Label>
                <Input
                  id="propertyValue"
                  type="number"
                  value={formData.propertyValue}
                  onChange={(e) => setFormData({ ...formData, propertyValue: e.target.value })}
                  placeholder="e.g., 450000"
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
                />
              </div>
            </div>
          </div>

          {/* Lead Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Lead Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="minimumRateNeeded">Minimum Rate Needed (%)</Label>
                <Input
                  id="minimumRateNeeded"
                  type="number"
                  step="0.01"
                  value={formData.minimumRateNeeded}
                  onChange={(e) => setFormData({ ...formData, minimumRateNeeded: e.target.value })}
                  placeholder="e.g., 6.5"
                />
              </div>

              <div>
                <Label htmlFor="maximumPointsNeeded">Maximum Points Accepted</Label>
                <Input
                  id="maximumPointsNeeded"
                  type="number"
                  step="0.01"
                  value={formData.maximumPointsNeeded}
                  onChange={(e) => setFormData({ ...formData, maximumPointsNeeded: e.target.value })}
                  placeholder="e.g., 1.0"
                />
              </div>

              <div>
                <Label htmlFor="interestLevel">Interest Level (1-10)</Label>
                <Input
                  id="interestLevel"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.interestLevel}
                  onChange={(e) => setFormData({ ...formData, interestLevel: e.target.value })}
                  placeholder="e.g., 8"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notes</h3>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any additional information about this lead..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-6 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Lead
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
