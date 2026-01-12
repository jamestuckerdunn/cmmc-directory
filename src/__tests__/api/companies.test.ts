/**
 * API tests for /api/companies endpoints
 * These tests mock the database and authentication layers
 */

import { NextRequest } from 'next/server'

// Mock the database module
jest.mock('@/lib/db', () => ({
  getCompanies: jest.fn(),
  countCompanies: jest.fn(),
  createCompany: jest.fn(),
  updateCompany: jest.fn(),
  setCompanyNaicsCodes: jest.fn(),
  getUserByClerkId: jest.fn(),
}))

// Mock Clerk auth
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
  currentUser: jest.fn(),
}))

// Mock rate limiting
jest.mock('@/lib/rate-limit', () => ({
  rateLimit: jest.fn().mockResolvedValue({ success: true }),
}))

import { GET, POST, PUT } from '@/app/api/companies/route'
import { getCompanies, countCompanies, createCompany, getUserByClerkId } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'

describe('/api/companies', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('returns companies with pagination', async () => {
      const mockCompanies = [
        { id: '1', name: 'Test Company 1', cmmc_level: 2 },
        { id: '2', name: 'Test Company 2', cmmc_level: 3 },
      ];
      (getCompanies as jest.Mock).mockResolvedValue(mockCompanies);
      (countCompanies as jest.Mock).mockResolvedValue(2)

      const request = new NextRequest('http://localhost:3000/api/companies')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.companies).toHaveLength(2)
      expect(data.total).toBe(2)
      expect(data.page).toBe(1)
    })

    it('applies search filter', async () => {
      (getCompanies as jest.Mock).mockResolvedValue([]);
      (countCompanies as jest.Mock).mockResolvedValue(0)

      const request = new NextRequest(
        'http://localhost:3000/api/companies?search=test'
      )
      await GET(request)

      expect(getCompanies).toHaveBeenCalledWith(
        expect.objectContaining({ search: 'test' })
      )
    })

    it('applies CMMC level filter', async () => {
      (getCompanies as jest.Mock).mockResolvedValue([]);
      (countCompanies as jest.Mock).mockResolvedValue(0)

      const request = new NextRequest(
        'http://localhost:3000/api/companies?level=2'
      )
      await GET(request)

      expect(getCompanies).toHaveBeenCalledWith(
        expect.objectContaining({ cmmcLevel: 2 })
      )
    })

    it('applies state filter', async () => {
      (getCompanies as jest.Mock).mockResolvedValue([]);
      (countCompanies as jest.Mock).mockResolvedValue(0)

      const request = new NextRequest(
        'http://localhost:3000/api/companies?state=VA'
      )
      await GET(request)

      expect(getCompanies).toHaveBeenCalledWith(
        expect.objectContaining({ state: 'VA' })
      )
    })

    it('handles pagination', async () => {
      (getCompanies as jest.Mock).mockResolvedValue([]);
      (countCompanies as jest.Mock).mockResolvedValue(50)

      const request = new NextRequest(
        'http://localhost:3000/api/companies?page=3'
      )
      const response = await GET(request)
      const data = await response.json()

      expect(data.page).toBe(3)
      expect(getCompanies).toHaveBeenCalledWith(
        expect.objectContaining({ offset: 20 })
      )
    })
  })

  describe('POST', () => {
    it('returns 401 when not authenticated', async () => {
      (auth as jest.Mock).mockResolvedValue({ userId: null })

      const request = new NextRequest('http://localhost:3000/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test', cmmc_level: 2 }),
      })
      const response = await POST(request)

      expect(response.status).toBe(401)
    })

    it('returns 403 when subscription not active', async () => {
      (auth as jest.Mock).mockResolvedValue({ userId: 'user_123' });
      (getUserByClerkId as jest.Mock).mockResolvedValue({
        id: '1',
        subscription_status: 'inactive',
      })

      const request = new NextRequest('http://localhost:3000/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test', cmmc_level: 2 }),
      })
      const response = await POST(request)

      expect(response.status).toBe(403)
    })

    it('validates required fields', async () => {
      (auth as jest.Mock).mockResolvedValue({ userId: 'user_123' });
      (getUserByClerkId as jest.Mock).mockResolvedValue({
        id: '1',
        subscription_status: 'active',
      })

      const request = new NextRequest('http://localhost:3000/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}), // Missing required fields
      })
      const response = await POST(request)

      expect(response.status).toBe(400)
    })

    it('creates company when valid', async () => {
      (auth as jest.Mock).mockResolvedValue({ userId: 'user_123' });
      (getUserByClerkId as jest.Mock).mockResolvedValue({
        id: '1',
        subscription_status: 'active',
      });
      (createCompany as jest.Mock).mockResolvedValue({
        id: 'new_company',
        name: 'Test Company',
        cmmc_level: 2,
      })

      const request = new NextRequest('http://localhost:3000/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Company',
          cmmc_level: 2,
        }),
      })
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.company.name).toBe('Test Company')
    })
  })

  describe('PUT', () => {
    it('returns 401 when not authenticated', async () => {
      (auth as jest.Mock).mockResolvedValue({ userId: null })

      const request = new NextRequest('http://localhost:3000/api/companies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: '1', name: 'Updated' }),
      })
      const response = await PUT(request)

      expect(response.status).toBe(401)
    })

    it('returns 400 when company id missing', async () => {
      (auth as jest.Mock).mockResolvedValue({ userId: 'user_123' });
      (getUserByClerkId as jest.Mock).mockResolvedValue({
        id: '1',
        subscription_status: 'active',
      })

      const request = new NextRequest('http://localhost:3000/api/companies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Updated' }), // Missing id
      })
      const response = await PUT(request)

      expect(response.status).toBe(400)
    })
  })
})
