const mdlContas = require("../model/mdlContas");

const getAllContas = (req, res) =>
  (async () => {
    let registro = await mdlContas.getAllContas();
    res.json({ status: "ok", "registro": registro });
  })();

const getContaByID = (req, res) =>
  (async () => {
    const contaID = parseInt(req.body.contaid);
    let registro = await mdlContas.getContaByID(contaID);

    res.json({ status: "ok", "registro": registro });
  })();

const insertContas = (request, res) =>
  (async () => {
    const contaREG = request.body;    
    let { msg, linhasAfetadas } = await mdlContas.insertContas(contaREG);    
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateContas = (request, res) =>
  (async () => {
    const contaREG = request.body;
    let  { msg, linhasAfetadas } = await mdlContas.UpdateContas(contaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

  const DeleteContas = (request, res) =>
  (async () => {
    const contaREG = request.body;
    let { msg, linhasAfetadas } = await mdlContas.DeleteContas(contaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllContas,
  getContaByID,
  insertContas,
  updateContas,
  DeleteContas
};