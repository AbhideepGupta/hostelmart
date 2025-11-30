import Listing from "../model/listingModel.js";

// Create new listing
export const createListing = async (req, res) => {
  try {
    const { title, description, price, isLend } = req.body;

    const listing = new Listing({
      title,
      description,
      price,
      isLend,
      owner: req.user._id, // logged-in user
    });

    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all listings
export const getListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate("owner", "name email");
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete listing (only owner)
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await listing.deleteOne();
    res.json({ message: "Listing removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
