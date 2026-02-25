export async function getEmbedToken() {
  const tenantId = process.env.REACT_APP_TENANT_ID;
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

  const tokenRes = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        scope: "https://analysis.windows.net/powerbi/api/.default",
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }),
    }
  );
  const tokenData = await tokenRes.json();

  const accessToken = tokenData.access_token;

  const embedRes = await fetch(
    `https://app.powerbi.com/reportEmbed?reportId=bd964961-ef68-4348-b82c-ce1e46ba625f&autoAuth=true&ctid=3fce0782-7f02-430c-b2a5-e1792fff11bf`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessLevel: "View",
      }),
    }
  );

  return embedRes.json(); // contains embedToken
}
