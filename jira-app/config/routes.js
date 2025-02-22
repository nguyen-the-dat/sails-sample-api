/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "post /user/create": {
    action: "user/create",
  },

  "POST /users/signin": "AuthController.login",

  "/": { view: "pages/homepage" },
  "GET /articles/list": "ArticlesController.list",
  "GET /articles/add": "ArticlesController.add",
  "POST /articles/create": "ArticlesController.create",
  "POST /articles/delete/:id": "ArticlesController.delete",
  "POST /articles/edit/:id": "ArticlesController.edit",
  "POST /articles/update/:id": "ArticlesController.update",

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
