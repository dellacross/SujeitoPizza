import { Router } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { isAuthenticated } from './middlewares/isAuthenticated'
import { CreateProductController } from './controllers/product/CreateProductController'

const router = Router()

// user routes
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// categories routes
router.post('/category', new CreateCategoryController().handle)
router.get('/category', new ListCategoryController().handle)

// products routes
router.post('/product', new CreateProductController().handle)

export { router }