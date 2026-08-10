// ===============================
// MOBILIZA - JavaScript
// ===============================

// Menu muda de cor ao rolar a página

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


// ===============================
// Animação Fade In
// ===============================

const elementos = document.querySelectorAll(".fade");

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

elementos.forEach((elemento) => {

    observador.observe(elemento);

});


// ===============================
// Scroll suave do menu
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        destino.scrollIntoView({

            behavior: "smooth"

        });

    });

});


// ===============================
// Efeito de digitação no banner
// ===============================

const titulo = document.querySelector(".banner-content h2");

const textoOriginal = titulo.innerHTML;

titulo.innerHTML = "";

let i = 0;

function escreverTexto() {

    if (i < textoOriginal.length) {

        titulo.innerHTML += textoOriginal.charAt(i);

        i++;

        setTimeout(escreverTexto, 25);

    }

}

window.addEventListener("load", escreverTexto);


// ===============================
// Botão do banner
// ===============================

const botao = document.querySelector(".btn");

botao.addEventListener("mouseenter", () => {

    botao.style.transform = "scale(1.08)";

});

botao.addEventListener("mouseleave", () => {

    botao.style.transform = "scale(1)";

});


// ===============================
// Animação dos cards
// ===============================

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.boxShadow = "0 20px 35px rgba(0,0,0,.20)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.boxShadow = "0 10px 25px rgba(0,0,0,.12)";

    });

});


// ===============================
// Animação dos ícones
// ===============================

const icones = document.querySelectorAll(".icones i");

icones.forEach((icone) => {

    icone.addEventListener("mouseenter", () => {

        icone.style.transform = "rotate(360deg) scale(1.2)";
        icone.style.transition = ".6s";

    });

    icone.addEventListener("mouseleave", () => {

        icone.style.transform = "rotate(0deg) scale(1)";

    });

});


// ===============================
// Atualiza o ano automaticamente
// ===============================

const copy = document.querySelector(".copy");

if (copy) {

    const ano = new Date().getFullYear();

    copy.innerHTML = `© ${ano} Mobiliza - Todos os direitos reservados.`;

}

// ==========================================
// CONSULTA DE CEP - MOBILIZA
// ==========================================

const formCEP = document.getElementById("formCEP");

if (formCEP) {

    const cep = document.getElementById("cep");

    const rua = document.getElementById("rua");

    const bairro = document.getElementById("bairro");

    const cidade = document.getElementById("cidade");

    const estado = document.getElementById("estado");

    const mensagem = document.getElementById("mensagemCEP");


    // Máscara do CEP

    cep.addEventListener("input", function () {

        let valor = cep.value.replace(/\D/g, "");

        valor = valor.substring(0, 8);

        if (valor.length > 5) {

            valor =
                valor.substring(0, 5) +
                "-" +
                valor.substring(5);

        }

        cep.value = valor;

    });


    // Consulta do CEP

    formCEP.addEventListener("submit", async function (event) {

        event.preventDefault();

        const numeroCEP =
            cep.value.replace(/\D/g, "");


        if (numeroCEP.length !== 8) {

            mensagem.textContent =
                "Digite um CEP válido.";

            mensagem.style.color = "#d62828";

            return;

        }


        mensagem.textContent =
            "Consultando CEP...";

        mensagem.style.color = "#0057B8";


        try {

            const resposta = await fetch(
                `https://viacep.com.br/ws/${numeroCEP}/json/`
            );


            const dados = await resposta.json();


            if (dados.erro) {

                mensagem.textContent =
                    "CEP não encontrado.";

                mensagem.style.color =
                    "#d62828";

                rua.value = "";
                bairro.value = "";
                cidade.value = "";
                estado.value = "";

                return;

            }


            // Preenche automaticamente

            rua.value = dados.logradouro || "";

            bairro.value = dados.bairro || "";

            cidade.value = dados.localidade || "";

            estado.value = dados.uf || "";


            mensagem.textContent =
                "CEP encontrado com sucesso!";

            mensagem.style.color =
                "#00A651";


        } catch (erro) {

            mensagem.textContent =
                "Não foi possível consultar o CEP. Verifique sua conexão.";

            mensagem.style.color =
                "#d62828";

        }

    });

}