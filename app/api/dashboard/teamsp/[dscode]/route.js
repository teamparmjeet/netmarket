import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

async function getTeamChain(ds, visited = new Set()) {
  if (visited.has(ds)) return []; // Prevent infinite loops
  visited.add(ds);

  // Find direct members (users whose `pdscode` matches `ds`)
  const directMembers = await UserModel.find({ pdscode: ds });

  let team = [...directMembers];

  // Recursively get team members for each direct member
  for (const member of directMembers) {
    const subTeam = await getTeamChain(member.dscode, visited);
    team = [...team, ...subTeam];
  }

  return team;
}

export async function GET(request) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const ds = url.pathname.split("/").pop(); // Extract dscode from URL

    if (!ds) {
      return Response.json(
        {
          message: "Invalid request! dscode parameter is missing.",
          success: false,
        },
        { status: 400 }
      );
    }

    // Find the main user
    const mainUser = await UserModel.findOne({ dscode: ds });

    if (!mainUser) {
      return Response.json(
        {
          message: "User not found!",
          success: false,
        },
        { status: 404 }
      );
    }

    // Fetch full team chain (all levels under `dscode`)
    const teamUsers = await getTeamChain(ds);

    // Add the main user to the calculation
    teamUsers.unshift(mainUser);

    // Count total and active number of SGO and SAO users
    const totalSGO = teamUsers.filter(user => user.group === "SGO").length;
    const totalSAO = teamUsers.filter(user => user.group === "SAO").length;
    
    // Active users based on `status: "1"`
    const totalActiveSGO = teamUsers.filter(user => user.group === "SGO" && user.usertype === "1").length;
    const totalActiveSAO = teamUsers.filter(user => user.group === "SAO" && user.usertype === "1").length;

    // Calculate total earnsp, saosp, sgosp for all users (including main user)
    let totalEarnSP = 0;
    let totalSaoSP = 0;
    let totalSgoSP = 0;

    teamUsers.forEach(user => {
      totalEarnSP += parseFloat(user.earnsp) || 0;
      totalSaoSP += parseFloat(user.saosp) || 0;
      totalSgoSP += parseFloat(user.sgosp) || 0;
    });

    return Response.json(
      {
        success: true,
        dscode: ds, // Show dscode
        mainUser: {
          dscode: mainUser.dscode,
          level: mainUser.level,
          saosp: mainUser.saosp,
          sgosp: mainUser.sgosp,
          earnsp: mainUser.earnsp,
          group: mainUser.group,
        }, // Main user details
        totalSGO,
        totalSAO,
        totalActiveSGO,
        totalActiveSAO,
        totalEarnSP,
        totalSaoSP,
        totalSgoSP,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error on getting team stats:", error);
    return Response.json(
      {
        message: "Error on getting team stats!",
        success: false,
      },
      { status: 500 }
    );
  }
}
