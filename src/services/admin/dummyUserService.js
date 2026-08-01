import { registerUser } from "../registration/registerUser";

function createMobile(index) {
  return `900${String(index).padStart(7, "0")}`;
}

function createEmail(index) {
  return `dummy${index}@zoryglobal.com`;
}
export async function generateDummyUsers(
  totalUsers = 10,
  startSponsor = "ZG1"
) {
  const result = {
    success: [],
    failed: [],
  };

  let sponsorId = startSponsor;
for (let i = 1; i <= totalUsers; i++) {
console.log({
  user: i,
  mobile: createMobile(i),
  sponsorId,
});
  try {

  const response = await registerUser({
  fullName: `Dummy User ${i}`,
  mobile: createMobile(i),
  email: createEmail(i),
  password: "123456",
  confirmPassword: "123456",
  sponsorId,
});

  sponsorId = response.userId;

  result.success.push(response.userId);

  console.log(`✅ ${response.userId} Created`);

} catch (error) {

  console.error(error);

  result.failed.push({
    index: i,
    sponsorId,
    error: error.message,
  });

  break;

}

}
  return result;
}