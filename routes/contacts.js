import ContactService from '../services/contact-service'

const _service = new ContactService()

export default router => {
  router
    .get('/contacts', (ctx, next) => {
      ctx.response.ok(_service.getAll())
    })
    .post('/contacts', (ctx, next) => {
      ctx.checkBody('first_name').notEmpty()
      ctx.checkBody('last_name').notEmpty()
      ctx.checkBody('email').notEmpty()
      ctx.checkBody('about_me').notEmpty()

      if (ctx.errors) {
        ctx.response.badRequest(ctx.errors, 400)
        return
      }

      let id = _service.add(ctx.request.body)

      ctx.response.ok({ id: id })
    })
    .put('/contacts/:id', (ctx, next) => {
      ctx.checkBody('first_name').notEmpty()
      ctx.checkBody('last_name').notEmpty()
      ctx.checkBody('email').notEmpty()
      ctx.checkBody('about_me').notEmpty()

      if (ctx.errors) {
        ctx.response.badRequest(ctx.errors, 400)
        return
      }

      _service.update(parseInt(ctx.params.id), ctx.request.body)

      ctx.response.ok('Contact is updated')
    })
    .delete('/contacts/:id', (ctx, next) => {
      _service.delete(parseInt(ctx.params.id))

      ctx.response.ok('Contact is deleted')
    })
}
