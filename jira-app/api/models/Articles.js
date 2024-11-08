/**
 * Articles.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

/**
 * Articles.js
 *
 * @description :: A model definition representing the "articles" database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: {
      type: "string",
      required: true,
      maxLength: 255,
      description: "Title of the article.",
    },

    body: {
      type: "string",
      required: true,
      description: "Main content of the article.",
    },

    summary: {
      type: "string",
      maxLength: 500,
      description: "Brief summary of the article.",
    },

    author: {
      model: "User",
      description: "Reference to the user who authored the article.",
    },

    tags: {
      type: "json",
      columnType: "array",
      description: "Array of tags related to the article.",
      example: ["technology", "science"],
    },

    status: {
      type: "string",
      isIn: ["draft", "published", "archived"],
      defaultsTo: "draft",
      description: "Publication status of the article.",
    },

    createdAt: {
      type: "ref",
      autoCreatedAt: true,
    },
    updatedAt: {
      type: "ref",
      autoUpdatedAt: true,
    },
  },
};
