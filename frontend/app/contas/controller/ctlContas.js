const axios = require("axios");

//@ Abre o formulário de manutenção de alunos
const getAllContas = (req, res) =>
  (async () => {
    userName = req.session.userName;
    try {
      resp = await axios.get(process.env.SERVIDOR_DW3 + "/getAllContas", {});
      //console.log("[ctlLogin.js] Valor resp:", resp.data);
      res.render("contas/view_manutencao", {
        title: "Manutenção de contas",
        data: resp.data,
        userName: userName,
      });
    } catch (erro) {
      console.log("[ctlContas.js|getAllContas] Try Catch:Erro de requisição");
    }
  })();

  //@ Abre formulário de cadastro de contas
const openContasInsert = (req, res) =>
(async () => {
  try {
    res.render('contas/view_cadContas', { title: 'Cadastro de contas', oper: "c" });
  } catch (erro) {
    console.log(
      "[ctlContas.js|insertContas] Try Catch: Erro não identificado",
      erro
    );
  }
})();

//@ Função para validar campos no formulário
function validateForm(regFormPar) {
  if (regFormPar.contaid == "") {
    regFormPar.contaid = 0;
  } else {
    regFormPar.contaid = parseInt(regFormPar.contaid);
  }

  regFormPar.ativo = regFormPar.ativo === "true"; //converte para true ou false um check componet
  regFormPar.deleted = regFormPar.deleted === "true"; //converte para true ou false um check componet

  return regFormPar;
}

//@ Abre formulário de cadastro de contas
const openContasUpdate = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "u";
        const contaid = req.params.contaid;
        parseInt(contaid);
        res.render("contas/view_cadContas", {
          title: "Atualização de conta",
          oper: oper,
          idBusca: contaid,
          userName: userName,
        });

        console.log(contaid);
        
      }
    } catch (erro) {
      console.log(
        "[ctlContas.js|insertContas] Try Catch: Erro não identificado",
        erro
      );
    }

  })();

//@ Recupera os dados dos contas
const getDados = (req, res) =>
  (async () => {
    const idBusca = req.body.idBusca;    
    parseInt(idBusca);
    console.log("[ctlContas.js|getDados] valor id :", idBusca);
    try {
      resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/getContaByID",
        {
          contaid: idBusca,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (resp.data.status == "ok") {
        res.json({ status: "ok", registro: resp.data.registro[0] });
      }
    } catch (erro) { 
      console.log(
        "[ctlContas.js|getDados] Try Catch: Erro não identificado",
        erro
      );
    }
    
  })();

//@ Realiza atualização de contas
///@ console.log("[ctlAlunos.js|updateContas] Valor regPost: ", regPost);
const updateContas = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        console.log(regPost);
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/updateContas",
          regPost,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Conta atualizada com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao atualizar conta!" });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlContas.js|updateContas] Try Catch: Erro não identificado.",
        erro
      );
    }
  })();

//@ Realiza remoção soft de contas
//@ "[ctlAlunos.js|deleteContas] Try Catch: Erro não identificado", erro);
const DeleteContas = (req, res) =>
(async () => {
  token = req.session.token;
  try {
    if (req.method == "POST") {
      const regPost = validateForm(req.body);
      regPost.contaid = parseInt(regPost.contaid);
      const resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/DeleteContas",
        {
          contaid: regPost.contaid,
        },        
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp.data.status == "ok") {
        res.json({ status: "ok", mensagem: "Conta removida com sucesso!" });
      } else {
        res.json({ status: "erro", mensagem: "Erro ao remover conta!" });
      }
    }
  } catch (erro) {
    console.log(
      "[ctlContas.js|DeleteContas] Try Catch: Erro não identificado", erro);
  }
})();


//@ Abre e faz operações de CRUD no formulário de cadastro de alunos
const insertContas = (req, res) =>
(async () => {
  var oper = "";
  token = req.session.token;
  try {
    if (req.method == "GET") {
      oper = "c";
      res.render("contas/view_cadContas", {
        title: "Cadastro de contas",
        oper: oper,
      });
    }
    if (req.method == "POST") {
      const regPost = validateForm(req.body);
      regPost.contaid = 0;
      const resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/insertContas",
        regPost,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp.data.status == "ok") {
        res.json({ status: "ok", mensagem: "Conta inserida com sucesso!" });
      } else {
        res.json({ status: "erro", mensagem: "Erro ao inserir conta!" });
      }
    }
  } catch (erro) {
    console.log(
      "[ctlContas.js|insertContas] Try Catch: Erro não identificado",
      erro
    );
  }
})();

//@ Abre o formulário de cadastro de alunos para futura edição
const viewContas = (req, res) =>
  (async () => {
    var oper = "";
    var registro = {};
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        oper = req.params.oper;

        parseInt(id);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/getContaByID",
          {
            contaid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          registro = resp.data.registro[0];
         
          
          console.log("[ctlContas|viewContas] GET oper:", oper);

          res.render("contas/view_cadContas", {
            title: "Cadastro de contas",
            data: registro,
            oper: oper,
            userName: userName,
          });
        }
      } else {
        // Código vai entrar quando o usuário clicar no botão Alterar e requisição for POST
        oper = "vu";
        console.log("[ctlContas|viewContas] POST oper:", oper);
        const contaREG = validateForm(req.body);
        console.log("[ctlContas|viewContas] POST id:", contaREG.id);
        const id = parseInt(contaREG.id);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/updateContas",
          {
            contaid: id,
            descricaoConta: contaREG.descricaoConta,
            valorConta: contaREG.valorConta,
            deleted: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok" });
        } else {
          res.json({ status: "erro" });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlContas.js|viewContas] Contas não pode ser alterado" });
      console.log(
        "[ctlContas.js|viewContas] Try Catch: Erro não identificado",
        erro
      );
    }
  })(); 


module.exports = {
  viewContas,
  getAllContas,
  openContasInsert,
  openContasUpdate,
  insertContas,
  getDados, 
  updateContas,
  DeleteContas
};