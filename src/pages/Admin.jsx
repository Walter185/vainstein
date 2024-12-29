import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const DEFAULT_AVATAR =
  "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3e%3ccircle cx='12' cy='7' r='4'/%3e%3c/svg%3e";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const auth = getAuth();
  const db = getFirestore();

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        setError("No hay usuario autenticado");
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, "pacientes", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = {
          ...userDoc.data(),
          email: user.email,
          photoURL: user.photoURL || DEFAULT_AVATAR,
        };
        setUserData(data);
        setFormData(data);
      } else {
        setError("No se encontraron datos del usuario");
      }
    } catch (err) {
      setError("Error al cargar los datos: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No hay usuario autenticado");

      const userDocRef = doc(db, "pacientes", user.uid);
      await updateDoc(userDocRef, formData);
      setUserData(formData);
      setIsEditing(false);
      setSuccess("Perfil actualizado exitosamente.");
    } catch (err) {
      setError("Error al guardar los cambios: " + err.message);
    }
  };

  const cancelNextAppointment = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No hay usuario autenticado");

      const userAppointmentsRef = doc(db, "pacientes", user.uid);
      const userAppointmentsDoc = await getDoc(userAppointmentsRef);

      if (userAppointmentsDoc.exists()) {
        const appointments = userAppointmentsDoc.data().appointments || [];
        const nextAppointment = appointments[0]; // Asumiendo que está ordenado por fecha

        if (nextAppointment) {
          // Eliminar el turno del usuario
          const updatedAppointments = appointments.filter(
            (appt) =>
              appt.date !== nextAppointment.date || appt.time !== nextAppointment.time
          );
          await updateDoc(userAppointmentsRef, { appointments: updatedAppointments });

          // Eliminar el turno de la colección "appointments"
          const appointmentRef = doc(db, "appointments", nextAppointment.date);
          const appointmentDoc = await getDoc(appointmentRef);

          if (appointmentDoc.exists()) {
            const bookedSlots = appointmentDoc.data().bookedSlots || [];
            const updatedSlots = bookedSlots.filter(
              (slot) => slot !== nextAppointment.time
            );

            if (updatedSlots.length > 0) {
              await updateDoc(appointmentRef, { bookedSlots: updatedSlots });
            } else {
              await updateDoc(appointmentRef, { bookedSlots: [] });
            }
          }

          setSuccess("El turno ha sido cancelado exitosamente.");
          fetchUserData(); // Recargar los datos del usuario
        } else {
          setError("No hay turnos próximos para cancelar.");
        }
      } else {
        setError("No se encontraron datos del usuario.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al cancelar el turno: " + err.message);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <div className="card mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-header">
          <h5 className="card-title mb-0">Perfil de Usuario</h5>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            <img
              src={userData?.photoURL || DEFAULT_AVATAR}
              alt="Profile"
              className="img-fluid rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
            <div className="ms-3">
              <h6 className="mb-1">{userData?.nombre || "Sin nombre"}</h6>
              <p className="text-muted small mb-0">{userData?.email}</p>
            </div>
          </div>

          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="mb-4">
            <h6>Próximo Turno:</h6>
            {userData?.appointments?.[0] ? (
              <>
                <p>
                  Fecha: {userData.appointments[0].date} - Hora:{" "}
                  {userData.appointments[0].time}
                </p>
                <button
                  className="btn btn-danger"
                  onClick={cancelNextAppointment}
                >
                  Cancelar Próximo Turno
                </button>
              </>
            ) : (
              <p>No tienes turnos próximos.</p>
            )}
          </div>

          {isEditing ? (
            <form>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={formData.nombre || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  name="telefono"
                  value={formData.telefono || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  name="direccion"
                  value={formData.direccion || ""}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={saveChanges}
              >
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            </form>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(true)}
            >
              Editar Perfil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
