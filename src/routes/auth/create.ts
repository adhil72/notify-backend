import express from 'express';
import { Auth, findUser } from '../../Helpers/Database/Schemas/auth';
import { errorFilter } from '../../Helpers/Database/Filter';
const router = express.Router();

router.post('/', async (req, res) => {
  req.body.lastAccess = new Date().toString()
  let search = await findUser(req.body.email)

  if (search) {
    if (search.password == '') {
      search.password = "false"
    } else {
      search.password = "true"
    }
    search.lastAccess = ''
    res.send(search)
  } else {
    let user = new Auth(req.body)
    user.save().then((d) => {
      if (d.password == '') {
        d.password = "false"
      } else {
        d.password = "true"
      }
      d.lastAccess = ''
      res.send(d)
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