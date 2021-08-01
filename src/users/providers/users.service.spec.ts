import faker from 'faker'
import { Test } from '@nestjs/testing'

import { UsersService } from '../providers/users.service'
import { PrismaService } from 'src/prisma/prisma.service'

jest.mock('@prisma/client', () => {
  const mockUserFindMany = jest.fn().mockResolvedValue([]) // how do I access this in my test suites?
  const mockUserFindOne = jest.fn().mockResolvedValue({}) // how do I access this in my test suites?
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        users: {
          findMany: mockUserFindMany,
          findOne: mockUserFindOne,
        },
      }
    }),
  }
})

describe('UsersController', () => {
  let usersService: UsersService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile()

    usersService = moduleRef.get<UsersService>(UsersService)
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      expect(await usersService.findAll()).toEqual([])
    })
  })
})
