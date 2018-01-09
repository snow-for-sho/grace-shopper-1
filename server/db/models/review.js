const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  reviewText : {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: {
        min: {
          args: [140],
          msg: 'Review must be at least 140 characters.'
        }
      }
    }
  },
  numberOfStars: {
    type: Sequelize.INTERGER,
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
      return this.reviewText.subString(0, 140);
    }
  },
  orderId: Sequelize.INTERGER
});

module.exports = Review;
