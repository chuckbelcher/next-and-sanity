import sanityClient from '../../sanityClient';

sanityClient.config({
    token: process.env.SANITY_WRITE_TOKEN,
})
console.log(process.env)
export default async (req, res) => {
    console.log(req);
    const { _id } = JSON.parse(req.body);
    const data = await sanityClient.patch(_id).inc({ likes: 1 }).commit();

    res.statusCode = 200
    res.json({ likes: data.likes })
  }