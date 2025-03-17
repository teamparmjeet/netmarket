import dbConnect from "@/lib/dbConnect";
import SpringBonanza from "@/model/SpringBonanza";

export const GET = async (request) => {
  await dbConnect();

  try {
    const images = await SpringBonanza.find({ defaultdata: "Bonanza" }).select("image -_id");

    return Response.json(
      {
        message: "Image URLs fetched successfully!",
        success: true,
        images,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching image URLs:", error);
    return Response.json(
      {
        message: "Error fetching image URLs!",
        success: false,
      },
      { status: 500 }
    );
  }
};
