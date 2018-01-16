const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  reviewText : {
    type: Sequelize.TEXT,
    allowNull: false,
    notEmpty: true,
    len: [10, 100000000]
  },
  numberOfStars: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    },
    defaultValue: 0
  },
  recommendation: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  headline: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.reviewText?this.reviewText.substring(0, 20):'';
    }
  }
});

module.exports = Review;
