import { getAllPostIds } from "../../../lib/posts";

export default function handler(req, res) {
  if (req.method === "GET") {
    let posts = getAllPostIds().map((item) => ({ id: item.params.id }));

    console.log("posts");
    console.log(posts);
    res.status(200).json(posts);
  }
}
