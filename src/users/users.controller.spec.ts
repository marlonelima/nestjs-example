import faker from 'faker'
import { UsersController } from './users.controller'
import { UsersService } from './providers/users.service'
import { AuthService } from 'src/auth/auth.service'

describe('UsersController', () => {
  let usersController: UsersController
  let usersService: UsersService
  let authService: AuthService

  beforeEach(async () => {
    usersService = new UsersService(null)
    authService = new AuthService(null, null)

    usersController = new UsersController(usersService, authService)
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
})
