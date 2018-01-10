Tables
Users
	Name, lastname, email (unique), cart (array of items), isAdmin (true/false), password, googleID, facebookID
Orders
	Array of JSON object, where each JSON contains {productId, quantity, price}, sub-total ( virtual based on qty*price for each product), total (virtual - subtotal + tax), status (ENUM pending/confirmed/shipped/etc...), name, address (allow user to ship to anyone), phone, comments
Category
	    Title,rank (updated via hook from orders), popularity/size (virtual - number of products in category) (tags - searchable criteria) 
Products
	•	Must have title, description, price, and inventory quantity, photo,sizes (array), origin 
Reviews
	Text (validate with min chars), numStars, recommendation, Summary, orderId (if exists, verified)

Associations - verify proper associations (belongsTo vs hasMany)
Product.belongsToMany(Category)
Category.belongsToMany (Product)
Order.hasOne(User)
User.hasMany(Order)
Review.hasOne(User)
Review.belongsTo(Product)
User.hasMany(Review)
