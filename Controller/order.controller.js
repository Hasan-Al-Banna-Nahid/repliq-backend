const getOrder = async (req, res) => {
  const result = await ordersCollection.find().toArray();
  res.send(result);
};
const createOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    // Ensure the _id is unique
    const newOrder = {
      _id: new ObjectId(),
      ...data,
      userId: new ObjectId(id),
    };

    const result = await ordersCollection.insertOne(newOrder);
    res.json(result);
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the order." });
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;

  const query = { _id: new ObjectId(id) };
  const result = await ordersCollection.deleteOne(query);
  res.send(result);
};
module.exports = { getOrder, createOrder, deleteOrder };
