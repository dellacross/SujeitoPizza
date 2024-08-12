import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/multer'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { isAuthenticated } from './middlewares/isAuthenticated'
import { CreateProductController } from './controllers/product/CreateProductController'

const router = Router()
const upload = multer(uploadConfig.upload("./tmp"))

// user routes
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// categories routes
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

// products routes
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

export { router }