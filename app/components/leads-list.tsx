import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, TrendingUp } from "lucide-react"

interface Lead {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  ficoScore: number
  loanType: string
  propertyValue: number
  loanValue: number
  loanPurpose: string
  state: string
  propertyType: string
  occupancy: string
  minimumRateNeeded: number
  maximumPointsNeeded: number
  interestLevel: number
  lastContacted: string
  notes: string
}

interface LeadsListProps {
  leads: Lead[]
}

function getFicoGroup(score: number): { label: string; color: string } {
  if (score >= 701) return { label: "High", color: "bg-green-100 text-green-800" }
  if (score >= 551) return { label: "Medium", color: "bg-yellow-100 text-yellow-800" }
  return { label: "Low", color: "bg-red-100 text-red-800" }
}

function getInterestLevelColor(level: number): string {
  if (level >= 8) return "bg-green-100 text-green-800"
  if (level >= 6) return "bg-yellow-100 text-yellow-800"
  return "bg-gray-100 text-gray-800"
}

export function LeadsList({ leads }: LeadsListProps) {
  if (leads.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">No leads found</div>
        <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {leads.map((lead) => {
        const ficoGroup = getFicoGroup(lead.ficoScore)

        return (
          <Card key={lead.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {lead.firstName} {lead.lastName}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={getInterestLevelColor(lead.interestLevel)}>
                        Interest: {lead.interestLevel}/10
                      </Badge>
                      <Badge className={ficoGroup.color}>
                        FICO: {ficoGroup.label} ({lead.ficoScore})
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {lead.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {lead.phoneNumber}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {lead.state}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Last contacted: {lead.lastContacted}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Loan Type</span>
                      <p className="text-sm font-medium text-gray-900">{lead.loanType}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Property</span>
                      <p className="text-sm font-medium text-gray-900">{lead.propertyType}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Purpose</span>
                      <p className="text-sm font-medium text-gray-900">{lead.loanPurpose}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Occupancy</span>
                      <p className="text-sm font-medium text-gray-900">{lead.occupancy}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Property Value</span>
                      <p className="text-sm font-medium text-gray-900">${lead.propertyValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Loan Value</span>
                      <p className="text-sm font-medium text-gray-900">${lead.loanValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Min Rate Needed</span>
                      <p className="text-sm font-medium text-gray-900">{lead.minimumRateNeeded}%</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Max Points</span>
                      <p className="text-sm font-medium text-gray-900">{lead.maximumPointsNeeded}</p>
                    </div>
                  </div>

                  {lead.notes && (
                    <div className="mb-4">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Notes</span>
                      <p className="text-sm text-gray-700 mt-1">{lead.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
