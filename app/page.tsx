"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Search, Plus, TrendingUp, Users, FileText, BarChart3 } from "lucide-react"
import { LeadsList } from "./components/leads-list"
import { UploadRateSheet } from "./components/upload-rate-sheet"
import { NewLeadDialog } from "./components/new-lead-dialog"

// Mock data for demonstration
const mockLeads = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phoneNumber: "(555) 123-4567",
    ficoScore: 750,
    loanType: "Conventional",
    propertyValue: 450000,
    loanValue: 360000,
    loanPurpose: "Purchase",
    state: "CA",
    propertyType: "SFR",
    occupancy: "Primary",
    minimumRateNeeded: 6.5,
    maximumPointsNeeded: 1.0,
    interestLevel: 8,
    lastContacted: "2024-01-15",
    notes: "Interested in refinancing if rates drop",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phoneNumber: "(555) 987-6543",
    ficoScore: 680,
    loanType: "FHA",
    propertyValue: 320000,
    loanValue: 304000,
    loanPurpose: "No Cash-out Refi",
    state: "TX",
    propertyType: "Condo",
    occupancy: "Primary",
    minimumRateNeeded: 7.0,
    maximumPointsNeeded: 0.5,
    interestLevel: 6,
    lastContacted: "2024-01-12",
    notes: "Current rate is 7.5%, looking to reduce payment",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Davis",
    email: "michael.davis@email.com",
    phoneNumber: "(555) 456-7890",
    ficoScore: 820,
    loanType: "VA/IRRL",
    propertyValue: 580000,
    loanValue: 464000,
    loanPurpose: "Cash-out Refi",
    state: "FL",
    propertyType: "SFR",
    occupancy: "Primary",
    minimumRateNeeded: 6.0,
    maximumPointsNeeded: 1.5,
    interestLevel: 9,
    lastContacted: "2024-01-10",
    notes: "Veteran, excellent credit, needs cash for home improvements",
  },
]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showNewLeadDialog, setShowNewLeadDialog] = useState(false)

  const filteredLeads = mockLeads.filter(
    (lead) =>
      `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Refi CRM</h1>
                <p className="text-sm text-gray-600">Loan Officer Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setShowUploadDialog(true)} className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload Rate Sheet
              </Button>
              <Button variant="outline" onClick={() => setShowNewLeadDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Lead
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockLeads.length}</div>
              <p className="text-xs text-muted-foreground">Active prospects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Interest</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockLeads.filter((lead) => lead.interestLevel >= 8).length}</div>
              <p className="text-xs text-muted-foreground">Interest level 8+</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg FICO</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(mockLeads.reduce((sum, lead) => sum + lead.ficoScore, 0) / mockLeads.length)}
              </div>
              <p className="text-xs text-muted-foreground">Credit score average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rate Sheets</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Uploaded this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Leads Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Your Leads</CardTitle>
                <CardDescription>Manage your loan prospects and track refinancing opportunities</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <LeadsList leads={filteredLeads} />
          </CardContent>
        </Card>
      </div>

      {/* Upload Rate Sheet Dialog */}
      <UploadRateSheet open={showUploadDialog} onOpenChange={setShowUploadDialog} />

      {/* New Lead Dialog */}
      <NewLeadDialog open={showNewLeadDialog} onOpenChange={setShowNewLeadDialog} />
    </div>
  )
}
