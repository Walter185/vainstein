import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
          <div className="d-flex flex-column justify-content-center">
              <h1 className="text-primary mx-auto my-5">Oops!</h1>
              <h3 className="mx-auto">Se ha producido un error.</h3>
              <h3 className="mx-auto">Intente nuevamente.</h3>
              <Link to="/" className="mx-auto my-5"><button className="btn btn-primary">Volver al Inicio</button></Link>
          </div>
          <div className="d-flex">
              <div className="d-flex justify-content-center">
                  <img src="/img/error.png" alt="error" className="img-unselect my-auto" width="200px" height="auto"/>
              </div>
          </div>
      </div>
    </div>
  )
}
