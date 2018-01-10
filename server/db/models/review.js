const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  reviewText : {
    type: Sequelize.TEXT,
    allowNull: false,
    notEmpty: true
    // validate: {
    //   len: {
    //     min: {
    //       args: [140, 1000000],
    //       msg: 'Review must be at least 140 characters.'
    //     }
    //   }
    // }
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
