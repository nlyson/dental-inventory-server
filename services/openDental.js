/**
 * OpenDental API client for fetching procedures
 */

async function fetchProcedures(startDate, endDate) {
  const baseUrl = process.env.OPEN_DENTAL_API_BASE;
  const auth = process.env.OPEN_DENTAL_AUTH;

  if (!baseUrl || !auth) {
    throw new Error('OpenDental configuration missing. Check OPEN_DENTAL_API_BASE and OPEN_DENTAL_AUTH environment variables.');
  }

  const url = `${baseUrl}/procedurelogs?DateStart=${startDate}&DateEnd=${endDate}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenDental API error (${response.status}): ${errorText}`);
  }

  const procedures = await response.json();
  return procedures;
}

module.exports = { fetchProcedures };
