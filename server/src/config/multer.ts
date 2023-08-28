import multer from 'multer'

const storageEngine = multer.diskStorage({
  destination: './temp/images',
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`)
  },
})

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 5000000 },
})

export default upload
