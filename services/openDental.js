/**
 * OpenDental database queries for fetching procedures directly from MariaDB
 */
const { query } = require('./database');

async function fetchProcedures(startDate, endDate) {
  const sql = `
    SELECT
      pl.ProcNum,
      pl.PatNum,
      pl.ProcDate,
      pl.ProcStatus,
      pl.CodeNum,
      pc.ProcCode,
      pc.Descript,
      pc.AbbrDesc,
      pl.ProvNum,
      pl.ClinicNum,
      pl.ProcFee,
      pl.ToothNum
    FROM procedurelog pl
    LEFT JOIN procedurecode pc ON pl.CodeNum = pc.CodeNum
    WHERE pl.ProcDate >= ? AND pl.ProcDate <= ?
      AND pl.ProcStatus = 2
    ORDER BY pl.ProcDate DESC
  `;

  const procedures = await query(sql, [startDate, endDate]);
  return procedures;
}

async function fetchSupplies() {
  const sql = `
    SELECT
      s.SupplyNum,
      s.SupplierNum,
      s.CatalogNumber,
      s.Descript,
      s.Category,
      s.Price,
      s.IsHidden,
      d.ItemName AS CategoryName
    FROM supply s
    LEFT JOIN definition d ON s.Category = d.DefNum
    WHERE s.IsHidden = 0
    ORDER BY s.Descript
  `;

  return await query(sql);
}

async function fetchSupplyOrders() {
  const sql = `
    SELECT
      so.SupplyOrderNum,
      so.SupplierNum,
      sp.Name AS SupplierName,
      so.DatePlaced,
      so.Note,
      so.AmountTotal
    FROM supplyorder so
    LEFT JOIN supplier sp ON so.SupplierNum = sp.SupplierNum
    ORDER BY so.DatePlaced DESC
    LIMIT 50
  `;

  return await query(sql);
}

async function fetchSuppliers() {
  const sql = `SELECT SupplierNum, Name, Phone, Note FROM supplier ORDER BY Name`;
  return await query(sql);
}

module.exports = { fetchProcedures, fetchSupplies, fetchSupplyOrders, fetchSuppliers };
