export interface Race {
  id: string
  name: string
  description?: string
  distance: number // in kilometers
  startTime: string
  status: 'scheduled' | 'active' | 'completed' | 'cancelled'
  type: 'public' | 'private' | 'invite-only'
  maxParticipants?: number
  currentParticipants: number
  entryFee?: number
  currency?: string
  location?: string
  latitude?: number
  longitude?: number
  timezone?: string
  rules?: Record<string, any>
  bannerImage?: string
  isFeatured: boolean
  organizerId: string
  organizer: UserPublicProfile
  createdAt: string
  updatedAt: string
}

export interface RaceParticipation {
  id: string
  raceId: string
  userId: string
  user: UserPublicProfile
  status: 'registered' | 'started' | 'in_progress' | 'completed' | 'dnf' | 'disqualified'
  startTime?: string
  finishTime?: string
  totalTime?: number // in seconds
  averagePace?: number // seconds per kilometer
  distanceCovered?: number // in kilometers
  currentPosition?: number
  trackingPoints: TrackingPoint[]
  createdAt: string
  updatedAt: string
}

export interface TrackingPoint {
  id: string
  participationId: string
  latitude: number
  longitude: number
  altitude?: number
  speed?: number // km/h
  pace?: number // seconds per kilometer
  distance: number // in kilometers
  timestamp: string
  createdAt: string
}

export interface RaceFilters {
  status?: 'scheduled' | 'active' | 'completed' | 'cancelled'
  type?: 'public' | 'private' | 'invite-only'
  distance_min?: number
  distance_max?: number
  start_date_from?: string
  start_date_to?: string
  featured?: boolean
  search?: string
  page?: number
  limit?: number
}

export interface CreateRaceRequest {
  name: string
  description?: string
  distance: number
  startTime: string
  maxParticipants?: number
  type?: 'public' | 'private' | 'invite-only'
  entryFee?: number
  currency?: string
  location?: string
  latitude?: number
  longitude?: number
  timezone?: string
  rules?: Record<string, any>
  bannerImage?: string
}

export interface UpdateRaceRequest {
  name?: string
  description?: string
  distance?: number
  startTime?: string
  maxParticipants?: number
  type?: 'public' | 'private' | 'invite-only'
  entryFee?: number
  currency?: string
  location?: string
  latitude?: number
  longitude?: number
  timezone?: string
  rules?: Record<string, any>
  bannerImage?: string
}

export interface RaceLeaderboardEntry {
  position: number
  userId: string
  username: string
  firstName: string
  lastName: string
  avatarUrl?: string
  distanceCovered: number
  totalTime?: number
  averagePace?: number
  status: 'in_progress' | 'completed' | 'dnf' | 'disqualified'
}

export interface RaceStats {
  totalParticipants: number
  participantsStarted: number
  participantsCompleted: number
  participantsDNF: number
  averageFinishTime?: number
  fastestTime?: number
  slowestTime?: number
}