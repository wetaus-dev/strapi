'use strict';

const { getService } = require('../utils');
const { validateCreateFolder, validateUpdateFolder } = require('./validation/admin/folder');

const folderModel = 'plugin::upload.folder';

module.exports = {
  async find(ctx) {
    const permissionsManager = strapi.admin.services.permission.createPermissionsManager({
      ability: ctx.state.userAbility,
      model: folderModel,
    });

    const { results, pagination } = await strapi.entityService.findWithRelationCounts(folderModel, {
      ...ctx.query,
      populate: {
        children: {
          count: true,
        },
        files: {
          count: true,
        },
        parent: true,
        createdBy: true,
        updatedBy: true,
      },
    });

    ctx.body = {
      results: await permissionsManager.sanitizeOutput(results),
      pagination,
    };
  },
  async create(ctx) {
    const { user } = ctx.state;
    const { body } = ctx.request;

    await validateCreateFolder(body);

    const folderService = getService('folder');

    const folder = await folderService.create(body, { user });

    const permissionsManager = strapi.admin.services.permission.createPermissionsManager({
      ability: ctx.state.userAbility,
      model: folderModel,
    });

    ctx.body = {
      data: await permissionsManager.sanitizeOutput(folder),
    };
  },

  async update(ctx) {
    const { user } = ctx.state;
    const {
      body,
      params: { id },
    } = ctx.request;

    const permissionsManager = strapi.admin.services.permission.createPermissionsManager({
      ability: ctx.state.userAbility,
      model: folderModel,
    });

    await validateUpdateFolder(id)(body);

    const folderService = getService('folder');

    const updatedFolder = await folderService.update(id, body, { user });

    ctx.body = {
      data: await permissionsManager.sanitizeOutput(updatedFolder),
    };
  },

  async getStructure(ctx) {
    const { getStructure } = getService('folder');

    const structure = await getStructure();

    ctx.body = {
      data: structure,
    };
  },
};
