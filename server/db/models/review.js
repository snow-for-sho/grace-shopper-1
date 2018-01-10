const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  reviewText : {
    type: Sequelize.TEXT,
    allowNull: false,
    notEmpty: true,
    len: [140, 100000000]
  },
  numberOfStars: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  },
  recommendation: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  headline: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.reviewText?this.reviewText.substring(0, 140):'';
    }
  }
});

module.exports = Review;
