import LogoPV from "../../src/components/assets/img/logoPV.png";
import styled from "styled-components";

const Div = styled.div`
display: flex;
width: 100%;
justify-content: center; /* Centrar horizontalmente */
align-items: center; /* Centrar verticalmente */
height: 500px; /* Puedes ajustar la altura del contenedor según tus necesidades */
overflow-x: hidden !important;
overflow-y: hidden !important;
overflow: hidden !important;
`;

const Img = styled.img`
  width: 45rem;
  @media screen and (max-width: 1000px) {
    width: 40rem;
  }
  @media screen and (max-width: 600px) {
    width: 20rem;
`;

export default function EnConstruccion() {
  return (
    <Div className="container">
      <div>
          <div className="d-flex flex-column justify-content-center">
              <h1 className="text-primary mx-auto my-5">EN CONSTRUCCIÓN</h1>
          </div>
          <div className="d-flex">
              <div className="d-flex justify-content-center">
                  <Img src={LogoPV} alt="construccion"/>
              </div>
          </div>
      </div>
    </Div>
  )
}
