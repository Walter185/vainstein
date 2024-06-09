//react icons

//conteudo dos slides
const data = [
    {
    id: "1", 
    image: "/img/banner1.webp", 
    title: "texto 1 ", 
    description: "Descripcion 1 "
    },
    {
    id: "2", 
    image: "/img/banner2.webp", 
    title: "texto 2", 
    description: "Descripcion 2."
    },
    {
    id: "3", 
    image: "/img/banner3.webp", 
    title: "texto 3", 
    description: "Descripcion 3"
    },
];

//conteudo das boxes
const boxcontents = [{
    id: "1",
    title: "Autoconhecimento Profundo e Transformação Pessoal",
    description: "Experimente o poder do autoconhecimento profundo comigo. Eu irei guiá-lo(a) em uma jornada de descoberta pessoal, ajudando-o(a) a identificar padrões, crenças limitantes e a desenvolver uma compreensão mais profunda de quem você é. Está preparado(a) para uma transformação positiva em sua vida? Marque já sua consulta!! ",
    icon: "/img/icons/philosophyb.webp"
    },
    {
    id: "2",
    title: "Empoderamento Pessoal através da Consciência do Momento Presente",
    description: "Você desenvolverá uma consciência profunda do momento presente. Isso não apenas proporciona uma maior compreensão de suas ações, mas também permite que você assuma o controle de sua vida. Seja o protagonista da sua história. Venha descobrir como a atenção ao 'aqui e agora' pode transformar a sua jornada.",
    icon: "/img/icons/conscienciab.webp"
    },
    {
    id: "3",
    title: "Resolução de Conflitos Internos através da Totalidade",
    description: "Descubra como a abordagem da Gestalt pode ajudar você a entender a totalidade de seus pensamentos, sentimentos e comportamentos. Enxergar o quadro completo permite resolver conflitos internos de uma forma mais integrada e eficaz. Está pronto para experimentar uma nova perspectiva sobre si mesmo?",
    icon:"/img/icons/100.webp"
    }
    
]

const commentsbox = [
    {
    id: "1",
    nome: "Helena Maciel",
    comentario: "Dra. Jessica Magalhães é uma pessoa muito profissional é incrível muito preocupada com o ser humano e vemos a sua dedicação em ajudar da melhor maneira as pessoas. Recomendo muito!",
    img: "/img/comments/1.webp"
    },
    {
    id: "2",
    nome: "Ana Bessa",
    comentario: "Excelente profissional. Aborda tudo com muita prioridade. Super atenciosa. Gostei muito.",
    img: "/img/comments/2.webp"
    },
    {
    id: "3",
    nome: "Vitoria Ferreira",
    comentario: "Uma profissional exemplar, super atenciosa e interessada em solucionar os anseios de seus pacientes.",
    img: "/img/comments/3.webp"
    },
    {
    id: "4",
    nome: "Clesio Oliveira",
    comentario: "Profissional muito bem preparada em um ambiente bacana e acessível.",
    img: "/img/comments/4.webp"
    },
    {
    id: "5",
    nome: "Natalia Ribeiro",
    comentario: "Gostaria de agradecer com uma enorme gratidão a esta profissional que me recebeu com muito amor e dedicação muito obg do fundo do meu coração",
    img: "/img/comments/5.webp"
    },
    {
    id: "6",
    nome: "Aldair de Sousa",
    comentario: "Uma ótima profissional , extremamente meiga e muito competente . Obrigado por me ajudar doutora !.",
    img: "/img/comments/6.webp"
    }
    
]

const especialidades = [
    {
    id: "1", 
    nome: "Adolescentes", 
    img:"/img/especialidades/1.webp",
    description: "Terapia para adolescentes promove autoconhecimento e habilidades emocionais, auxiliando na navegação pelos desafios da adolescência. Com suporte psicológico, desenvolvem resiliência, melhoria nas relações interpessoais e ferramentas para enfrentar questões emocionais, contribuindo para um futuro mais saudável e equilibrado."
    },
    {
    id: "2", 
    nome: "Jovens adultos", 
    img:"/img/especialidades/2.webp",
    description: "A terapia para jovens adultos oferece um espaço seguro para explorar desafios emocionais, desenvolver autoconsciência e aprender habilidades de enfrentamento. Ajuda a fortalecer relacionamentos, promover equilíbrio emocional e cultivar resiliência, capacitando-os para enfrentar os altos e baixos da vida adulta com maior clareza e bem-estar."
    },
    {
    id: "3", 
    nome: "Mulheres que procuram reconstruir sua auto-estima", 
    img:"/img/especialidades/3.webp",
    description: "A terapia com psicólogo é uma jornada transformadora para mulheres reconstruírem a autoestima. Ao explorar emoções, desafios e conquistas, promove a aceitação, resgata a confiança e estimula o autocuidado. Essa jornada psicológica fortalece a autoimagem, permitindo que as mulheres se empoderem, estabeleçam limites saudáveis e cultivem relações mais positivas consigo mesmas e com os outros."
    },
]

module.exports = {data, boxcontents, commentsbox, especialidades}
