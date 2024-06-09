import LogoPV from "../../src/components/assets/img/logoPV.png";
import "./EnConstruccion.css";

export default function EnConstruccion() {
  return (
    <div className="container" id="enconstruccion">
      <div>
          <div className="d-flex flex-column justify-content-center">
              <h1 className="text-primary mx-auto my-5">EN CONSTRUCCIÓN</h1>
          </div>
          <div className="d-flex">
              <div className="d-flex justify-content-center">
                  <img src={LogoPV} alt="error" className="img-unselect my-auto" width="500px" height="auto"/>
              </div>
          </div>
      </div>
    </div>
  )
}
