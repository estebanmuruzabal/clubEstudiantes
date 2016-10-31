/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/contacto              ->  index
 * POST    /api/contacto              ->  create
 * GET     /api/contacto/:id          ->  show
 * PUT     /api/contacto/:id          ->  update
 * DELETE  /api/contacto/:id          ->  destroy
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _contactoModel = require('./contacto.model');

var _contactoModel2 = _interopRequireDefault(_contactoModel);

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _lodash2['default'].merge(entity, updates);
    return updated.saveAsync().spread(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.removeAsync().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Contactos

function index(req, res) {
  _contactoModel2['default'].findAsync().then(respondWithResult(res))['catch'](handleError(res));
}

// Gets a single Contacto from the DB

function show(req, res) {
  _contactoModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(respondWithResult(res))['catch'](handleError(res));
}

// Creates a new Contacto in the DB

function create(req, res) {
  _contactoModel2['default'].createAsync(req.body).then(respondWithResult(res, 201))['catch'](handleError(res));
}

// Updates an existing Contacto in the DB

function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  _contactoModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res))['catch'](handleError(res));
}

// Deletes a Contacto from the DB

function destroy(req, res) {
  _contactoModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(removeEntity(res))['catch'](handleError(res));
}
//# sourceMappingURL=contacto.controller.js.map