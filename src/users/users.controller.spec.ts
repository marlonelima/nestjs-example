import faker from 'faker'
import { Test } from '@nestjs/testing'

import { UsersModule } from './users.module'

import { UsersController } from './users.controller'
import { UsersService } from './providers/users.service'

describe('UsersController', () => {
  let usersController: UsersController
  let usersService: UsersService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile()

    usersService = moduleRef.get<UsersService>(UsersService)
    usersController = moduleRef.get<UsersController>(UsersController)
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
        {
          created_at: new Date(),
          updated_at: new Date(),
          email: faker.internet.email(),
          name: faker.name.findName(),
          password: faker.internet.password(),
          id: faker.unique(() => Math.random() * 1000),
          role: 'user',
        },
      ]

      jest.spyOn(usersService, 'findAll').mockResolvedValue(result)

      expect(await usersController.findAll()).toBe(result)
    })
  })

  describe('findOne', () => {
    it('should return an specific logged user', async () => {
      const user = {
        id: 1,
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        created_at: new Date(),
        updated_at: new Date(),
        role: 'admin',
        token: 'jwt-token-example',
      }

      expect(await usersController.findOne(user)).toBe(user)
    })
  })

  describe('update', () => {
    it('should return an updated user', async () => {
      const requestBody = {
        userId: 1,
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }

      const { userId, ...userData } = requestBody

      const response = {
        id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        role: 'admin',
        ...userData,
      }

      jest.spyOn(usersService, 'update').mockResolvedValue(response)

      expect(await usersController.update(requestBody)).toBe(response)
    })
  })

  describe('create', () => {
    it('should return the created user', async () => {
      const requestBody = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'user',
      }

      const response = {
        ...requestBody,
        id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      }

      jest.spyOn(usersService, 'create').mockResolvedValue(response)

      expect(await usersController.create(requestBody)).toBe(response)
    })
  })
})

afterAll(() => {
  jest.clearAllMocks()
  jest.resetAllMocks()
  jest.restoreAllMocks()
})
