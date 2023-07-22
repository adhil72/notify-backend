import express from 'express';
import { Auth, findUser } from '../../Helpers/Database/Schemas/auth';
import { errorFilter } from '../../Helpers/Database/Filter';
const router = express.Router();

router.post('/', async (req, res) => {
  req.body.lastAccess = new Date().toString()
  let d = await findUser(req.body.email)

  if (d) {
    if (d.password == '') {
      d.password = "false"
    } else {
      d.password = "true"
    }
    res.send({ id: d._id, email: d.email, name: d.name, password: d.password, verified: d.verified })
  } else {
    req.body.verified = false
    let user = new Auth(req.body)
    user.save().then((d) => {
      if (d.password == '') {
        d.password = "false"
      } else {
        d.password = "true"
      }
      res.send({ id: d._id, email: d.email, name: d.name, password: d.password, verified: d.verified })
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