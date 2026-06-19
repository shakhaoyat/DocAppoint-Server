const express = require('express');
const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
      res.send('Hello W docappoint!')
})

app.listen(PORT, () => {
      console.log(`Example app listening on PORT ${PORT}`)
})