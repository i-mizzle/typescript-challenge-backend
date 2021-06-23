import express, { Request, Response } from "express";
import { connect } from "../db";

const router = express.Router();

interface ResultObject {
  meta: Object,
  data: Object
}

interface Filters {
  bedrooms: number | null
  beds: number | void
  bathrooms: number | void
  amenities: string[] | void
}

router.post("/", async (req: Request, res: Response) => {

  const queryObject = req.query;
  const resPerPage = +queryObject.perPage || 25; // results per page
  const page = +queryObject.page || 1; // Page 

  const db = await connect();
  const col = db.collection("listingsAndReviews");

  let filters: Filters = {
    bedrooms: req.body.bedrooms,
    beds: req.body.beds,
    bathrooms: req.body.bathrooms,
    amenities: req.body.amenities
  }
  
  const results = await col.find({})
    .skip((resPerPage * page) - resPerPage)
    .limit(resPerPage);
  res.json(await results.toArray());
});

export default router;
