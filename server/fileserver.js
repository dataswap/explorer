const express = require("express")
const multer = require("multer")
const cors = require("cors")

const app = express()

app.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/")
    },
    filename: function (req, file, cb) {
        cb(null, "proof.json")
    },
})

const upload = multer({ storage: storage })

app.post("/", upload.single("file"), (req, res) => {
    const newFileName = req.newFileName
    res.json({ newFileName })
})

const port = process.env.PORT || 8888
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
