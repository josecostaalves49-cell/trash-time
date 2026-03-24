let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// 📷 CÂMERA
async function iniciarCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });

    document.getElementById("videoSelfie").srcObject = stream;

  } catch (erro) {
    alert("Erro ao acessar câmera: " + erro.name);
  }
}

// 📸 CAPTURAR SELFIE
function capturar() {
  const video = document.getElementById("videoSelfie");

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const imagem = canvas.toDataURL("image/png");

  document.getElementById("imgSelfie").src = imagem;
}

// 📋 CADASTRO
function cadastrar() {
  let nome = document.getElementById("nome").value;
  let cpf = document.getElementById("cpf").value;
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;
  let selfie = document.getElementById("imgSelfie").src;

  if (!nome || !cpf || !email || !senha || !selfie) {
    alert("Preencha tudo e tire a selfie!");
    return;
  }

  let usuario = {
    nome,
    cpf,
    email,
    senha,
    selfie,
    aprovado: false
  };

  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro enviado!");
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
    alert("Aguardando aprovação!");
    return;
  }

  localStorage.setItem("logado", JSON.stringify(usuario));
  window.location.href = "painel.html";
}
}
