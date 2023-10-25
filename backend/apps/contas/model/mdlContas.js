const db = require("../../../database/databaseconfig");

const getAllContas = async () => {
  return (
    await db.query(
      "SELECT * FROM contas WHERE deleted = false ORDER BY descricaoConta ASC"
    )
  ).rows;
};

const getContaByID = async (contaIDPar) => {
  return (
    await db.query(
      "SELECT * FROM contas WHERE contaid = $1 and deleted = false ORDER BY descricaoConta ASC",
      [contaIDPar]
    )
  ).rows;
};

const insertContas = async (contaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO contas " + "values(default, $1, $2, $3)",
        [
          contaREGPar.descricaoConta,
          contaREGPar.valorConta,
          contaREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlContas|insertContas] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateContas = async (contaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE contas SET " +
          "descricaoConta = $2, " +
          "valorConta = $3, " +
          "deleted = $4 " +
          "WHERE contaid = $1",
        [
          contaREGPar.contaid,
          contaREGPar.descricaoConta,
          contaREGPar.valorConta,
          contaREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlContas|insertContas] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeleteContas = async (contaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE contas SET " + "deleted = true " + "WHERE contaid = $1",
      [contaREGPar.contaid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlContas|insertContas] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  getAllContas,
  getContaByID,
  insertContas,
  UpdateContas,
  DeleteContas,
};