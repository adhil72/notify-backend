import express from 'express';
import { Auth, findUser } from '../../Helpers/Database/Schemas/auth';
import { errorFilter } from '../../Helpers/Database/Filter';
const router = express.Router();

router.post('/', async (req, res) => {
  req.body.lastAccess = new Date().toString()
  let d = await findUser(req.body.email)

  if (d) {
    d.lastAccess = new Date().toString()
    await d.save()
    res.send({ id: d._id, email: d.email, name: d.name, password: d.password == '' ? 'false' : 'true', verified: d.verified })
  } else {
    req.body.verified = false
    req.body.lastAccess = new Date().toString()
    let user = new Auth(req.body)
    user.save().then((d) => {
      res.send({ id: d._id, email: d.email, name: d.name, password: d.password == '' ? 'false' : 'true', verified: d.verified })
    }).catch((w) => {
      if (w._message == 'Auth validation failed') {
        res.send(errorFilter(w))
      } else {
        throw w
      }
    })
  }


});

export default router;