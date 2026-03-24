let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// 🎥 INICIAR CÂMERA (COM CLIQUE)
async function iniciarCamera() {
  try {
    const streamDoc = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });

    const streamSelfie = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" }
    });

    document.getElementById("videoDoc").srcObject = streamDoc;
    document.getElementById("videoSelfie").srcObject = streamSelfie;

  } catch (erro) {
    alert("Erro ao acessar câmera: " + erro);
  }
}

// 📸 CAPTURAR FOTO
function capturar(tipo) {
  const video = tipo === "doc"
    ? document.getElementById("videoDoc")
    : document.getElementById("videoSelfie");

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const imagem = canvas.toDataURL("image/png");

  if (tipo === "doc") {
    document.getElementById("imgDoc").src = imagem;
  } else {
    document.getElementById("imgSelfie").src = imagem;
  }
}

// 📋 CADASTRO
function cadastrar() {
  let nome = document.getElementById("nome").value;
  let cpf = document.getElementById("cpf").value;
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;

  let doc = document.getElementById("imgDoc").src;
  let selfie = document.getElementById("imgSelfie").src;

  if (!nome || !cpf || !email || !senha || !doc || !selfie) {
    alert("Preencha tudo e tire as fotos!");
    return;
  }

  let usuario = {
    nome,
    cpf,
    email,
    senha,
    documento: doc,
    selfie: selfie,
    aprovado: false
  };

  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro enviado para análise!");
}

// 🔐 LOGIN
function login() {
  let email = document.getElementById("loginEmail").value;
  let senha = document.getElementById("loginSenha").value;

  let usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    alert("Usuário não encontrado!");
    return;
  }

  if (!usuario.aprovado) {
    alert("Cadastro ainda não aprovado!");
    return;
  }

  localStorage.setItem("logado", JSON.stringify(usuario));
  window.location.href = "painel.html";
}