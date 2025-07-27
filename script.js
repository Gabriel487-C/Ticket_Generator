const ticketForm = document.getElementById("ticketform");
const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileinput");
let selectedFile = null;

dropArea.addEventListener("click", () => {
  fileInput.click();
});

["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

["dragenter", "dragover"].forEach(event => {
  dropArea.addEventListener(event, () => {
    dropArea.classList.add("highlight");
  });
});

["dragleave", "drop"].forEach(event => {
  dropArea.addEventListener(event, () => {
    dropArea.classList.remove("highlight");
  });
});

dropArea.addEventListener("drop", (e) => {
  const files = e.dataTransfer.files;
  handleFiles(files);
});

fileInput.addEventListener("change", () => {
  const files = fileInput.files;
  handleFiles(files);
});

function handleFiles(files) {
  const file = files[0];
  if (!file || !file.type.startsWith("image/")) {
    alert("Apenas arquivos de imagem são válidos.");
    return;
  }

  selectedFile = file;

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);

  dropArea.innerHTML = "";
  dropArea.appendChild(img);
}

ticketForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("Name").value;
  const email = document.getElementById("email").value;
  const git = document.getElementById("github").value;

  if (!selectedFile) {
    alert("Por favor, selecione ou arraste uma imagem.");
    return;
  }

  
  const novaJanela = window.open("", "_blank");

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageData = e.target.result;

    novaJanela.document.write(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Ticket de ${nome}</title>
        <link rel="stylesheet" href="style.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        <style>
         
          body{
            font-family: 'Roboto', sans-serif;
          }

         .conteinner{
        
           color: white;
           height: 100vh;
           background-image: url("imagens/background-desktop.png");
           background-size: cover;
           background-repeat: no-repeat;
           align-items: center;
           text-align: center;
           justify-content: center;
          }
          .boxprincipall{
         
           text-align: center;
           justify-content: center;
           text-align: center;
           display: flex;
           flex-direction: column;
           align-items: center;
           }
          .boxticket{
            position: relative;
            width: 600px;
            height: 280px;
           }
           .boxticket::before{
        
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(to right, #f06, #4a90e2);
            -webkit-mask-image: url("imagens/pattern-ticket.svg"); 
            -webkit-mask-size: cover;
            -webkit-mask-repeat: no-repeat;
            mask-image: url("imagens/pattern-ticket.svg");
            mask-size: cover;
            mask-repeat: no-repeat;
            z-index: 0;
           }
           .ticketcontent{
           color: white;
           text-align: left;
           padding: 40px;
           font-weight: bold;
           z-index: 1;
           }
           .avatarphoto{
           z-index: 2;
           display: flex;
           gap: 30px;
           }
           .avatar-photo{
           border-radius: 8px;
           height:130px;
           width: 130px;
           
           }
           .nn{
           font-weight: bold;
           font-size: 30px;
           }
           .gitid{
           font-weight; bold;
           font-size; 15px;
           }
           .nomeind{
            color:  #f06;
            cursor: pointer;
           }
          .emailind{
           color: #f06;
           cursor: pointer;
           }
           .imagegit{
            width: 30px;
            height: 30px;
            vertical-align: middle;
            margin-right: 5px;
           }
          .boxintrodutoria{
           padding: 70px;
           }
           p{
           font-weight: bold:
           }
       
         </style>
        </head>
      </body>
         
        <div class="conteinner">
            <div class="boxprincipall">
                <div class="boxintrodutoria">

                    <img src="imagens/logo-full.svg">
                    <h1 class="nome">Congrats, <span class="nomeind">${nome}</span><br>Your ticket is ready.</h1>
                    <p class="email">We've emailed your ticket to<br><span class="emailind">${email}</span> and will send updtates in<br>the run up ti the event.</p>

                </div>

                  <div class="boxticket">
                     <div class="ticketcontent">
                        
                        <img src="imagens/logo-full.svg">
                        <p class="date">Jan 31, 2025 / Houston, TX</p>
                         
                        <div class="avatarphoto">
                            <img src="${imageData}" class="avatar-photo" />
                            <p>
                             <span class="nn">${nome}</span><br>
                             <img class="imagegit" src="imagens/icon-github.svg" alt="GitHub Icon">
                             <span class="gitid">${git}</span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      </html>
    `);
    novaJanela.document.close(); // finaliza a escrita no documento
  };

  reader.readAsDataURL(selectedFile);
});
