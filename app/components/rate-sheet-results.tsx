"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, CheckCircle } from "lucide-react"

interface RateSheetResultsProps {
  formData: any
  onClose: () => void
  onBack: () => void
}

// Mock parsed rate data
const mockRateData = [
  { rate: 6.25, points: 0.0, cost: 0 },
  { rate: 6.125, points: 0.25, cost: 1250 },
  { rate: 6.0, points: 0.5, cost: 2500 },
  { rate: 5.875, points: 0.75, cost: 3750 },
  { rate: 5.75, points: 1.0, cost: 5000 },
  { rate: 5.625, points: 1.25, cost: 6250 },
  { rate: 5.5, points: 1.5, cost: 7500 },
]

// Mock matching leads
const mockMatchingLeads = [
  {
    id: 1,
    name: "John Smith",
    ficoScore: 750,
    minRateNeeded: 6.5,
    maxPointsNeeded: 1.0,
    currentRate: 7.25,
    potentialSavings: 1.0,
    qualifyingRates: [
      { rate: 6.25, points: 0.0 },
      { rate: 6.125, points: 0.25 },
      { rate: 6.0, points: 0.5 },
      { rate: 5.875, points: 0.75 },
      { rate: 5.75, points: 1.0 },
    ],
  },
  {
    id: 3,
    name: "Michael Davis",
    ficoScore: 820,
    minRateNeeded: 6.0,
    maxPointsNeeded: 1.5,
    currentRate: 6.75,
    potentialSavings: 0.75,
    qualifyingRates: [
      { rate: 6.0, points: 0.5 },
      { rate: 5.875, points: 0.75 },
      { rate: 5.75, points: 1.0 },
      { rate: 5.625, points: 1.25 },
      { rate: 5.5, points: 1.5 },
    ],
  },
]

export function RateSheetResults({ formData, onClose, onBack }: RateSheetResultsProps) {
  const [showAnalysis, setShowAnalysis] = useState(false)

  const handleAnalyze = () => {
    setShowAnalysis(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>OCR Processing Complete</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-green-600 mb-4">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Rate sheet successfully processed</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
            <div>
              <span className="font-medium">FICO Group:</span>{" "}
              {Number.parseInt(formData.ficoScore) >= 701
                ? "High"
                : Number.parseInt(formData.ficoScore) >= 551
                  ? "Medium"
                  : "Low"}
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
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRateData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.rate}%</TableCell>
                    <TableCell>{row.points}</TableCell>
                    <TableCell>${row.cost.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {!showAnalysis ? (
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              Save & Close
            </Button>
            <Button onClick={handleAnalyze} className="bg-blue-600 hover:bg-blue-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analyze Leads
            </Button>
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Lead Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{mockMatchingLeads.length} Matching Leads Found</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Refinance Opportunities Available</Badge>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Based on the uploaded rate sheet, we found leads with similar profiles who may benefit from refinancing.
              </p>
            </div>

            <div className="space-y-4">
              {mockMatchingLeads.map((lead) => (
                <Card key={lead.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{lead.name}</h4>
                        <p className="text-sm text-gray-600">
                          FICO: {lead.ficoScore} | Current Rate: {lead.currentRate}% | Potential Savings:{" "}
                          {lead.potentialSavings}%
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {lead.qualifyingRates.length} Qualifying Rates
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2">Lead Requirements:</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          Min Rate Needed: <span className="font-medium">{lead.minRateNeeded}%</span>
                        </div>
                        <div>
                          Max Points Accepted: <span className="font-medium">{lead.maxPointsNeeded}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Available Options:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {lead.qualifyingRates.slice(0, 3).map((rate, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                            <span className="font-medium">{rate.rate}%</span> at {rate.points} points
                          </div>
                        ))}
                        {lead.qualifyingRates.length > 3 && (
                          <div className="bg-gray-50 p-2 rounded text-sm text-gray-600">
                            +{lead.qualifyingRates.length - 3} more options
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={onBack}>
                Back to Results
              </Button>
              <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
                Save Analysis & Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
